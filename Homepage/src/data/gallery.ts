export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  artist: string;
  image: string;
  ratio?: 'wide' | 'tall' | 'square';
};

export type FeaturedExperiment = {
  id: string;
  name: string;
  label: string;
  year: string;
  image: string;
  accent: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: 'p-01',
    title: '[01]',
    caption: 'Petrytskiy composition study',
    artist: 'Anatol Petrytskiy',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f604959e727872d9bc29c_Petrytskiy-art-1-6.webp',
    ratio: 'square'
  },
  {
    id: 'p-02',
    title: '[02]',
    caption: 'Petrytskiy dramatic abstraction',
    artist: 'Anatol Petrytskiy',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f6049b04026d472c78717_Petrytskiy-art-1-2.webp',
    ratio: 'wide'
  },
  {
    id: 'p-03',
    title: '[03]',
    caption: 'Petrytskiy theatrical palette',
    artist: 'Anatol Petrytskiy',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f1341a250e19fb7d3dca0_Petrytskiy-art-2-2.webp',
    ratio: 'tall'
  },
  {
    id: 'e-01',
    title: '[04]',
    caption: 'Ermilov structural color study',
    artist: 'Vasyl Ermilov',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f65c27f13a95b2e43968c_Ermilov-art-1-2.webp',
    ratio: 'wide'
  },
  {
    id: 'e-02',
    title: '[05]',
    caption: 'Ermilov poster geometry',
    artist: 'Vasyl Ermilov',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f65c2f65744596894c6a5_Ermilov-art-2-2.webp',
    ratio: 'square'
  },
  {
    id: 'e-03',
    title: '[06]',
    caption: 'Ermilov reconstructed symbol set',
    artist: 'Vasyl Ermilov',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f65c20e26a360502bf616_Ermilov-art-1-6.webp',
    ratio: 'tall'
  },
  {
    id: 'k-01',
    title: '[07]',
    caption: 'Khvostenko angular poster',
    artist: 'Oleksandr Khvostenko-Khvostov',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f670d9c1043b3ad56ab01_Khvostenko-art-1-6.webp',
    ratio: 'square'
  },
  {
    id: 'k-02',
    title: '[08]',
    caption: 'Khvostenko theatrical framing',
    artist: 'Oleksandr Khvostenko-Khvostov',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f670d525a2e46d99bfd68_Khvostenko-art-1-2.webp',
    ratio: 'wide'
  },
  {
    id: 'k-03',
    title: '[09]',
    caption: 'Khvostenko spatial field',
    artist: 'Oleksandr Khvostenko-Khvostov',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f670dbebc9ae634039b1f_Khvostenko-art-2-2.webp',
    ratio: 'tall'
  },
  {
    id: 'b-01',
    title: '[10]',
    caption: 'Kosarev collage study',
    artist: 'Borys Kosarev',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f6257a4e62de121940ceb_Kosarev-art-1-2.webp',
    ratio: 'wide'
  },
  {
    id: 'b-02',
    title: '[11]',
    caption: 'Kosarev color fracture',
    artist: 'Borys Kosarev',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f625673fbbf85113d5882_Kosarev-art-1-6.webp',
    ratio: 'square'
  },
  {
    id: 'm-01',
    title: '[12]',
    caption: 'Meller set design fragment',
    artist: 'Vadym Meller',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f68dd8c6c1bd6fcf19441_Meller-art-1-10.webp',
    ratio: 'tall'
  }
];

export const featuredExperiments: FeaturedExperiment[] = [
  {
    id: 'f-01',
    name: 'Suprematista',
    label: 'Featured',
    year: '2025',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f0d0dbbc3bde0877784da_home-slider-1.webp',
    accent: '#F0822C'
  },
  {
    id: 'f-02',
    name: 'Buntesglas',
    label: 'Featured',
    year: '2025',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f0d0ee783579004b21b74_home-slider-2.webp',
    accent: '#436680'
  },
  {
    id: 'f-03',
    name: 'Vierensee',
    label: 'Featured',
    year: '2025',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f0d635f68c6d63d3a5f74_home-slider-3.webp',
    accent: '#AD2507'
  },
  {
    id: 'f-04',
    name: 'Formen',
    label: 'Featured',
    year: '2025',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f0d0d3961e504250c5556_home-slider-4.webp',
    accent: '#6A92A7'
  },
  {
    id: 'f-05',
    name: 'Sesselbaa',
    label: 'Featured',
    year: '2025',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f0d0e5f68c6d63d3a2864_home-slider-5.webp',
    accent: '#B97F4D'
  },
  {
    id: 'f-06',
    name: 'Salzfeld',
    label: 'Featured',
    year: '2025',
    image:
      'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/655f0d0e99dafb75c1177ba4_home-slider-5-1.webp',
    accent: '#1674B1'
  }
];
