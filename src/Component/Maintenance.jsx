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
      icon: "🕵️"
    },
    {
      title: "Security Patches",
      desc: "Regular updates to core files and plugins to keep hackers at bay and your data secure.",
      icon: "🛡️"
    },
    {
      title: "Performance Audits",
      desc: "Routine checks and optimizations to maintain lightning-fast speeds and high Lighthouse scores.",
      icon: "⚡"
    },
    {
      title: "Content Updates",
      desc: "Need a quick change? We handle regular content and image updates so your site always stays fresh.",
      icon: "🔄"
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
            <h1 className="text-5xl sm:text-7xl font-extrabold font-['Astro'] tracking-tighter mb-8 leading-none">
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

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-[#C4F20D]/50 transition-colors duration-500 group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{f.icon}</div>
                <h3 className="text-xl font-bold text-[#C4F20D] mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C4F20D]/10 blur-[100px] -z-10 rounded-full" />
          <h2 className="text-3xl sm:text-5xl font-['Astro'] mb-12">Peace of Mind</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">01</div>
              <h4 className="text-xl font-bold mb-4">Uptime Guarantee</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                We monitor your site every minute. If it goes down, we're on it immediately. Your business never sleeps, and neither does our support.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">02</div>
              <h4 className="text-xl font-bold mb-4">Data Protection</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Daily backups and advanced security hardening. We treat your data as if it were our own, with the highest standards of care.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">03</div>
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
