import { Navbar, Hero, About, Experience, Tech, Contact } from "./components";

function App() {
  return (
    <div className="relative z-0 bg-primary">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Hero Section with Space Background */}
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Hero />
      </div>

      {/* About Section */}
      <About />

      {/* Experience & Projects Section */}
      <Experience />

      {/* Tech Stack Section */}
      <Tech />

      {/* Contact Section with 3D Earth */}
      <div className="relative z-0">
        <Contact />
      </div>
    </div>
  );
}

export default App;
