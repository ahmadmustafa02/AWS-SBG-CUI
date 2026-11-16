import { IconOrnament } from "./IconOrnament";

/**
 * Scattered line-drawn cameras turning slowly behind the photo pages, the same
 * way the club mark sits behind other sections. Decorative only.
 */
export function CameraBackdrop({ dense = false }: { dense?: boolean }) {
  return (
    <>
      <IconOrnament icon="camera" size={300} right="-4rem" top="-3rem" duration={150} tilt={-14} opacity={0.16} />
      <IconOrnament icon="camera" size={150} left="6%" bottom="-2.5rem" duration={110} reverse tilt={18} opacity={0.13} />
      {dense && (
        <>
          <IconOrnament icon="camera" size={210} left="-3.5rem" top="22%" duration={170} tilt={24} opacity={0.1} />
          <IconOrnament icon="camera" size={120} right="12%" top="48%" duration={95} reverse tilt={-8} opacity={0.12} />
          <IconOrnament icon="camera" size={260} right="-5rem" bottom="6%" duration={190} tilt={10} opacity={0.1} />
          <IconOrnament icon="camera" size={90} left="38%" top="6%" duration={80} tilt={-22} opacity={0.12} />
        </>
      )}
    </>
  );
}
