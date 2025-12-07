import React, { useState, useEffect, useRef } from 'react';
import { 
  Atom, 
  Calendar, 
  BookOpen, 
  Users, 
  Menu, 
  X, 
  ChevronRight, 
  Mail, 
  Github, 
  Linkedin, 
  Instagram, 
  Globe,
  Telescope,
  Zap,
  Award
} from 'lucide-react';

const PSSWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const canvasRef = useRef(null);

  // Handle scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Physics Vector Field Animation (Curl Effect)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;
    
    // Grid configuration
    const spacing = 30; // Space between vectors
    let cols = 0;
    let rows = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / spacing);
      rows = Math.ceil(canvas.height / spacing);
    };

    // Track mouse
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    // Field Physics
    const drawField = () => {
      // Clear with slight fade for trail effect (optional, strictly clear for crisp lines)
      ctx.fillStyle = '#000000'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = '#22d3ee'; // Cyan-400
      ctx.lineWidth = 1;

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const px = x * spacing;
          const py = y * spacing;
          
          // Vector math
          const dx = mouseX - px;
          const dy = mouseY - py;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 500; // Influence radius

          // Base angle (default drift)
          let angle = Math.sin(Date.now() * 0.001 + x * 0.1) * 0.2; 
          let length = 2; // Base length
          let alpha = 0.1; // Base opacity

          // Interactive Curl
          if (distance < maxDist) {
            // Calculate angle towards mouse
            const angleToMouse = Math.atan2(dy, dx);
            
            // Add 90 degrees (PI/2) to create a CURL / VORTEX around the mouse
            // Like a magnetic field around a wire
            const curlAngle = angleToMouse + Math.PI / 2;
            
            // Interpolate based on distance (closer = stronger alignment to curl)
            const influence = 1 - (distance / maxDist);
            
            angle = curlAngle;
            length = 2 + (influence * 15); // Lines get longer near mouse
            alpha = 0.1 + (influence * 0.5); // Lines get brighter
          }

          // Draw Vector
          ctx.beginPath();
          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`; // Cyan with dynamic alpha
          
          // Center the rotation
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(angle);
          ctx.moveTo(-length/2, 0);
          ctx.lineTo(length/2, 0);
          ctx.stroke();
          ctx.restore();
        }
      }
      animationFrameId = requestAnimationFrame(drawField);
    };

    drawField();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Resources', href: '#resources' },
    { name: 'Team', href: '#team' },
  ];

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-cyan-500 selection:text-white relative">
      
      {/* Dynamic Physics Background */}
      <canvas 
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* Content Wrapper - Relative to sit above canvas */}
      <div className="relative z-10">

        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 border border-cyan-500/50 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-black">
                  <Atom className="text-cyan-400 w-6 h-6 animate-spin-slow" />
                </div>
                <div>
                  <span className="text-xl font-bold tracking-wider text-white">Physics Student Society</span>
                  <span className="block text-xs text-cyan-500 font-mono tracking-widest">IIT MADRAS</span>
                </div>
              </div>
              
              {/* Desktop Nav */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-full h-px bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </a>
                  ))}
                  <button className="bg-cyan-950/30 hover:bg-cyan-900/50 border border-cyan-500/50 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    Join PSS
                  </button>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-slate-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-md mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2 shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse"></span>
              <span className="text-sm text-slate-300 font-mono tracking-wide">Department of Physics, IIT Madras</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-white drop-shadow-2xl">
              LAWS OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">REALITY</span>
            </h1>
            
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-10 font-light leading-relaxed">
              Where curiosity meets the cosmos. Join the community at <span className="text-cyan-400 font-semibold">IIT Madras</span> exploring everything from quantum realms to galactic clusters.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-none border border-cyan-500 text-cyan-400 font-bold transition-all hover:text-black">
                <div className="absolute inset-0 w-0 bg-cyan-500 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative flex items-center ">Explore Events <ChevronRight className="ml-2 w-5 h-5" /></span>
              </button>
              <button className="px-8 py-4 bg-transparent border border-white/20 text-slate-300 hover:bg-white/5 hover:border-white/40 transition-all font-medium">
                View Research
              </button>
            </div>
          </div>
        </section>

        {/* About / Stats Section */}
        <section id="about" className="py-20 bg-black/80 backdrop-blur-sm border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-8 rounded-none border border-white/10 bg-black hover:border-cyan-500/50 transition-colors group">
                <Users className="w-12 h-12 text-cyan-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">500+</h3>
                <p className="text-slate-500 uppercase tracking-widest text-xs">Active Members</p>
              </div>
              <div className="p-8 rounded-none border border-white/10 bg-black hover:border-purple-500/50 transition-colors group">
                <Calendar className="w-12 h-12 text-purple-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">50+</h3>
                <p className="text-slate-500 uppercase tracking-widest text-xs">Annual Events</p>
              </div>
              <div className="p-8 rounded-none border border-white/10 bg-black hover:border-blue-500/50 transition-colors group">
                <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">20+</h3>
                <p className="text-slate-500 uppercase tracking-widest text-xs">Research Groups</p>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-24 relative bg-gradient-to-b from-black via-slate-950 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Activities</h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-black/40 backdrop-blur-md rounded-none border border-white/10 hover:border-cyan-500/50 transition-all group hover:-translate-y-2 duration-300">
                <div className="h-48 bg-black relative overflow-hidden flex items-center justify-center border-b border-white/5">
                   {/* Abstract Grid Background inside card */}
                   <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                   <div className="text-center relative z-10">
                      <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                      <h3 className="text-xl font-bold text-white tracking-widest">HORIZON</h3>
                   </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">The Physics Fest</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">The flagship annual physics festival of IIT Madras. Guest lectures, workshops, quiz competitions, and paper presentations.</p>
                  <a href="#" className="text-cyan-400 text-xs font-bold uppercase tracking-widest hover:text-cyan-300 flex items-center group-hover:underline">Explore <ChevronRight className="w-4 h-4 ml-1" /></a>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-black/40 backdrop-blur-md rounded-none border border-white/10 hover:border-purple-500/50 transition-all group hover:-translate-y-2 duration-300">
                <div className="h-48 bg-black relative overflow-hidden flex items-center justify-center border-b border-white/5">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent"></div>
                   <div className="text-center relative z-10">
                      <Telescope className="w-12 h-12 text-purple-400 mx-auto mb-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                      <h3 className="text-xl font-bold text-white tracking-widest">ASTRO</h3>
                   </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">Star Gazing</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">Regular observation sessions using the institute telescopes. Exploring nebulas, planets, and constellations.</p>
                  <a href="#" className="text-purple-400 text-xs font-bold uppercase tracking-widest hover:text-purple-300 flex items-center group-hover:underline">Schedule <ChevronRight className="w-4 h-4 ml-1" /></a>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-black/40 backdrop-blur-md rounded-none border border-white/10 hover:border-green-500/50 transition-all group hover:-translate-y-2 duration-300">
                <div className="h-48 bg-black relative overflow-hidden flex items-center justify-center border-b border-white/5">
                   <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(74,222,128,0.1)_10px,rgba(74,222,128,0.1)_20px)]"></div>
                   <div className="text-center relative z-10">
                      <Atom className="w-12 h-12 text-green-400 mx-auto mb-2 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                      <h3 className="text-xl font-bold text-white tracking-widest">CIRCLE</h3>
                   </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">Physics Circle</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">Weekly informal discussions on topics ranging from Quantum Mechanics to General Relativity. Open to all.</p>
                  <a href="#" className="text-green-400 text-xs font-bold uppercase tracking-widest hover:text-green-300 flex items-center group-hover:underline">Join Discord <ChevronRight className="w-4 h-4 ml-1" /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-20 border-y border-white/10 bg-black/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid md:grid-cols-2 gap-16 items-start">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">Resources</h2>
                  <p className="text-slate-400 mb-10 text-lg font-light">
                    Curated materials to help you navigate your physics journey at IIT Madras, from course selection to summer internships.
                  </p>
                  
                  <div className="space-y-6">
                     <div className="flex items-center group cursor-pointer">
                        <div className="w-12 h-12 border border-white/20 flex items-center justify-center mr-6 group-hover:border-cyan-500 transition-colors">
                          <BookOpen className="text-cyan-400 w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg group-hover:text-cyan-400 transition-colors">Course Wiki</h4>
                          <p className="text-sm text-slate-500">Reviews and notes for core physics courses.</p>
                        </div>
                     </div>
                     <div className="flex items-center group cursor-pointer">
                        <div className="w-12 h-12 border border-white/20 flex items-center justify-center mr-6 group-hover:border-cyan-500 transition-colors">
                          <Globe className="text-cyan-400 w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg group-hover:text-cyan-400 transition-colors">Internship Portal</h4>
                          <p className="text-sm text-slate-500">Database of past summer research projects.</p>
                        </div>
                     </div>
                     <div className="flex items-center group cursor-pointer">
                        <div className="w-12 h-12 border border-white/20 flex items-center justify-center mr-6 group-hover:border-cyan-500 transition-colors">
                          <Award className="text-cyan-400 w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg group-hover:text-cyan-400 transition-colors">PhD Guide</h4>
                          <p className="text-sm text-slate-500">Resources for GRE, Apps, and funding.</p>
                        </div>
                     </div>
                  </div>
                </div>
                
                <div className="bg-slate-900/30 backdrop-blur-sm p-8 border border-white/10 relative">
                   <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 blur-3xl rounded-full"></div>
                   <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest flex items-center">
                     <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                     Notice Board
                   </h3>
                   <ul className="space-y-6">
                      <li className="group cursor-pointer">
                         <div className="flex justify-between items-start mb-1">
                           <span className="text-slate-300 font-medium group-hover:text-cyan-400 transition-colors">Summer School '24 Applications</span>
                           <span className="text-xs text-slate-600 font-mono border border-slate-800 px-2 py-1">OCT 24</span>
                         </div>
                         <p className="text-xs text-slate-500">Deadline approaching for early bird registration.</p>
                      </li>
                      <li className="group cursor-pointer border-t border-white/5 pt-4">
                         <div className="flex justify-between items-start mb-1">
                           <span className="text-slate-300 font-medium group-hover:text-cyan-400 transition-colors">Guest Lecture: Dr. David Tong</span>
                           <span className="text-xs text-slate-600 font-mono border border-slate-800 px-2 py-1">NOV 02</span>
                         </div>
                         <p className="text-xs text-slate-500">Topic: Quantum Field Theory. Venue: CLT.</p>
                      </li>
                      <li className="group cursor-pointer border-t border-white/5 pt-4">
                         <div className="flex justify-between items-start mb-1">
                           <span className="text-slate-300 font-medium group-hover:text-cyan-400 transition-colors">PSS Magazine Submissions</span>
                           <span className="text-xs text-slate-600 font-mono border border-slate-800 px-2 py-1">NOV 10</span>
                         </div>
                         <p className="text-xs text-slate-500">Send your articles to pss@smail.iitm.ac.in</p>
                      </li>
                   </ul>
                   <button className="w-full mt-8 py-3 border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white text-xs uppercase tracking-widest transition-all">
                      View All Notices
                   </button>
                </div>
             </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Core Team</h2>
              <p className="text-slate-500">The people behind the society.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { name: "Subhadeep Nayak", role: "President" },
                 { name: "Pritam Kumar Behera", role: "President" },
                 { name: "David Raj", role: "Events Head" },
                 { name: "Priya M.", role: "Web Admin" }
               ].map((member, index) => (
                 <div key={index} className="group relative bg-slate-900/20 border border-white/5 hover:border-cyan-500/50 transition-all duration-300">
                    <div className="aspect-square bg-slate-900 relative overflow-hidden flex items-center justify-center">
                       <Users className="w-20 h-20 text-slate-700 group-hover:text-cyan-500/50 transition-colors" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                       
                       {/* Social overlay */}
                       <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center space-x-4">
                          <Mail className="w-5 h-5 text-white cursor-pointer hover:text-cyan-400" />
                          <Linkedin className="w-5 h-5 text-white cursor-pointer hover:text-cyan-400" />
                       </div>
                    </div>
                    <div className="p-4 border-t border-white/5">
                       <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{member.name}</h3>
                       <p className="text-slate-500 text-xs uppercase tracking-wider">{member.role}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
               <div className="mb-6 md:mb-0">
                  <div className="flex items-center space-x-2 mb-2">
                     <Atom className="text-cyan-500 w-6 h-6" />
                     <span className="text-xl font-bold text-white tracking-widest">PSS IITM</span>
                  </div>
                  <p className="text-slate-600 text-xs uppercase tracking-wide">Department of Physics, IIT Madras<br/>Chennai, Tamil Nadu 600036</p>
               </div>
               
               <div className="flex space-x-8">
                  <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors"><Mail className="w-5 h-5" /></a>
                  <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors"><Github className="w-5 h-5" /></a>
                  <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors"><Instagram className="w-5 h-5" /></a>
               </div>
            </div>
            <div className="mt-8 text-center text-slate-800 text-xs tracking-wider">
               &copy; 2024 PHYSICS STUDENT SOCIETY, IIT MADRAS.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PSSWebsite;
