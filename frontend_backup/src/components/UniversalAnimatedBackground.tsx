import { motion, type Transition } from "framer-motion";
import { useMemo } from "react";

// Define the color palettes to meet multi-generational appeal
const palettes = {
  playful: ["#FFC700", "#FF6B6B", "#4ECDC4", "#5773FF"],
  energetic: ["#FF8C00", "#FF4500", "#D90000"],
  calm: ["#A0C4FF", "#BDB2FF", "#CAFFBF"],
};

interface BlobProps {
  x: string[];
  y: string[];
  rotate: number[];
  scale: number[];
  color: string;
  transition: Transition;
}

// A single animated "blob"
const Blob = ({ x, y, rotate, scale, color, transition }: BlobProps) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      backgroundColor: color,
      width: "clamp(200px, 30vw, 400px)",
      height: "clamp(200px, 30vw, 400px)",
      filter: "blur(80px)",
    }}
    animate={{ x, y, rotate, scale }}
    transition={transition}
  />
);

// The main background component
const UniversalAnimatedBackground = () => {
  const blobs = useMemo(() => {
    const allColors = [...palettes.playful, ...palettes.energetic, ...palettes.calm];
    return Array.from({ length: 7 }).map((_, i) => ({
      id: i,
      x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
      y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
      rotate: [Math.random() * 360, Math.random() * 360],
      scale: [1, 1.4, 1],
      color: allColors[i % allColors.length],
      transition: {
        duration: Math.random() * 20 + 25,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    }));
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {blobs.map((blob: any) => (
        <Blob key={blob.id} {...blob} />
      ))}
    </div>
  );
};

export default UniversalAnimatedBackground;
