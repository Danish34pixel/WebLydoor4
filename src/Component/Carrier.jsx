import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import gsap from "gsap";

const TYPING_TEXTS = [
  " Careers at Weblydoor: We believe that great people build great companies. We are always looking for talented and passionate individuals.",
  " Growth Opportunities: We provide opportunities for learning and professional growth. Work on exciting projects and develop digital skills.",
  " Work With Us: Joining Weblydoor means becoming part of a team that values creativity, innovation, and collaboration.",
  " Join Our Team: If you are passionate about digital technology, marketing, or creative design, we would love to hear from you."
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

const CAREER_ITEMS = [
  {
    title: "Work With Us",
    description: "Joining Weblydoor means becoming part of a team that values creativity, innovation, and collaboration. We encourage our team members to bring new ideas and contribute to meaningful projects.",
    icon: (
      <svg className="w-7 h-7 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Growth Opportunities",
    description: "We provide opportunities for learning and professional growth. Our team members get the chance to work on exciting projects and develop valuable digital skills.",
    icon: (
      <svg className="w-7 h-7 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Join Our Team",
    description: "If you are passionate about digital technology, marketing, or creative design, we would love to hear from you. Send us your resume and become a part of our growing team.",
    icon: (
      <svg className="w-7 h-7 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  }
];

// Hook for intersection observer
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const CareerCard = ({ item, index }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const innerCardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cardRef2, inView] = useInView(0.1);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -12);
    setRotateY(((x - centerX) / centerX) * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const delay = index * 120;

  const handleClick = () => {
    const routeMap = {
      'Work With Us': '/work-with-us',
      'Growth Opportunities': '/growth-opportunities',
      'Join Our Team': '/join-our-team'
    };
    const targetRoute = routeMap[item.title];
    if (!targetRoute) return;

    const tl = gsap.timeline({
      onComplete: () => navigate(targetRoute)
    });

    tl.to(cardRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.inOut"
    })
    .to(cardRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    });

    const cardBody = cardRef.current.querySelector('.card-body-inner');
    if (cardBody) {
      gsap.to(cardBody, {
        borderColor: 'rgba(196,242,13,1)',
        boxShadow: '0 0 30px rgba(196,242,13,0.4)',
        duration: 0.15,
        yoyo: true,
        repeat: 1
      });
    }
  };

  return (
    <div
      ref={el => { cardRef.current = el; cardRef2.current = el; }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className="group relative w-full h-full cursor-pointer transition-none"
      style={{
        perspective: '1000px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div
        ref={innerCardRef}
        className="w-full h-full relative"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.4s ease-out',
        }}
      >
        {/* Glow orb */}
        <div
          className="absolute inset-0 rounded-2xl -z-10 blur-2xl transition-opacity duration-700"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(196,242,13,0.18) 0%, transparent 70%)',
            opacity: isHovered ? 1 : 0,
            transform: 'translateZ(-20px) scale(1.1)',
          }}
        />

        {/* Card Body */}
        <div
          className="card-body-inner w-full h-full bg-[#050702]/60 backdrop-blur-xl border border-[#C4F20D]/10 group-hover:border-[#C4F20D]/50 rounded-2xl p-6 sm:p-8 flex flex-col items-start overflow-hidden relative shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-400 group-hover:shadow-[0_12px_45px_rgba(196,242,13,0.12)]"
          style={{ transition: 'border-color 0.4s, box-shadow 0.4s' }}
        >
          {/* Scan line sweep on hover */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div
              className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#C4F20D]/30 to-transparent -top-[5%] group-hover:top-[105%] transition-all duration-1000 ease-in-out"
            />
          </div>

          {/* Tech grid overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none rounded-2xl bg-[linear-gradient(rgba(196,242,13,1)_1px,transparent_1px),linear-gradient(90deg,rgba(196,242,13,1)_1px,transparent_1px)] bg-[size:20px_20px]" />

          {/* Icon */}
          <div className="mb-2 mt-2 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_15px_rgba(196,242,13,0.3)] transition-all duration-300 pointer-events-none" style={{ transform: 'translateZ(30px)' }}>
            {typeof item.icon === 'string' ? (
              <div className="w-16 h-16 bg-white/95 rounded-2xl p-2.5 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)] ring-1 ring-white/20 relative">
                <img src={item.icon} alt={item.title} className="max-w-full max-h-full object-contain relative z-10" />
              </div>
            ) : (
              <div className="text-4xl text-[#C4F20D] w-16 h-16 flex items-center justify-center bg-[#C4F20D]/10 rounded-2xl ring-1 ring-[#C4F20D]/30 shadow-[0_0_15px_rgba(196,242,13,0.1)]">
                {item.icon}
              </div>
            )}
          </div>

          {/* Title */}
          <div style={{ transform: 'translateZ(40px)' }} className="z-10 bg-[#050702]/50 px-2 py-1 rounded inline-block -ml-2 mt-2">
            <h3
              className="text-xl sm:text-2xl font-bold text-[#C4F20D] font-['Eurostile'] tracking-wider leading-tight group-hover:drop-shadow-[0_0_20px_rgba(196,242,13,0.5)] transition-all duration-400"
            >
              {item.title}
            </h3>
          </div>

          {/* Description */}
          <div style={{ transform: 'translateZ(20px)' }}>
            <p className="text-[0.95rem] text-gray-300/90 leading-relaxed font-sans mt-2">
              {item.description}
            </p>
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-[#C4F20D] opacity-0 group-hover:opacity-100 rounded-tr-2xl -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none transition-all duration-500" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#C4F20D] opacity-0 group-hover:opacity-50 rounded-bl-2xl translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none transition-all duration-500" />

          {/* Watermark index */}
          <div
            className="absolute bottom-4 right-5 text-6xl font-extrabold font-['Eurostile'] select-none pointer-events-none text-[rgba(196,242,13,0.04)] group-hover:text-[rgba(196,242,13,0.08)] transition-colors duration-400"
          >
            0{index + 1}
          </div>
        </div>
      </div>
    </div>
  );
};

const Carrier = () => {
  const displayedText = useSimpleTyping(TYPING_TEXTS);
  const [headerRef, headerInView] = useInView(0.1);

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 10px rgba(196,242,13,0.2); }
          50% { box-shadow: 0 0 30px rgba(196,242,13,0.5), 0 0 60px rgba(196,242,13,0.2); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .career-glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
      `}</style>

      <section className="relative w-full py-24 sm:py-32 px-4 sm:px-8 xl:px-12 flex flex-col justify-center overflow-hidden" id="Carrier">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          
          <div
            ref={headerRef}
            className="text-center mb-16"
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {/* Badge */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#C4F20D]" />
              <span className="inline-block py-1 px-4 rounded-full border border-[#C4F20D]/40 text-[#C4F20D] text-xs font-bold tracking-[0.2em] uppercase bg-[#C4F20D]/10 relative overflow-hidden">
                Join Our Journey
              </span>
              <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#C4F20D]" />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#C4F20D] to-white font-['Eurostile'] mb-6 tracking-wider">
              Carrier at Weblydoor
            </h2>
            
            <div className="w-full mt-2 relative">
              <span className="absolute -left-[3px] top-0 w-2 h-2 rounded-full bg-[#C4F20D] career-glow-pulse" />
              <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-gray-400 font-sans leading-relaxed border-l-4 border-[#C4F20D]/30 pl-6 min-h-[140px] flex items-start text-left">
                <span>
                  {displayedText}
                  <span
                    className="inline-block w-[3px] h-[1em] bg-[#C4F20D] ml-[6px] align-middle rounded-[2px]"
                    style={{ animation: 'blink 1s step-end infinite' }}
                  />
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CAREER_ITEMS.map((item, index) => (
              <CareerCard key={index} item={item} index={index} />
            ))}
          </div>

          {/* CTA Footer */}
          <div className="mt-20 text-center">
            <a 
              href="mailto:danishkhannn34@gmail.com"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#C4F20D] text-black font-extrabold font-['Eurostile'] tracking-widest rounded-full hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_rgba(196,242,13,0.3)] hover:shadow-[0_0_50px_rgba(196,242,13,0.5)]"
            >
              SEND RESUME
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

        </div>
      </section>
    </>
  );
};

export default Carrier;
