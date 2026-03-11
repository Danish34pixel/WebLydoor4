import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Website = () => {
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
      title: "Custom Web Solutions",
      desc: "We don't use generic templates. Every line of code is written to fit your specific business goals and brand identity.",
      icon: "🚀"
    },
    {
      title: "Cutting-Edge Technology",
      desc: "Using React, Next.js, and modern CSS frameworks like Tailwind to ensure your site is fast, secure, and easily maintainable.",
      icon: "💻"
    },
    {
      title: "Mobile-First Design",
      desc: "Over 60% of web traffic is mobile. We ensure your website looks stunning and functions perfectly on every screen size.",
      icon: "📱"
    },
    {
      title: "SEO-Optimized Code",
      desc: "Visibility is key. Our development process follows the best SEO practices to help your site rank higher on Google.",
      icon: "📈"
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
                Development
              </span>
            </h1>
            <p className="text-xl text-gray-400 font-sans leading-relaxed mb-10 max-w-xl">
              At WeblyDoor, we don't just build sites; we build digital experiences. Our development team focuses on high performance, accessibility, and visual excellence to help you dominate your industry.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 rounded-full border border-[#C4F20D]/30 bg-[#C4F20D]/5 text-[#C4F20D] font-bold text-sm tracking-widest">
                REACT 19
              </div>
              <div className="px-6 py-3 rounded-full border border-[#C4F20D]/30 bg-[#C4F20D]/5 text-[#C4F20D] font-bold text-sm tracking-widest">
                GSAP ANIMATIONS
              </div>
              <div className="px-6 py-3 rounded-full border border-[#C4F20D]/30 bg-[#C4F20D]/5 text-[#C4F20D] font-bold text-sm tracking-widest">
                NEXT-GEN SEO
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
          <h2 className="text-3xl sm:text-5xl font-['Astro'] mb-12">What we are capable of</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">01</div>
              <h4 className="text-xl font-bold mb-4">Scalability</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Platforms that grow with your business. From startups to enterprises, our architecture is built to handle millions of users seamlessly.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">02</div>
              <h4 className="text-xl font-bold mb-4">Performance</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                We optimize for Core Web Vitals. Our sites score 90+ on Lighthouse, ensuring lightning-fast load times and happy visitors.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">03</div>
              <h4 className="text-xl font-bold mb-4">Security</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Industry-standard protection. We implement advanced security protocols to keep your data and your users' privacy safe.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Website;
