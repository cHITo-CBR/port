import { motion } from "framer-motion";
import { services } from "../constants";

// Face image path - place your image in public/my-face.png
const faceImage = "/my-face.png";

const ServiceCard = ({ index, title, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="w-full"
    >
      <div className="glass-card rounded-2xl p-6 min-h-[200px] flex flex-col items-center justify-center group hover:shadow-glow transition-all duration-300">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-white text-xl font-bold text-center">{title}</h3>
      </div>
    </motion.div>
  );
};

const MiniProfileCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden"
    >
      {/* Status indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-green-400 text-sm font-medium">Available for work</span>
      </div>

      <div className="flex items-center gap-6 mt-6">
        {/* Photo */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-electric-purple ring-offset-2 ring-offset-primary bg-gradient-to-br from-purple-900 to-indigo-900">
          <img
            src={faceImage}
            alt="Chistopher B. Raper"
            className="w-full h-full object-cover object-top"
            style={{
              filter: "saturate(1.1) brightness(0.9) contrast(1.1) hue-rotate(-10deg)",
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {/* Fallback icon */}
          <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-50">
        
          </div>
        </div>

        <div>
          <h4 className="text-white text-lg font-bold">Chistopher B. Raper</h4>
          <p className="text-secondary text-sm">Full Stack Developer</p>
          <div className="flex gap-2 mt-3">
            <a
              href="#contact"
              className="px-4 py-1.5 rounded-full bg-electric-purple text-white text-sm font-medium hover:bg-purple-600 transition-colors"
            >
              Hire Me
            </a>
            <a
              href="#"
              className="px-4 py-1.5 rounded-full border border-secondary text-secondary text-sm font-medium hover:border-white hover:text-white transition-colors"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BentoCard = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`glass-card rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="relative py-20 px-6 sm:px-16 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-secondary text-lg uppercase tracking-wider">Introduction</p>
        <h2 className="text-white text-4xl sm:text-5xl font-bold mt-2">
          About <span className="purple-text-gradient">Me</span>
        </h2>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Main About Card - Spans 2 columns */}
        <BentoCard className="lg:col-span-2" delay={0.1}>
          <h3 className="text-white text-2xl font-bold mb-4">Who I Am</h3>
          <p className="text-secondary leading-relaxed">
            I'm a passionate Full Stack Developer with expertise in creating immersive
            digital experiences. With a strong foundation in both frontend and backend
            technologies, I specialize in building scalable web applications and
            stunning 3D web experiences using Three.js and React.
          </p>
          <p className="text-secondary leading-relaxed mt-4">
            My journey in tech has been driven by curiosity and a desire to push
            the boundaries of what's possible on the web. I believe in writing clean,
            maintainable code and creating user experiences that leave lasting impressions.
          </p>
        </BentoCard>

        {/* Mini Profile Card */}
        <MiniProfileCard />

        {/* Stats Cards */}
        <BentoCard delay={0.2}>
          <div className="text-center">
            <span className="text-5xl font-bold purple-text-gradient">5+</span>
            <p className="text-secondary mt-2">Years Experience</p>
          </div>
        </BentoCard>

        <BentoCard delay={0.3}>
          <div className="text-center">
            <span className="text-5xl font-bold cyan-text-gradient">50+</span>
            <p className="text-secondary mt-2">Projects Completed</p>
          </div>
        </BentoCard>

        <BentoCard delay={0.4}>
          <div className="text-center">
            <span className="text-5xl font-bold green-text-gradient">30+</span>
            <p className="text-secondary mt-2">Happy Clients</p>
          </div>
        </BentoCard>

        {/* Services */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
