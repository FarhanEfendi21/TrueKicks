import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [particles, setParticles] = useState([]);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Show logo after brief delay
    setTimeout(() => setShowLogo(true), 300);

    // Glitch effect periodically
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 2000);

    // Generate dynamic particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(newParticles);

    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.5;
      });
    }, 45);

    // Navigate after animation
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(glitchInterval);
    };
  }, [navigate]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white font-sans">
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 85, 0, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 85, 0, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Dynamic Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, rgba(255, 85, 0, ${particle.opacity}) 0%, transparent 70%)`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Large Gradient Orbs with Movement */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FF5500] rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob-slow"></div>
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-orange-600 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob-medium"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-red-600 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob-fast"></div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 animate-scanline"
          style={{
            background: 'linear-gradient(transparent 50%, rgba(255, 85, 0, 0.5) 50%)',
            backgroundSize: '100% 4px'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative h-full flex flex-col items-center justify-center z-10 px-6">
        
        {/* Mega TRUEKICKS Logo with Multiple Effects */}
        <div className={`relative mb-8 transition-all duration-1000 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 -m-16 rounded-full opacity-40 animate-ping-slow"
            style={{
              background: 'radial-gradient(circle, rgba(255, 85, 0, 0.4) 0%, transparent 70%)'
            }}
          />
          
          {/* Rotating Border Effect */}
          <div className="absolute inset-0 -m-12 animate-spin-slow">
            <div className="w-full h-full rounded-full border-2 border-transparent"
              style={{
                background: 'linear-gradient(45deg, #FF5500, transparent, #FF5500) border-box',
                WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }}
            />
          </div>

          {/* Main Logo with Glitch */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF5500] via-orange-500 to-red-500 rounded-3xl blur-3xl opacity-60 animate-pulse-slow"></div>
            
            <div className={`relative transform transition-all duration-300 ${glitchActive ? 'glitch-active' : ''}`}>
              <h1 className="text-[5rem] md:text-[7rem] lg:text-[9rem] font-black italic tracking-tighter px-8 py-6 select-none"
                style={{
                  background: 'linear-gradient(135deg, #fff 0%, #FF5500 50%, #fff 100%)',
                  backgroundSize: '200% 200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradientShift 3s ease infinite',
                  filter: 'drop-shadow(0 0 40px rgba(255, 85, 0, 0.8)) drop-shadow(0 0 80px rgba(255, 85, 0, 0.4))',
                  textShadow: glitchActive ? '2px 2px #FF5500, -2px -2px #00FFFF' : 'none',
                  transform: glitchActive ? 'skew(-2deg)' : 'none'
                }}
              >
                TRUE<span className="text-[#FF5500]">KICKS</span>
              </h1>
              
              {/* Glitch Layers */}
              {glitchActive && (
                <>
                  <h1 className="absolute inset-0 text-[5rem] md:text-[7rem] lg:text-[9rem] font-black italic tracking-tighter px-8 py-6 text-red-500 opacity-70"
                    style={{ transform: 'translate(-3px, 0)' }}
                  >
                    TRUE<span>KICKS</span>
                  </h1>
                  <h1 className="absolute inset-0 text-[5rem] md:text-[7rem] lg:text-[9rem] font-black italic tracking-tighter px-8 py-6 text-cyan-500 opacity-70"
                    style={{ transform: 'translate(3px, 0)' }}
                  >
                    TRUE<span>KICKS</span>
                  </h1>
                </>
              )}
            </div>

            {/* Light Rays */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute inset-0 animate-rotate-slow opacity-30">
                <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-[#FF5500] to-transparent"></div>
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-[#FF5500] to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stylish Divider */}
        <div className="relative w-64 h-px mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF5500] to-transparent animate-pulse"></div>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#FF5500] rounded-full animate-ping"></div>
        </div>

        {/* Tagline with Typing Effect */}
        <p className="text-lg md:text-xl font-light tracking-[0.3em] uppercase mb-12 animate-fade-in-up"
          style={{
            textShadow: '0 0 20px rgba(255, 85, 0, 0.5)',
            animation: 'fadeInUp 1s ease-out 0.5s both, flicker 4s ease-in-out infinite'
          }}
        >
          Find Your Dream Sneakers
        </p>

        {/* Ultra Modern Progress Bar */}
        <div className="w-80 relative">
          {/* Glow Background */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#FF5500] to-orange-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
          
          <div className="relative">
            {/* Track */}
            <div className="h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800 relative">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-shimmer"
                style={{ backgroundSize: '200% 100%' }}
              />
              
              {/* Progress Fill */}
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF5500] via-orange-500 to-[#FF5500] transition-all duration-300 ease-out rounded-full"
                style={{ 
                  width: `${progress}%`,
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s linear infinite',
                  boxShadow: '0 0 20px rgba(255, 85, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}
              >
                {/* Shine Effect */}
                <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-r from-transparent to-white opacity-30 animate-slide"></div>
              </div>
            </div>

            {/* Percentage Display */}
            <div className="flex justify-between items-center mt-3 text-sm">
              <span className="text-gray-500 tracking-wider font-mono">LOADING</span>
              <span className="text-[#FF5500] font-bold font-mono tracking-wider"
                style={{ textShadow: '0 0 10px rgba(255, 85, 0, 0.8)' }}
              >
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>

        {/* Animated Loading Indicator */}
        <div className="flex space-x-3 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-[#FF5500] rounded-full shadow-lg"
              style={{
                animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite`,
                boxShadow: '0 0 15px rgba(255, 85, 0, 0.8)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-20">
        <p className="text-xs text-gray-600 tracking-[0.3em] uppercase font-light animate-pulse">
          Premium Sneaker Marketplace
        </p>
      </div>

      {/* Custom Keyframe Animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-15px) translateX(5px); }
        }
        @keyframes blob-slow {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(40px, -60px) scale(1.2) rotate(120deg); }
          66% { transform: translate(-30px, 30px) scale(0.8) rotate(240deg); }
        }
        @keyframes blob-medium {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(-50px, 40px) scale(1.1) rotate(180deg); }
          66% { transform: translate(20px, -20px) scale(0.9) rotate(270deg); }
        }
        @keyframes blob-fast {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(-30px, -30px) scale(1.15) rotate(180deg); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.4; }
          50% { opacity: 0.2; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        
        .animate-blob-slow { animation: blob-slow 8s ease-in-out infinite; }
        .animate-blob-medium { animation: blob-medium 10s ease-in-out infinite; }
        .animate-blob-fast { animation: blob-fast 6s ease-in-out infinite; }
        .animate-scanline { animation: scanline 8s linear infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-rotate-slow { animation: rotate-slow 10s linear infinite; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out 0.5s both; }
        .animate-shimmer { animation: shimmer 3s linear infinite; }
        .animate-slide { animation: slide 2s ease-in-out infinite; }
        
        .glitch-active {
          animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
      `}</style>
    </div>
  );
}