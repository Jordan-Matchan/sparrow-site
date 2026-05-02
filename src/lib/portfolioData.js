import artfightIcon from '../assets/images/artfight-icon.webp';
import imgLaurence from '../assets/images/laurence.webp';
import imgOctavia from '../assets/images/octavia.webp';
import imgReedsRoom from '../assets/images/reeds-room-concept.webp';
import imgGil from '../assets/images/gil.webp';
import imgMango from '../assets/images/mango.webp';
import imgScene3d from '../assets/images/scene-3d.webp';

export { artfightIcon };

export const portfolioItems = [
  {
    category: '2d',
    title: 'Laurence',
    label: 'Character Art',
    src: imgLaurence,
    wide: false,
  },
  {
    category: '2d',
    title: 'Octavia',
    label: 'Illustration',
    src: imgOctavia,
    wide: false,
  },
  {
    category: '2d',
    title: 'Gil',
    label: 'Character Art',
    src: imgGil,
    wide: false,
  },
  {
    category: '2d',
    title: 'Mango',
    label: 'Illustration',
    src: imgMango,
    wide: false,
  },
  {
    category: '2d',
    title: "Reed's Room",
    label: 'Environment Concept',
    src: imgReedsRoom,
    wide: true,
  },
  {
    category: '3d',
    title: '3D Scene',
    label: '3D & VFX',
    src: imgScene3d,
    wide: true,
  },
];
