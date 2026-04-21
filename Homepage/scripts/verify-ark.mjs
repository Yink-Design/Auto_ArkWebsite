import { spawn } from 'node:child_process';
import http from 'node:http';
import net from 'node:net';

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: process.platform === 'win32',
      ...options,
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
    });

    child.on('error', reject);
  });
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        server.close();
        reject(new Error('Unable to determine a free port'));
        return;
      }

      const { port } = address;
      server.close(() => resolve(port));
    });
    server.on('error', reject);
  });
}

function waitForUrl(url, timeoutMs = 30000) {
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
    const tryRequest = () => {
      const request = http.get(url, (response) => {
        response.resume();
        if (response.statusCode && response.statusCode < 500) {
          resolve();
          return;
        }

        retry();
      });

      request.on('error', retry);
    };

    const retry = () => {
      if (Date.now() - startedAt > timeoutMs) {
        reject(new Error(`Timed out waiting for ${url}`));
        return;
      }

      setTimeout(tryRequest, 500);
    };

    tryRequest();
  });
}

function terminateProcessTree(child) {
  return new Promise((resolve) => {
    if (!child.pid) {
      resolve();
      return;
    }

    if (process.platform === 'win32') {
      const killer = spawn('taskkill', ['/pid', String(child.pid), '/t', '/f'], {
        stdio: 'ignore',
        shell: true,
      });
      killer.on('exit', () => resolve());
      killer.on('error', () => resolve());
      return;
    }

    child.kill('SIGTERM');
    child.once('exit', () => resolve());
    child.once('error', () => resolve());
  });
}

async function main() {
  const port = await getFreePort();
  const previewUrl = `http://127.0.0.1:${port}/`;

  await runCommand('npm', ['run', 'build']);

  const preview = spawn(
    'npm',
    ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port)],
    {
      stdio: 'inherit',
      shell: process.platform === 'win32',
    },
  );

  try {
    await waitForUrl(previewUrl, 30000);
    await runCommand('npm', ['run', 'capture:ark'], {
      env: { ...process.env, ARK_BASE_URL: previewUrl },
    });
    await runCommand('npm', ['run', 'compare:ark']);
  } finally {
    await terminateProcessTree(preview);
  }
}

main().catch((error) => {
  console.error(`[verify:ark] ${error.message}`);
  process.exitCode = 1;
});
