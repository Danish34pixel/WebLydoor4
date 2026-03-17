import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Approach = () => {
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
      title: "Discovery",
      desc: "We start by diving deep into your business, goals, and challenges to understand the 'why' before the 'how'.",
      icon: "/Discovery.png"
    },
    {
      title: "Strategy",
      desc: "Creating a roadmap for success. We plan every step to ensure your project is delivered on time and above expectations.",
      icon: "/Stratergy.png"
    },
    {
      title: "Execution",
      desc: "Where the magic happens. Our experts build your solution using the latest tech and best design practices.",
      icon: "/Excecution.png"
    },
    {
      title: "Optimization",
      desc: "We don't just launch and leave. We monitor, refine, and optimize to ensure long-term growth and high performance.",
      icon: "/Optamize.png"
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
              Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4F20D] to-white">
                Approach
              </span>
            </h1>
            <p className="text-xl text-gray-400 font-sans leading-relaxed mb-10 max-w-xl">
              Weblydoor's approach is rooted in understanding and collaboration. We blend deep technical expertise with business acumen to deliver superior results.
            </p>
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
          <h2 className="text-3xl sm:text-5xl font-['Eurostile'] mb-12">The Weblydoor Flow</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Eurostile']">01</div>
              <h4 className="text-xl font-bold mb-4">Deep Insight</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                We believe the best solutions come from the deepest understanding. We ask the hard questions to find the best answers.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Eurostile']">02</div>
              <h4 className="text-xl font-bold mb-4">Swift Agility</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                The digital world moves fast. We work in agile cycles to ensure we're always reacting to market changes in real-time.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Eurostile']">03</div>
              <h4 className="text-xl font-bold mb-4">Scalable Design</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                We build for today with tomorrow in mind. Your digital assets will be ready to grow alongside your business.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Approach;
