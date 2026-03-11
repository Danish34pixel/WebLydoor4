import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const SEO = () => {
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
      title: "Keyword Research",
      desc: "We identify high-value keywords that your potential customers are actually searching for to drive targeted traffic.",
      icon: "🔍"
    },
    {
      title: "On-Page Optimization",
      desc: "Optimizing your content, meta tags, and structure to ensure search engines understand your value perfectly.",
      icon: "📄"
    },
    {
      title: "Technical SEO",
      desc: "Improving site speed, mobile-friendliness, and crawlability to provide a rock-solid foundation for rankings.",
      icon: "⚙️"
    },
    {
      title: "Analytics & Reporting",
      desc: "Transparent tracking and data-driven insights to measure growth and continuously refine our strategy.",
      icon: "📊"
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
            <h1 className="text-5xl sm:text-7xl font-extrabold font-['Astro'] tracking-tighter mb-8 leading-none uppercase">
              SEO
            </h1>
            <p className="text-xl text-gray-400 font-sans leading-relaxed mb-10 max-w-xl">
              Visibility is everything in the digital age. Our SEO strategies are built to put your business at the top of search results and keep it there.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 rounded-full border border-[#C4F20D]/30 bg-[#C4F20D]/5 text-[#C4F20D] font-bold text-sm tracking-widest">
                DATA-DRIVEN
              </div>
              <div className="px-6 py-3 rounded-full border border-[#C4F20D]/30 bg-[#C4F20D]/5 text-[#C4F20D] font-bold text-sm tracking-widest">
                WHITE HAT
              </div>
              <div className="px-6 py-3 rounded-full border border-[#C4F20D]/30 bg-[#C4F20D]/5 text-[#C4F20D] font-bold text-sm tracking-widest">
                GLOBAL REACH
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
          <h2 className="text-3xl sm:text-5xl font-['Astro'] mb-12">Our SEO Results</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">01</div>
              <h4 className="text-xl font-bold mb-4">Traffic Boost</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                We focus on high-intent traffic that converts, not just vanity metrics. Expect a significant increase in organic leads.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">02</div>
              <h4 className="text-xl font-bold mb-4">Rankings</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Climb the SERPs for keywords that matter. We monitor rankings daily and adjust strategies to stay ahead of competitors.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">03</div>
              <h4 className="text-xl font-bold mb-4">ROI Focused</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every SEO action is geared towards your bottom line. We provide clear ROI reporting so you know exactly where your investment goes.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SEO;
