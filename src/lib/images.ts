import SmartConnectedDeviceImage from '../assets/images/SmartConnectedDevice.png';
import IntelligentControlSystemImage from '../assets/images/IntelligentControlSystem.png';
import IndustrialIoTPlatformImage from '../assets/images/IndustrialIoTPlatform.png';
import WirelessImage from '../assets/images/Wireless.png';
import jagadishImage from '../assets/images/Jagadish.jpeg';
import srinivasaImage from '../assets/images/Srinivasa.jpeg';
import dineshImage from '../assets/images/DineshP.jpeg';

/**
 * The seven images that ship in the bundle, keyed by filename.
 *
 * Vite rewrites these imports to content-hashed URLs at build time, so the CMS
 * cannot store the built path — it stores the bare filename and we resolve it
 * back to the bundled asset here.
 */
const LOCAL_ASSETS: Record<string, string> = {
  'SmartConnectedDevice.png': SmartConnectedDeviceImage,
  'IntelligentControlSystem.png': IntelligentControlSystemImage,
  'IndustrialIoTPlatform.png': IndustrialIoTPlatformImage,
  'Wireless.png': WirelessImage,
  'Jagadish.jpeg': jagadishImage,
  'Srinivasa.jpeg': srinivasaImage,
  'DineshP.jpeg': dineshImage,
};

/**
 * Turn a stored image value into something an <img src> can use.
 *
 * - absolute URL (http/https/data/blob) or root-relative path → used as-is,
 *   so an admin can paste any URL
 * - a known bundled filename → the hashed build URL
 * - anything else → returned unchanged
 */
export function resolveImage(value?: string | null): string {
  if (!value) return '';
  if (/^(https?:)?\/\//.test(value) || value.startsWith('data:') || value.startsWith('blob:')) {
    return value;
  }
  if (value.startsWith('/')) return value;

  const key = value.split('/').pop() ?? value;
  return LOCAL_ASSETS[key] ?? value;
}
