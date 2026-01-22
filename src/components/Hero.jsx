import { useState, useEffect, useRef, Suspense } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars, Float, OrbitControls } from "@react-three/drei";
import { roles } from "../constants";

// Face image path - place your image in public/my-face.png
const faceImage = "/my-face.png";

// Typewriter Hook
const useTypewriter = (words, typingSpeed = 100, deletingSpeed = 50, delayBetweenWords = 2000) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.substring(0, text.length + 1));
          if (text === currentWord) {
            setTimeout(() => setIsDeleting(true), delayBetweenWords);
          }
        } else {
          setText(currentWord.substring(0, text.length - 1));
          if (text === "") {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return text;
};

// 3D Floating Face Frame Component
const FloatingFaceFrame = ({ mouseX, mouseY }) => {
  const meshRef = useRef();
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef}>
        {/* Outer glow ring */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[2.2, 0.05, 16, 100]} />
          <meshStandardMaterial
            color="#915eff"
            emissive="#915eff"
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Inner glow ring */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[2, 0.03, 16, 100]} />
          <meshStandardMaterial
            color="#00f5ff"
            emissive="#00f5ff"
            emissiveIntensity={2}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Rotating outer ring */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#915eff"
            emissive="#915eff"
            emissiveIntensity={1}
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Particles around the frame */}
        {[...Array(20)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 20) * Math.PI * 2) * 2.8,
              Math.sin((i / 20) * Math.PI * 2) * 2.8,
              0,
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial
              color="#00f5ff"
              emissive="#00f5ff"
              emissiveIntensity={3}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// Space Background with Stars
const SpaceBackground = () => {
  return (
    <>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#915eff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f5ff" />
    </>
  );
};

// 3D Canvas Component
const HeroCanvas = ({ mouseX, mouseY }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <SpaceBackground />
        <FloatingFaceFrame mouseX={mouseX} mouseY={mouseY} />
      </Suspense>
    </Canvas>
  );
};

// Glassmorphic Face Container with 3D Tilt
const GlassmorphicFaceCard = () => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] cursor-pointer"
    >
      {/* Animated glow border */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(45deg, #915eff, #00f5ff, #915eff, #00f5ff)",
          backgroundSize: "400% 400%",
          filter: "blur(15px)",
          opacity: 0.7,
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glassmorphic container */}
      <div
        className="absolute inset-[3px] rounded-full overflow-hidden glass-card"
        style={{
          transform: "translateZ(50px)",
        }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20" />
        
        {/* Face image */}
        <div className="absolute inset-[8px] rounded-full overflow-hidden bg-gradient-to-br from-purple-900 to-indigo-900">
          <img
            src={faceImage}
            alt="Chistopher B. Raper"
            className="w-full h-full object-cover object-top"
            style={{
              filter: "saturate(1.1) brightness(0.9) contrast(1.1) hue-rotate(-10deg)",
              mixBlendMode: "normal",
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {/* Overlay gradient for space aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-cyan-900/20 pointer-events-none" />
          {/* Fallback icon */}
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50">
            
          </div>
        </div>

        {/* Reflection effect */}
        <div 
          className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-full pointer-events-none"
          style={{ transform: "translateZ(60px)" }}
        />
      </div>

      {/* Floating particles around the face */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-cyan-400"
          style={{
            left: `${50 + 45 * Math.cos((i / 8) * Math.PI * 2)}%`,
            top: `${50 + 45 * Math.sin((i / 8) * Math.PI * 2)}%`,
            boxShadow: "0 0 10px #00f5ff, 0 0 20px #00f5ff",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const typedText = useTypewriter(roles, 100, 50, 2000);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX / window.innerWidth - 0.5);
    mouseY.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen mx-auto overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <Stars
              radius={300}
              depth={60}
              count={8000}
              factor={7}
              saturation={0}
              fade
              speed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Nebula gradient overlay */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(88, 28, 135, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(30, 64, 175, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(145, 94, 255, 0.1) 0%, transparent 70%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-16 flex flex-col lg:flex-row items-center justify-between min-h-screen pt-32 pb-20 gap-10">
        {/* Left side - Text content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
          {/* Decorative line */}
          <div className="flex items-center gap-5 mb-5">
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-electric-purple" />
              <div className="w-1 sm:h-80 h-40 violet-gradient" />
            </div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-black text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                Hi, I'm{" "}
                <span className="purple-text-gradient">Chistopher</span>
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mt-2"
              >
                B. Raper
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-6"
              >
                <p className="text-secondary text-lg sm:text-xl lg:text-2xl font-medium">
                  I'm a{" "}
                  <span className="cyan-text-gradient font-bold">
                    {typedText}
                  </span>
                  <span className="typewriter-cursor" />
                </p>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-secondary mt-6 text-base sm:text-lg max-w-xl"
              >
                I develop immersive 3D visuals, interactive user interfaces,
                and scalable web applications that push the boundaries of
                digital experience.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex gap-4 mt-8"
              >
                <a
                  href="#projects"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-electric-purple to-purple-700 text-white font-semibold hover:shadow-glow transition-all duration-300 hover:scale-105"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3 rounded-full border border-neon-cyan text-neon-cyan font-semibold hover:bg-neon-cyan/10 hover:shadow-glow-cyan transition-all duration-300 hover:scale-105"
                >
                  Contact Me
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right side - 3D Face */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-1 flex items-center justify-center"
        >
          <GlassmorphicFaceCard />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <a href="#about" className="flex flex-col items-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-secondary"
            />
          </motion.div>
          <span className="text-secondary mt-2 text-sm">Scroll Down</span>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
