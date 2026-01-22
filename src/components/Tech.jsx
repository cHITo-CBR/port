import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
import { motion } from "framer-motion";
import { technologies } from "../constants";

const Ball = ({ imgUrl }) => {
  const meshRef = useRef();
  const [decal] = useTexture([imgUrl]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh ref={meshRef} castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#1a1a2e"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} enablePan={false} />
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

// Fallback 2D Ball for better performance
const Ball2D = ({ icon, name }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotateY: 180 }}
      transition={{ duration: 0.5 }}
      className="w-24 h-24 rounded-full glass-card flex items-center justify-center cursor-pointer group relative"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-electric-purple/20 to-neon-cyan/20 group-hover:from-electric-purple/40 group-hover:to-neon-cyan/40 transition-all duration-300" />
      <img
        src={icon}
        alt={name}
        className="w-12 h-12 object-contain relative z-10"
      />
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: "0 0 30px rgba(145, 94, 255, 0.5), 0 0 60px rgba(0, 245, 255, 0.3)",
        }}
      />
      
      {/* Tooltip */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-xs font-medium whitespace-nowrap bg-primary/80 px-2 py-1 rounded">
          {name}
        </span>
      </div>
    </motion.div>
  );
};

// 3D Rotating Tech Sphere
const TechSphere = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const radius = 4;
  const techCount = technologies.length;

  return (
    <group ref={groupRef}>
      {technologies.map((tech, index) => {
        const phi = Math.acos(-1 + (2 * index) / techCount);
        const theta = Math.sqrt(techCount * Math.PI) * phi;

        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        return (
          <Float key={tech.name} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial
                color="#1a1a2e"
                emissive="#915eff"
                emissiveIntensity={0.2}
              />
            </mesh>
          </Float>
        );
      })}
      
      {/* Central glow */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#915eff"
          emissive="#915eff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

const Tech = () => {
  return (
    <section id="tech" className="relative py-20 px-6 sm:px-16 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <p className="text-secondary text-lg uppercase tracking-wider">Technologies I work with</p>
        <h2 className="text-white text-4xl sm:text-5xl font-bold mt-2">
          Tech <span className="purple-text-gradient">Stack</span>
        </h2>
      </motion.div>

      {/* 3D Canvas for Tech Sphere */}
      <div className="hidden lg:block h-[500px] relative">
        <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#915eff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f5ff" />
            <TechSphere />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Suspense>
          <Preload all />
        </Canvas>
        
        {/* Overlay tech icons */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-secondary text-sm">Drag to rotate</p>
          </div>
        </div>
      </div>

      {/* 2D Grid for all screens and fallback */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-8 lg:mt-10"
      >
        {technologies.map((technology, index) => (
          <motion.div
            key={technology.name}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <Ball2D icon={technology.icon} name={technology.name} />
          </motion.div>
        ))}
      </motion.div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(145, 94, 255, 0.3) 0%, transparent 70%)",
        }}
      />
    </section>
  );
};

export default Tech;
