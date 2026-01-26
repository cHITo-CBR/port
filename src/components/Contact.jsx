import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, useTexture } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import emailjs from "@emailjs/browser";

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_oiv96fb";
const EMAILJS_TEMPLATE_ID = "template_hc94wdw";
const EMAILJS_PUBLIC_KEY = "8I19QRQRgQn-dchl_";

// 3D Earth Component
const Earth = () => {
  const meshRef = useRef();

  // Create procedural Earth-like texture
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          color="#1a365d"
          emissive="#0ea5e9"
          emissiveIntensity={0.1}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh scale={1.15}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          color="#00f5ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow */}
      <mesh scale={1.25}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial
          color="#915eff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Orbiting rings */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#915eff"
          emissive="#915eff"
          emissiveIntensity={1}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
        <torusGeometry args={[4, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={1}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Orbiting dots */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 3.5,
              Math.sin(angle) * 3.5 * Math.cos(Math.PI / 3),
              Math.sin(angle) * 3.5 * Math.sin(Math.PI / 3),
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color="#00f5ff"
              emissive="#00f5ff"
              emissiveIntensity={2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Stars background
const Stars = () => {
  const starsRef = useRef();
  const starCount = 1000;

  const positions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" sizeAttenuation />
    </points>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [0, 0, 10], fov: 45 }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#915eff" />
        <Earth />
        <Stars />
      </Suspense>
    </Canvas>
  );
};

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          to_name: "Chistopher",
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setLoading(false);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error("EmailJS Error:", err);

      setTimeout(() => setError(false), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-20 px-6 sm:px-16 max-w-7xl mx-auto min-h-screen">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-secondary text-lg uppercase tracking-wider">Get in touch</p>
        <h2 className="text-white text-4xl sm:text-5xl font-bold mt-2">
          Contact <span className="cyan-text-gradient">Me</span>
        </h2>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex-1 w-full"
        >
          <div className="glass-card rounded-2xl p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name Field */}
              <div>
                <label className="text-white font-medium mb-2 block">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your name?"
                  required
                  className="w-full bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg border border-white/10 focus:border-electric-purple focus:outline-none transition-colors"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="text-white font-medium mb-2 block">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your email?"
                  required
                  className="w-full bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg border border-white/10 focus:border-electric-purple focus:outline-none transition-colors"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="text-white font-medium mb-2 block">Your Message</label>
                <textarea
                  rows={6}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What would you like to say?"
                  required
                  className="w-full bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg border border-white/10 focus:border-electric-purple focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`py-4 px-8 rounded-lg font-bold text-white shadow-lg transition-all duration-300 ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-electric-purple to-purple-700 hover:shadow-glow"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </motion.button>

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center font-medium"
                >
                  ✓ Thank you! I'll get back to you soon.
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-center font-medium"
                >
                  ✗ Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
            </form>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-secondary text-sm mb-4">Or reach me directly:</p>
              <div className="flex gap-4">
                <a
                  href="mailto:chistopher.raper@urios.edu.ph"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-electric-purple/20 transition-colors group"
                >
                  <svg className="w-5 h-5 text-secondary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-electric-purple/20 transition-colors group"
                >
                  <svg className="w-5 h-5 text-secondary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-electric-purple/20 transition-colors group"
                >
                  <svg className="w-5 h-5 text-secondary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-electric-purple/20 transition-colors group"
                >
                  <svg className="w-5 h-5 text-secondary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3D Earth */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex-1 w-full h-[400px] lg:h-[550px]"
        >
          <EarthCanvas />
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-20 pt-8 border-t border-white/10 text-center"
      >
        <p className="text-secondary">
          © {new Date().getFullYear()} Chistopher B. Raper. All rights reserved.
        </p>
        <p className="text-secondary/50 text-sm mt-2">
          Built with React, Three.js & Framer Motion
        </p>
      </motion.footer>
    </section>
  );
};

export default Contact;
