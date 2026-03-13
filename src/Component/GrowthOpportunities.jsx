import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const TYPING_TEXTS = [
  " We provide opportunities for learning and professional growth. Access the latest courses, certifications, and resources.",
  " Our team members get the chance to work on exciting projects and develop valuable digital skills in a futuristic environment.",
  " We believe in promoting from within. Your growth at Weblydoor is limited only by your ambition and passion for excellence.",
  " Get guidance from industry experts and experienced leaders to navigate your career path and unlock your full potential."
];

function useSimpleTyping(texts, typingSpeed = 50, deletingSpeed = 30, pause = 1500) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState('typing');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    let timeout;
    const full = texts[textIdx];

    if (phase === 'typing') {
      if (charIdx < full.length) {
        timeout = setTimeout(() => {
          setDisplayed(full.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pause);
      }
    } else if (phase === 'pausing') {
      setPhase('deleting');
    } else if (phase === 'deleting') {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setDisplayed(full.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        }, deletingSpeed);
      } else {
        const next = (textIdx + 1) % texts.length;
        setTextIdx(next);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [phase, charIdx, textIdx, texts, typingSpeed, deletingSpeed, pause]);

  return displayed;
}

const GrowthOpportunities = () => {
  const navigate = useNavigate();
  const displayedText = useSimpleTyping(TYPING_TEXTS);
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

  const opportunities = [
    {
      title: "Learning Resources",
      desc: "Access to the latest courses, certifications, and resources to help you stay at the top of your game.",
      icon: "📚"
    },
    {
      title: "Skill Workshops",
      desc: "Regular internal and external workshops to sharpen your digital and soft skills.",
      icon: "🛠️"
    },
    {
      title: "Career Mentorship",
      desc: "Get guidance from industry experts and experienced leaders to navigate your career path.",
      icon: "👨‍🏫"
    },
    {
      title: "Promising Futures",
      desc: "We believe in promoting from within. Your growth at Weblydoor is limited only by your ambition.",
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
              Growth <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4F20D] to-white">
                Opportunities
              </span>
            </h1>
            <div className="w-full mt-2 relative">
              <span className="absolute -left-[3px] top-0 w-2 h-2 rounded-full bg-[#C4F20D] animate-pulse shadow-[0_0_10px_#C4F20D]" />
              <p className="text-xl text-gray-400 font-sans leading-relaxed mb-10 max-w-xl border-l-4 border-[#C4F20D]/30 pl-6 min-h-[120px] flex items-start text-left">
                <span>
                  {displayedText}
                  <span
                    className="inline-block w-[3px] h-[1em] bg-[#C4F20D] ml-[6px] align-middle rounded-[2px] animate-[blink_1s_step-end_infinite]"
                  />
                </span>
              </p>
            </div>
            <style>{`
              @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }
            `}</style>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {opportunities.map((o, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-[#C4F20D]/50 transition-colors duration-500 group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{o.icon}</div>
                <h3 className="text-xl font-bold text-[#C4F20D] mb-3">{o.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C4F20D]/10 blur-[100px] -z-10 rounded-full" />
          <h2 className="text-3xl sm:text-5xl font-['Astro'] mb-12">Unlocking Potential</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">01</div>
              <h4 className="text-xl font-bold mb-4">Training</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Stay updated with the latest trends and technologies through our comprehensive training programs.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">02</div>
              <h4 className="text-xl font-bold mb-4">Leadership</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Develop the leadership skills you need to manage teams and drive successful projects.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">03</div>
              <h4 className="text-xl font-bold mb-4">Expertise</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Become a subject matter expert in your field and gain recognition for your technical skills.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GrowthOpportunities;
