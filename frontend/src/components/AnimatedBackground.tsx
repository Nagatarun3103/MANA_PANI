import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 10% 20%, #ffadad 0%, transparent 50%), radial-gradient(circle at 80% 15%, #caffbf 0%, transparent 40%), radial-gradient(circle at 25% 80%, #9bf6ff 0%, transparent 50%), radial-gradient(circle at 90% 85%, #a0c4ff 0%, transparent 40%)",
            "radial-gradient(circle at 30% 40%, #ffd6a5 0%, transparent 50%), radial-gradient(circle at 70% 35%, #ffadad 0%, transparent 40%), radial-gradient(circle at 15% 70%, #caffbf 0%, transparent 50%), radial-gradient(circle at 85% 90%, #9bf6ff 0%, transparent-40%)",
            "radial-gradient(circle at 50% 60%, #a0c4ff 0%, transparent 50%), radial-gradient(circle at 20% 25%, #ffd6a5 0%, transparent 40%), radial-gradient(circle at 80% 75%, #ffadad 0%, transparent 50%), radial-gradient(circle at 50% 95%, #caffbf 0%, transparent 40%)",
            "radial-gradient(circle at 10% 20%, #ffadad 0%, transparent 50%), radial-gradient(circle at 80% 15%, #caffbf 0%, transparent 40%), radial-gradient(circle at 25% 80%, #9bf6ff 0%, transparent 50%), radial-gradient(circle at 90% 85%, #a0c4ff 0%, transparent 40%)",
          ],
        }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-2xl"></div>
    </div>
  );
};

export default AnimatedBackground;