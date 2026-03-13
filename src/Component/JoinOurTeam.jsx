import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const TYPING_TEXTS = [
  " If you are passionate about digital technology, marketing, or creative design, we would love to hear from you. Join our growing team.",
  " Showcase your work! A strong portfolio is the best way to demonstrate your expertise and passion for digital excellence.",
  " We values personality as much as skill. Be yourself and let's talk about how you see yourself growing with the Weblydoor family.",
  " Explore our current openings and submit your application today. Become a part of a team that is redefining the digital landscape."
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

const JoinOurTeam = () => {
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

  const steps = [
    {
      title: "Explore Openings",
      desc: "Check our current openings to see if there's a match for your skills and passion.",
      icon: "🔍"
    },
    {
      title: "Submit Application",
      desc: "Send us your resume and a cover letter that tells us why you're a perfect fit for Weblydoor.",
      icon: "✉️"
    },
    {
      title: "Culture Interview",
      desc: "We values personality as much as skill. Let's talk about your goals and how you see yourself growing with us.",
      icon: "🗣️"
    },
    {
      title: "Technical Review",
      desc: "A hands-on review of your technical skills and how you approach complex digital problems.",
      icon: "💻"
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
              Join <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4F20D] to-white">
                Our Team
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
            {steps.map((s, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-[#C4F20D]/50 transition-colors duration-500 group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{s.icon}</div>
                <h3 className="text-xl font-bold text-[#C4F20D] mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C4F20D]/10 blur-[100px] -z-10 rounded-full" />
          <h2 className="text-3xl sm:text-5xl font-['Astro'] mb-12">Applying to Weblydoor</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">01</div>
              <h4 className="text-xl font-bold mb-4">Resume</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Make sure your resume highlights your most relevant skills and projects.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">02</div>
              <h4 className="text-xl font-bold mb-4">Portfolio</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Showcase your work! A strong portfolio is the best way to demonstrate your expertise.
              </p>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-[#C4F20D]/20 mb-4 font-['Astro']">03</div>
              <h4 className="text-xl font-bold mb-4">Interview</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Be yourself. We're looking for passionate individuals who are excited to join our journey.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-20 text-center">
            <a 
              href="mailto:danishkhannn34@gmail.com"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#C4F20D] text-black font-extrabold font-['Astro'] tracking-widest rounded-full hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_rgba(196,242,13,0.3)] hover:shadow-[0_0_50px_rgba(196,242,13,0.5)]"
            >
              SEND RESUME
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
      </main>
    </div>
  );
};

export default JoinOurTeam;
