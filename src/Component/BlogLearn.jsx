import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const BlogLearn = () => {
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
      title: "Market Analysis",
      desc: "Learn how to dissect your niche and find the gaps that your competitors are missing.",
      icon: "📊"
    },
    {
      title: "Content Mastery",
      desc: "Discover the secrets of creating content that doesn't just get clicks, but builds authority and trust.",
      icon: "✍️"
    },
    {
      title: "SEO Foundations",
      desc: "Master the basics of search engine optimization to ensure your voice is heard in the digital noise.",
      icon: "🔍"
    },
    {
      title: "Brand Strategy",
      desc: "Understand how to build a visual and verbal identity that resonates deeply with your target audience.",
      icon: "🎨"
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
              Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4F20D] to-white">
                Insights
              </span>
            </h1>
            <p className="text-xl text-gray-400 font-sans leading-relaxed mb-10 max-w-xl">
              Knowledge is power. In this section, we share deep dives into the strategies and tactics that drive digital success today.
            </p>
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
          <h2 className="text-3xl sm:text-5xl font-['Astro'] mb-12">Educational Pillar</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">01</div>
              <h4 className="text-xl font-bold mb-4">Strategic Depth</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                We go beyond surface-level tips. Learn the underlying psychological and technical principles of digital marketing.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">02</div>
              <h4 className="text-xl font-bold mb-4">Future Trends</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Stay ahead of the game. We break down upcoming technologies like AI and Web3 and how they'll impact your business.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">03</div>
              <h4 className="text-xl font-bold mb-4">Actionable Guides</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every insight comes with a plan. We provide step-by-step guides you can implement in your business immediately.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogLearn;
