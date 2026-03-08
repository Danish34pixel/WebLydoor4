import React, { useRef, useState, useEffect } from "react";

const TYPING_TEXTS = [
  " Customer-Focused Approach: WeblyDoor believes in understanding each client's goals and delivering digital solutions that match their vision and business needs.",
  " Innovative Technology: We use modern tools and the latest technologies to build fast, secure, and scalable digital products.",
  " Creative Digital Strategies: Our team focuses on creative ideas and strategic planning to help brands stand out in the competitive digital market.",
  " Strong Online Presence: We help businesses build a professional online identity that attracts customers and builds trust.",
  " End-to-End Digital Services: From design and development to marketing and optimization, WeblyDoor provides complete digital solutions under one roof.",
  " Results-Driven Solutions: Our goal is not just to build websites but to deliver measurable results that support business growth.",
  " Reliable Support and Maintenance: We provide ongoing support to ensure that our clients' digital platforms run smoothly and stay updated.",
  " Focus on User Experience: WeblyDoor ensures that every website and digital product is easy to use, visually appealing, and engaging for users.",
  " Helping Businesses Grow Digitally: We aim to empower businesses by leveraging the power of digital technology to reach wider audiences and achieve long-term success.",
  " Commitment to Quality: Our team is dedicated to delivering high-quality digital solutions that reflect professionalism and innovation."
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

// Floating particle component
const Particle = ({ style }) => (
  <div
    className="absolute rounded-full bg-[#C4F20D] pointer-events-none"
    style={style}
  />
);

// Animated counter for stats
const AnimatedStat = ({ value, label, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      let start = 0;
      const end = parseInt(value);
      const duration = 2000;
      const step = (end / duration) * 16;
      const interval = setInterval(() => {
        start += step;
        if (start >= end) { setCount(end); clearInterval(interval); }
        else setCount(Math.floor(start));
      }, 16);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [visible, value, delay]);

  return (
    <div ref={ref} className="flex flex-col items-center group">
      <span className="text-3xl sm:text-4xl font-extrabold text-[#C4F20D] font-['Astro'] tabular-nums"
        style={{ textShadow: '0 0 20px rgba(196,242,13,0.6)' }}>
        {count}+
      </span>
      <span className="text-xs text-gray-400 tracking-widest uppercase mt-1">{label}</span>
    </div>
  );
};

const aboutItems = [
  {
    title: "Our Vision",
    description: "Our vision is to become a trusted digital partner for businesses looking to expand their online presence and achieve long-term growth.",
    icon: (
      <svg className="w-7 h-7 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: "Our Mission",
    description: "We aim to deliver high-quality digital services that combine creativity, technology, and strategy. Our goal is to help businesses unlock their full digital potential.",
    icon: (
      <svg className="w-7 h-7 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Our Approach",
    description: "At Weblydoor, we believe in understanding our clients' needs before providing solutions. We focus on creating customized strategies that deliver measurable results.",
    icon: (
      <svg className="w-7 h-7 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Our Commitment",
    description: "We are committed to delivering reliable, professional, and effective digital solutions that help our clients achieve success in the digital space.",
    icon: (
      <svg className="w-7 h-7 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  }
];

// Hook for intersection observer (scroll-triggered animation)
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

const AboutCard = ({ item, index }) => {
  const cardRef = useRef(null);
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

  // Stagger delay per card
  const delay = index * 120;

  return (
    <div
      ref={el => { cardRef.current = el; cardRef2.current = el; }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="group relative w-full h-full"
      style={{
        perspective: '1000px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div
        className="w-full h-full relative cursor-default"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Animated glow orb */}
        <div
          className="absolute inset-0 rounded-2xl -z-10 blur-2xl transition-opacity duration-700"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(196,242,13,0.18) 0%, transparent 70%)',
            opacity: isHovered ? 1 : 0,
            transform: 'translateZ(-20px) scale(1.1)',
          }}
        />

        {/* Card Body */}
        <div className="w-full h-full bg-[#050702]/80 backdrop-blur-xl border border-[#C4F20D]/20 group-hover:border-[#C4F20D]/70 rounded-2xl p-6 sm:p-8 flex flex-col items-start overflow-hidden relative shadow-[0_4px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_8px_40px_rgba(196,242,13,0.12)]"
          style={{ transition: 'border-color 0.4s, box-shadow 0.4s' }}>

          {/* Scan line sweep on hover */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
            style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
          >
            <div
              className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#C4F20D]/40 to-transparent"
              style={{
                top: isHovered ? '100%' : '-5%',
                transition: isHovered ? 'top 1.2s cubic-bezier(0.4,0,0.2,1)' : 'none',
              }}
            />
          </div>

          {/* Tech grid overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none rounded-2xl" style={{
            backgroundImage: 'linear-gradient(rgba(196,242,13,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,242,13,1) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

          {/* Ripple on enter */}
          {isHovered && (
            <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
              <div
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: 0, height: 0,
                  borderRadius: '50%',
                  background: 'rgba(196,242,13,0.06)',
                  transform: 'translate(-50%,-50%)',
                  animation: 'ripple 0.6s ease-out forwards',
                }}
              />
            </div>
          )}

          {/* Icon + Title */}
          <div className="flex items-center gap-4 mb-4 mt-2" style={{ transform: 'translateZ(30px)' }}>
            <div className="relative w-12 h-12 rounded-full bg-[#C4F20D]/10 flex items-center justify-center border border-[#C4F20D]/30 shadow-[0_0_15px_rgba(196,242,13,0.15)] group-hover:shadow-[0_0_25px_rgba(196,242,13,0.4)] shrink-0"
              style={{ transition: 'box-shadow 0.4s' }}>
              {/* Orbiting ring */}
              <div
                className="absolute inset-0 rounded-full border border-[#C4F20D]/40"
                style={{
                  animation: isHovered ? 'spin 3s linear infinite' : 'none',
                  borderStyle: 'dashed',
                }}
              />
              {/* Ping pulse */}
              <div className="absolute inset-0 rounded-full border border-[#C4F20D]/30 animate-ping opacity-20" />
              {/* Icon bounce on hover */}
              <div style={{
                transform: isHovered ? 'scale(1.2) translateZ(5px)' : 'scale(1)',
                transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              }}>
                {item.icon}
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#C4F20D] font-['Astro'] tracking-wider leading-tight"
              style={{ textShadow: isHovered ? '0 0 20px rgba(196,242,13,0.5)' : 'none', transition: 'text-shadow 0.4s' }}>
              {item.title}
            </h3>
          </div>

          <div style={{ transform: 'translateZ(20px)' }} className="mt-2 text-left">
            <p className="text-[0.95rem] text-gray-300/90 leading-relaxed font-sans mt-2">
              {item.description}
            </p>
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-[#C4F20D] opacity-0 group-hover:opacity-100 rounded-tr-2xl -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none"
            style={{ transition: 'opacity 0.5s, transform 0.5s' }} />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#C4F20D] opacity-0 group-hover:opacity-50 rounded-bl-2xl translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none"
            style={{ transition: 'opacity 0.5s, transform 0.5s' }} />

          {/* Index number watermark */}
          <div className="absolute bottom-4 right-5 text-6xl font-extrabold text-[#C4F20D]/5 font-['Astro'] select-none pointer-events-none"
            style={{ transition: 'color 0.4s', color: isHovered ? 'rgba(196,242,13,0.08)' : 'rgba(196,242,13,0.04)' }}>
            0{index + 1}
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated SVG circuit line decoration
const CircuitDecoration = () => (
  <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 400 600" fill="none" preserveAspectRatio="xMidYMid slice">
    <path d="M20 50 L80 50 L80 150 L160 150 L160 100 L240 100" stroke="#C4F20D" strokeWidth="1" strokeDasharray="4 4">
      <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="4s" repeatCount="indefinite" />
    </path>
    <path d="M380 200 L320 200 L320 300 L240 300 L240 380 L160 380" stroke="#C4F20D" strokeWidth="1" strokeDasharray="4 4">
      <animate attributeName="stroke-dashoffset" from="0" to="100" dur="5s" repeatCount="indefinite" />
    </path>
    <path d="M40 400 L100 400 L100 500 L200 500 L200 550 L300 550" stroke="#C4F20D" strokeWidth="1" strokeDasharray="3 6">
      <animate attributeName="stroke-dashoffset" from="0" to="-80" dur="6s" repeatCount="indefinite" />
    </path>
    <circle cx="80" cy="150" r="3" fill="#C4F20D" opacity="0.6">
      <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="240" cy="300" r="3" fill="#C4F20D" opacity="0.6">
      <animate attributeName="opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="200" cy="500" r="3" fill="#C4F20D" opacity="0.6">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const About = () => {
  const displayedText = useSimpleTyping(TYPING_TEXTS);
  const [headerRef, headerInView] = useInView(0.1);

  // Generate floating particles once
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${Math.random() * 6 + 5}s`,
      delay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.4 + 0.1,
    }))
  ).current;

  return (
    <>
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0px) scale(1); opacity: var(--op); }
          50% { transform: translateY(-18px) scale(1.3); opacity: calc(var(--op) * 1.5); }
          100% { transform: translateY(0px) scale(1); opacity: var(--op); }
        }
        @keyframes ripple {
          0% { width: 0; height: 0; opacity: 0.4; }
          100% { width: 400px; height: 400px; opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 10px rgba(196,242,13,0.2); }
          50% { box-shadow: 0 0 30px rgba(196,242,13,0.5), 0 0 60px rgba(196,242,13,0.2); }
        }
        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
        .slide-in-left { animation: slide-in-left 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>

      <section className="relative w-full min-h-screen bg-transparent py-24 sm:py-32 px-4 sm:px-8 xl:px-12 flex flex-col justify-center overflow-hidden" id="about">

        {/* Floating particles */}
        {particles.map(p => (
          <Particle key={p.id} style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            opacity: p.opacity,
            '--op': p.opacity,
            animation: `float-up ${p.duration} ${p.delay} ease-in-out infinite`,
          }} />
        ))}

        {/* Circuit decoration (left side) */}
        <div className="absolute left-0 top-0 h-full w-64 overflow-hidden pointer-events-none">
          <CircuitDecoration />
        </div>

        {/* Radial ambient glow */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(196,242,13,0.04) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        {/* Main layout wrapper */}
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* === Sticky Left Header === */}
          <div
            ref={headerRef}
            className="lg:col-span-5 text-left flex flex-col items-start px-4 py-6 lg:p-2 sticky top-[80px] lg:top-[120px] z-40 bg-[#020500]/90 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none rounded-2xl lg:rounded-none lg:mb-0 lg:border-none shadow-[0_4px_30px_rgba(0,0,0,0.5)] lg:shadow-none border border-[#C4F20D]/10 max-h-[calc(100vh-100px)] overflow-y-auto lg:overflow-visible self-start"
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {/* Animated left accent bar */}
            <div className="absolute -left-4 top-10 w-[2px] h-32 bg-gradient-to-b from-[#C4F20D]/80 to-transparent rounded hidden md:block glow-pulse" />

            {/* Badge with shimmer */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#C4F20D]"
                style={{
                  animation: 'border-flow 3s ease infinite',
                  backgroundSize: '200% 200%',
                }} />
              <span className="inline-block py-1 px-4 rounded-full border border-[#C4F20D]/40 text-[#C4F20D] text-xs font-bold tracking-[0.2em] uppercase bg-[#C4F20D]/10 relative overflow-hidden"
                style={{ boxShadow: '0 0 15px rgba(196,242,13,0.15)' }}>
                {/* Shimmer sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C4F20D]/20 to-transparent"
                  style={{ animation: 'border-flow 2s linear infinite', backgroundSize: '200% 100%' }} />
                About Us
              </span>
            </div>

            {/* Title with letter-by-letter fade-in */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#C4F20D] to-white font-['Astro'] mb-6 tracking-wider">
              About Weblydoor
            </h2>

            {/* Stats row */}
            <div className="w-full flex justify-between mb-6 px-2 py-4 border-y border-[#C4F20D]/10">
              <AnimatedStat value={120} label="Projects" delay={400} />
              <div className="w-px bg-[#C4F20D]/10" />
              <AnimatedStat value={50} label="Clients" delay={600} />
              <div className="w-px bg-[#C4F20D]/10" />
              <AnimatedStat value={5} label="Years" delay={800} />
            </div>

            {/* Typing text block */}
            <div className="w-full mt-2">
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-sans leading-relaxed border-l-4 border-[#C4F20D]/30 pl-4 lg:pl-6 text-left min-h-[140px] flex items-start relative">
                {/* Glowing left border dot */}
                <span className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[#C4F20D] glow-pulse" />
                <span>
                  {displayedText}
                  <span className="inline-block w-[3px] h-[1em] bg-[#C4F20D] ml-[6px] align-middle opacity-100 rounded-[2px]"
                    style={{ animation: 'blink 1s step-end infinite' }} />
                </span>
              </p>
            </div>
          </div>

          {/* === Scrolling Right: Cards === */}
          <div className="lg:col-span-7 flex flex-col gap-12 lg:gap-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 px-0 lg:px-2">
              {aboutItems.map((item, index) => (
                <AboutCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default About;