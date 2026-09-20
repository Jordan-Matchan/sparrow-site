import artfightIcon from '../assets/images/artfight-icon.webp';
import imgLaurence from '../assets/images/laurence.webp';
import imgOctavia from '../assets/images/octavia.webp';
import imgReedsRoom from '../assets/images/reeds-room-concept.webp';
import imgGil from '../assets/images/gil.webp';
import imgMango from '../assets/images/mango.webp';
import imgScene3d from '../assets/images/scene-3d.webp';

export { artfightIcon };

// `feat` = the 2×2 feature tile at desktop widths; `wide` = a 16:10 tile
// spanning two columns. Order is the display order; `num` is the file label.
export const portfolioItems = [
  { category: '2d', title: 'Mango', label: 'Illustration', src: imgMango, feat: true },
  { category: '2d', title: 'Laurence', label: 'Character Art', src: imgLaurence },
  { category: '2d', title: 'Octavia', label: 'Illustration', src: imgOctavia },
  { category: '2d', title: 'Gil', label: 'Character Art', src: imgGil },
  { category: '2d', title: "Reed's Room", label: 'Environment Concept', src: imgReedsRoom, wide: true },
  { category: '3d', title: '3D Scene', label: '3D & VFX', src: imgScene3d, wide: true },
].map((item, i) => ({ ...item, num: String(i + 1).padStart(2, '0') }));
