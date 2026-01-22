import { motion } from "framer-motion";
import { experiences, projects } from "../constants";

const ExperienceCard = ({ experience, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="flex items-center w-full mb-8">
      {/* Left side - Content for even, empty for odd on large screens */}
      <div className={`hidden md:flex w-5/12 ${isEven ? "justify-end pr-8" : ""}`}>
        {isEven && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 max-w-md hover:shadow-glow transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: experience.iconBg }}
              >
                {experience.icon}
              </div>
              <div>
                <h3 className="text-white text-xl font-bold">{experience.title}</h3>
                <p className="text-secondary text-sm">{experience.company_name}</p>
              </div>
            </div>
            <p className="text-neon-cyan text-sm font-medium mb-3">{experience.date}</p>
            <ul className="space-y-2">
              {experience.points.map((point, i) => (
                <li key={i} className="text-secondary text-sm flex items-start gap-2">
                  <span className="text-electric-purple mt-1">▹</span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Center - Timeline */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="w-6 h-6 rounded-full bg-electric-purple border-4 border-primary relative z-10"
        >
          <div className="absolute inset-0 rounded-full bg-electric-purple animate-ping opacity-20" />
        </motion.div>
        <div className="w-1 h-full bg-gradient-to-b from-electric-purple to-neon-cyan min-h-[100px]" />
      </div>

      {/* Right side - Content for odd, empty for even on large screens */}
      <div className={`flex-1 md:w-5/12 ${!isEven ? "pl-8" : "pl-8 md:pl-0"}`}>
        {(!isEven || window.innerWidth < 768) && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`glass-card rounded-2xl p-6 max-w-md hover:shadow-glow transition-all duration-300 ${isEven ? "md:hidden" : ""}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: experience.iconBg }}
              >
                {experience.icon}
              </div>
              <div>
                <h3 className="text-white text-xl font-bold">{experience.title}</h3>
                <p className="text-secondary text-sm">{experience.company_name}</p>
              </div>
            </div>
            <p className="text-neon-cyan text-sm font-medium mb-3">{experience.date}</p>
            <ul className="space-y-2">
              {experience.points.map((point, i) => (
                <li key={i} className="text-secondary text-sm flex items-start gap-2">
                  <span className="text-electric-purple mt-1">▹</span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="glass-card rounded-2xl overflow-hidden group"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
        
        {/* Links */}
        <div className="absolute top-4 right-4 flex gap-2">
          <a
            href={project.source_code_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href={project.live_demo_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-white text-xl font-bold mb-2">{project.name}</h3>
        <p className="text-secondary text-sm mb-4">{project.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag.name}
              className={`text-xs font-medium ${tag.color}`}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="relative py-20 px-6 sm:px-16 max-w-7xl mx-auto">
      {/* Experience Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-secondary text-lg uppercase tracking-wider">What I have done so far</p>
        <h2 className="text-white text-4xl sm:text-5xl font-bold mt-2">
          Work <span className="purple-text-gradient">Experience</span>
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} index={index} />
        ))}
      </div>

      {/* Projects Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12 mt-20"
        id="projects"
      >
        <p className="text-secondary text-lg uppercase tracking-wider">My work</p>
        <h2 className="text-white text-4xl sm:text-5xl font-bold mt-2">
          Featured <span className="cyan-text-gradient">Projects</span>
        </h2>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
