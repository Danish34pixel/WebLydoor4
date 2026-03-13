import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const TYPING_TEXTS = [
  " Joining Weblydoor means becoming part of a team that values creativity, innovation, and collaboration. We encourage new ideas.",
  " Work on projects that matter. We build digital products that have a real impact on our clients and their customers globally.",
  " Our team thrives on diverse perspectives working together. We provide a flexible environment that empowers you to do your best work.",
  " We believe that the best ideas come from collaboration. Be a part of a culture that celebrates creativity and constant innovation."
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

const WorkWithUs = () => {
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

  const highlights = [
    {
      title: "Collaborative Culture",
      desc: "Our team thrives on collaboration. We believe that the best ideas come from diverse perspectives working together.",
      icon: "🤝"
    },
    {
      title: "Innovation First",
      desc: "We encourage our team members to push boundaries and bring new, innovative ideas to every project.",
      icon: "💡"
    },
    {
      title: "Flexible Environment",
      desc: "We value work-life balance and provide a flexible environment that empowers you to do your best work.",
      icon: "🏡"
    },
    {
      title: "Impactful Projects",
      desc: "Work on projects that matter. We build digital products that have a real impact on our clients and their customers.",
      icon: "🚀"
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
              Work <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4F20D] to-white">
                With Us
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
            {highlights.map((h, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-[#C4F20D]/50 transition-colors duration-500 group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{h.icon}</div>
                <h3 className="text-xl font-bold text-[#C4F20D] mb-3">{h.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C4F20D]/10 blur-[100px] -z-10 rounded-full" />
          <h2 className="text-3xl sm:text-5xl font-['Astro'] mb-12">Our Digital Life</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">01</div>
              <h4 className="text-xl font-bold mb-4">Values</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Integrity, passion, and excellence are at the core of everything we do at Weblydoor.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">02</div>
              <h4 className="text-xl font-bold mb-4">Community</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                We believe in building a strong community where everyone feels valued and respected.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">03</div>
              <h4 className="text-xl font-bold mb-4">Growth</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                We offer a clear path for career progression and support your journey every step of the way.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WorkWithUs;
