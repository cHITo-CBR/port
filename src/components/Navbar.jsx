import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-16 py-5 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-electric-purple to-neon-cyan flex items-center justify-center">
            <span className="text-white font-bold text-lg">CR</span>
          </div>
          <p className="text-white text-lg font-bold cursor-pointer hidden sm:flex">
            Chistopher <span className="text-electric-purple ml-1">Raper</span>
          </p>
        </motion.a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={`#${link.id}`}
                className={`relative text-[16px] font-medium cursor-pointer transition-colors duration-300 ${
                  active === link.title
                    ? "text-white"
                    : "text-secondary hover:text-white"
                }`}
                onClick={() => setActive(link.title)}
              >
                {link.title}
                {active === link.title && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-purple to-neon-cyan"
                  />
                )}
              </a>
            </motion.li>
          ))}
          
          {/* Resume Button */}
          <motion.li
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navLinks.length * 0.1 }}
          >
            <a
              href="#"
              className="px-5 py-2 rounded-full border border-electric-purple text-electric-purple font-medium hover:bg-electric-purple hover:text-white transition-all duration-300"
            >
              Resume
            </a>
          </motion.li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setToggle(!toggle)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <motion.span
              animate={{
                rotate: toggle ? 45 : 0,
                y: toggle ? 6 : 0,
              }}
              className="w-6 h-0.5 bg-white block"
            />
            <motion.span
              animate={{
                opacity: toggle ? 0 : 1,
              }}
              className="w-6 h-0.5 bg-white block"
            />
            <motion.span
              animate={{
                rotate: toggle ? -45 : 0,
                y: toggle ? -6 : 0,
              }}
              className="w-6 h-0.5 bg-white block"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-6 py-6 bg-primary/95 backdrop-blur-lg border-t border-white/10">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={`#${link.id}`}
                      className={`block py-2 text-lg font-medium ${
                        active === link.title
                          ? "text-white"
                          : "text-secondary"
                      }`}
                      onClick={() => {
                        setToggle(false);
                        setActive(link.title);
                      }}
                    >
                      {link.title}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="pt-4 border-t border-white/10"
                >
                  <a
                    href="#"
                    className="inline-block px-6 py-3 rounded-full bg-electric-purple text-white font-medium"
                  >
                    Resume
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
