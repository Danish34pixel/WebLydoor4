import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Maintenance = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const tl = gsap.timeline();
    tl.fromTo(contentRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  const features = [
    {
      title: "24/7 Monitoring",
      desc: "We keep a constant eye on your website to ensure it's always up and running perfectly for your customers.",
      icon: "/Monitoring.png"
    },
    {
      title: "Security Patches",
      desc: "Regular updates to core files and plugins to keep hackers at bay and your data secure.",
      icon: "/Security.png"
    },
    {
      title: "Performance Audits",
      desc: "Routine checks and optimizations to maintain lightning-fast speeds and high Lighthouse scores.",
      icon: "/AppOptim.png"
    },
    {
      title: "Content Updates",
      desc: "Need a quick change? We handle regular content and image updates so your site always stays fresh.",
      icon: "/Updated.png"
    }
  ];

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-transparent text-white selection:bg-[#C4F20D] selection:text-black">
      
      <main ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-8 xl:px-12 pt-10 pb-20 relative z-10 transition-all">
        <button 
          onClick={() => navigate('/')}
          className="mb-10 group/back flex items-center gap-3 text-[#C4F20D]/80 hover:text-[#C4F20D] transition-all duration-300 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm py-2 px-4 rounded-lg bg-white/5 border border-white/10 hover:border-[#C4F20D]/30"
        >
          <svg className="w-5 h-5 group-hover/back:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl sm:text-7xl font-extrabold font-['Eurostile'] tracking-tighter mb-8 leading-none">
              Website <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4F20D] to-white">
                Maintenance
              </span>
            </h1>
            <p className="text-xl text-gray-400 font-sans leading-relaxed mb-10 max-w-xl">
              Launch is just the beginning. Our maintenance plans ensure your digital asset remains secure, fast, and ahead of the curve.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 rounded-full border border-[#C4F20D]/30 bg-[#C4F20D]/5 text-[#C4F20D] font-bold text-sm tracking-widest">
                PROACTIVE
              </div>
              <div className="px-6 py-3 rounded-full border border-[#C4F20D]/30 bg-[#C4F20D]/5 text-[#C4F20D] font-bold text-sm tracking-widest">
                SECURE
              </div>
              <div className="px-6 py-3 rounded-full border border-[#C4F20D]/30 bg-[#C4F20D]/5 text-[#C4F20D] font-bold text-sm tracking-widest">
                RELIABLE
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="group relative w-full h-full cursor-pointer transition-none"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="w-full h-full relative cursor-default"
                  style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s ease-out' }}
                >
                  <div className="absolute inset-0 rounded-2xl -z-10 blur-2xl bg-[radial-gradient(circle_at_50%_50%,rgba(196,242,13,0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-600 transform -translate-z-20 scale-110" />

                  <div className="card-body-inner w-full h-full bg-[#050702]/60 backdrop-blur-xl border border-[#C4F20D]/10 group-hover:border-[#C4F20D]/50 rounded-2xl p-6 sm:p-8 flex flex-col items-start gap-4 overflow-hidden relative shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-400 group-hover:shadow-[0_12px_45px_rgba(196,242,13,0.12)]">
                    
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#C4F20D]/30 to-transparent -top-[5%] group-hover:top-[105%] transition-all duration-1000 ease-in-out" />
                    </div>

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none rounded-2xl bg-[linear-gradient(rgba(196,242,13,1)_1px,transparent_1px),linear-gradient(90deg,rgba(196,242,13,1)_1px,transparent_1px)] bg-[size:20px_20px]" />

                    <div className="mb-2 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_15px_rgba(196,242,13,0.3)] transition-all duration-300 pointer-events-none" style={{ transform: 'translateZ(30px)' }}>
                      {f.icon.startsWith('/') ? (
                        <div className="w-16 h-16 rounded-2xl p-2.5 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)] ring-1 ring-white/20 relative">
                          <img src={f.icon} alt={f.title} className="max-w-full max-h-full object-contain relative z-10" />
                        </div>
                      ) : (
                        <div className="text-4xl text-[#C4F20D] w-16 h-16 flex items-center justify-center bg-[#C4F20D]/10 rounded-2xl ring-1 ring-[#C4F20D]/30 shadow-[0_0_15px_rgba(196,242,13,0.1)]">
                          {f.icon}
                        </div>
                      )}
                    </div>

                    <div style={{ transform: 'translateZ(40px)' }} className="z-10 bg-[#050702]/50 px-2 py-1 rounded inline-block -ml-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#C4F20D] font-['Eurostile'] tracking-wider leading-tight group-hover:drop-shadow-[0_0_20px_rgba(196,242,13,0.5)] transition-all duration-400">
                        {f.title}
                      </h3>
                    </div>

                    <div style={{ transform: 'translateZ(20px)' }}>
                      <p className="text-[0.95rem] text-gray-300/90 leading-relaxed font-sans mt-2">
                        {f.desc}
                      </p>
                    </div>

                    <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-[#C4F20D] opacity-0 group-hover:opacity-100 rounded-tr-2xl -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#C4F20D] opacity-0 group-hover:opacity-50 rounded-bl-2xl translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none transition-all duration-500" />

                    <div className="absolute bottom-4 right-5 text-6xl font-extrabold font-['Eurostile'] select-none pointer-events-none text-[rgba(196,242,13,0.04)] group-hover:text-[rgba(196,242,13,0.08)] transition-colors duration-400">
                      0{i + 1}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C4F20D]/10 blur-[100px] -z-10 rounded-full" />
          <h2 className="text-3xl sm:text-5xl font-['Eurostile'] mb-12">Peace of Mind</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Eurostile']">01</div>
              <h4 className="text-xl font-bold mb-4">Uptime Guarantee</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                We monitor your site every minute. If it goes down, we're on it immediately. Your business never sleeps, and neither does our support.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Eurostile']">02</div>
              <h4 className="text-xl font-bold mb-4">Data Protection</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Daily backups and advanced security hardening. We treat your data as if it were our own, with the highest standards of care.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Eurostile']">03</div>
              <h4 className="text-xl font-bold mb-4">Ongoing Optimization</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                The web changes daily. We ensure your site adapts to new browser updates and technologies to maintain peak performance.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Maintenance;
