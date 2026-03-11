import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const TYPING_TEXTS = [
  "Website Development: WeblyDoor creates modern, responsive, and user-friendly websites tailored to meet the unique needs of each business.",
  "UI/UX Design: We design visually appealing and intuitive interfaces that enhance user experience and keep visitors engaged.",
  "Search Engine Optimization (SEO): Our SEO strategies help businesses improve their search engine rankings and increase organic traffic.",
  "E-commerce Solutions: We build secure and scalable online stores that make it easy for businesses to sell products and services online.",
  "Digital Marketing Services: WeblyDoor helps businesses grow their brand through effective digital marketing strategies and targeted campaigns.",
  "Website Maintenance and Support: We provide continuous support, updates, and maintenance to ensure websites run smoothly and securely.",
  "Performance Optimization: Our team optimizes website speed and performance to deliver a seamless browsing experience.",
  "Brand Identity Development: We help businesses create strong digital identities through logo design, branding, and consistent visual communication.",
  "Mobile-Responsive Development: All our websites are optimized to work perfectly on mobile phones, tablets, and desktops.",
  "Client-Focused Solutions: WeblyDoor focuses on understanding client goals and delivering digital solutions that drive real business growth."
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

// Hook for scroll-triggered entry animation
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


// Animated SVG circuit lines for right side
const CircuitRight = () => (
  <svg className="absolute right-0 top-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 400 600" fill="none" preserveAspectRatio="xMidYMid slice">
    <path d="M380 80 L300 80 L300 180 L220 180 L220 120 L140 120" stroke="#C4F20D" strokeWidth="1" strokeDasharray="4 4">
      <animate attributeName="stroke-dashoffset" from="0" to="100" dur="4s" repeatCount="indefinite" />
    </path>
    <path d="M20 250 L100 250 L100 350 L180 350 L180 420 L260 420" stroke="#C4F20D" strokeWidth="1" strokeDasharray="4 4">
      <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="5.5s" repeatCount="indefinite" />
    </path>
    <path d="M360 470 L280 470 L280 530 L180 530 L180 560 L80 560" stroke="#C4F20D" strokeWidth="1" strokeDasharray="3 6">
      <animate attributeName="stroke-dashoffset" from="0" to="80" dur="6s" repeatCount="indefinite" />
    </path>
    <circle cx="300" cy="180" r="3" fill="#C4F20D">
      <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="180" cy="350" r="3" fill="#C4F20D">
      <animate attributeName="opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="180" cy="530" r="3" fill="#C4F20D">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const services = [
  {
    title: 'Website Development',
    description: 'We create modern, responsive, and user-friendly websites that represent your brand and help convert visitors into customers. Our websites are built to perform smoothly across all devices.',
    icon: (
      <svg className="w-8 h-8 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'App Development',
    description: 'Custom mobile applications for iOS and Android tailored to your business needs. We focus on performance, user experience, and scalable architecture.',
    icon: (
      <svg className="w-8 h-8 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Digital Marketing',
    description: 'Our digital marketing solutions help businesses promote their products and services online. We focus on strategies that increase brand awareness and generate real results.',
    icon: (
      <svg className="w-8 h-8 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    title: 'Graphic and Logo',
    description: 'Professional visual identities that command attention. We design logos, brand assets, and digital graphics that elevate your professional standing.',
    icon: (
      <svg className="w-8 h-8 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'SEO',
    description: 'Our SEO services help your website rank higher in search engines. We use effective strategies to improve visibility and increase organic traffic dramatically.',
    icon: (
      <svg className="w-8 h-8 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 13a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
    ),
  },
  {
    title: 'Website Maintenance',
    description: 'Keeping a website updated and secure is important. Our maintenance services ensure your website runs smoothly, stays updated, and performs at its best.',
    icon: (
      <svg className="w-8 h-8 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  }
];

const ServiceCard = ({ service, index }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [inViewRef, inView] = useInView(0.1);

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

  const delay = index * 110;

  const handleClick = () => {
    const routeMap = {
      'Website Development': '/website-development',
      'App Development': '/app-development',
      'Digital Marketing': '/digital-marketing',
      'Graphic and Logo': '/graphic-logo',
      'SEO': '/seo',
      'Website Maintenance': '/maintenance'
    };
    const targetRoute = routeMap[service.title];
    if (!targetRoute) return;

    // Smoothly reset tilt and trigger click animation
    const tl = gsap.timeline({
      onComplete: () => navigate(targetRoute)
    });

    // Reset tilt instantly or very quickly
    setRotateX(0);
    setRotateY(0);

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

    // Add a quick flash to the card body
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
      ref={el => { cardRef.current = el; inViewRef.current = el; }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={handleClick}
      className="group relative w-full h-full cursor-pointer transition-none"
      style={{
        perspective: '1000px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(44px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div
        className="w-full h-full relative cursor-default"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.4s ease-out',
        }}
      >
        {/* Glow orb behind card */}
        <div
          className="absolute inset-0 rounded-2xl -z-10 blur-2xl"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(196,242,13,0.2) 0%, transparent 70%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.6s ease',
            transform: 'translateZ(-20px) scale(1.1)',
          }}
        />

        {/* Card Body */}
        <div
          className="card-body-inner w-full h-full bg-[#050702]/80 backdrop-blur-xl border border-[#C4F20D]/20 group-hover:border-[#C4F20D]/70 rounded-2xl p-6 sm:p-8 flex flex-col items-start gap-5 overflow-hidden relative shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          style={{ transition: 'border-color 0.4s, box-shadow 0.4s', boxShadow: isHovered ? '0 8px 40px rgba(196,242,13,0.1)' : '' }}
        >
          {/* Scan line sweep on hover */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
            style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
          >
            <div
              className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#C4F20D]/40 to-transparent"
              style={{
                top: isHovered ? '105%' : '-5%',
                transition: isHovered ? 'top 1.3s cubic-bezier(0.4,0,0.2,1)' : 'none',
              }}
            />
          </div>

          {/* Tech grid overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none rounded-2xl"
            style={{
              backgroundImage: 'linear-gradient(rgba(196,242,13,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,242,13,1) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Ripple burst on enter */}
          {isHovered && (
            <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                width: 0, height: 0,
                borderRadius: '50%',
                background: 'rgba(196,242,13,0.06)',
                transform: 'translate(-50%,-50%)',
                animation: 'ripple 0.65s ease-out forwards',
              }} />
            </div>
          )}

          {/* Icon */}
          <div
            className="w-16 h-16 rounded-full bg-[#C4F20D]/10 flex items-center justify-center border border-[#C4F20D]/30 relative shrink-0"
            style={{
              transform: 'translateZ(30px)',
              boxShadow: isHovered ? '0 0 25px rgba(196,242,13,0.4)' : '0 0 15px rgba(196,242,13,0.15)',
              transition: 'box-shadow 0.4s',
            }}
          >
            <div
              className="absolute inset-0 rounded-full border border-[#C4F20D]/40"
              style={{
                animation: isHovered ? 'spin 3s linear infinite' : 'none',
                borderStyle: 'dashed',
              }}
            />
            <div className="absolute inset-0 rounded-full border border-[#C4F20D]/30 animate-ping opacity-20" />
            <div style={{
              transform: isHovered ? 'scale(1.2) translateZ(5px)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}>
              {service.icon}
            </div>
          </div>

          {/* Title */}
          <div style={{ transform: 'translateZ(40px)' }} className="z-10 bg-[#050702]/50 px-2 py-1 rounded inline-block -ml-2">
            <h3
              className="text-xl sm:text-2xl font-bold text-[#C4F20D] font-['Astro'] tracking-wider leading-tight"
              style={{ textShadow: isHovered ? '0 0 20px rgba(196,242,13,0.5)' : 'none', transition: 'text-shadow 0.4s' }}
            >
              {service.title}
            </h3>
          </div>

          {/* Description */}
          <div style={{ transform: 'translateZ(20px)' }}>
            <p className="text-[0.95rem] text-gray-300/90 leading-relaxed font-sans mt-2">
              {service.description}
            </p>
          </div>

          {/* Corner accents */}
          <div
            className="absolute top-0 right-0 w-24 h-24 border-t border-r border-[#C4F20D] opacity-0 group-hover:opacity-100 rounded-tr-2xl -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none"
            style={{ transition: 'opacity 0.5s, transform 0.5s' }}
          />
          <div
            className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#C4F20D] opacity-0 group-hover:opacity-50 rounded-bl-2xl translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none"
            style={{ transition: 'opacity 0.5s, transform 0.5s' }}
          />

          {/* Watermark index */}
          <div
            className="absolute bottom-4 right-5 text-6xl font-extrabold font-['Astro'] select-none pointer-events-none"
            style={{ color: isHovered ? 'rgba(196,242,13,0.08)' : 'rgba(196,242,13,0.04)', transition: 'color 0.4s' }}
          >
            0{index + 1}
          </div>
        </div>
      </div>
    </div>
  );
};

const Service = () => {
  const displayedText = useSimpleTyping(TYPING_TEXTS);
  const [headerRef, headerInView] = useInView(0.1);


  return (
    <>
      <style>{`
        @keyframes float-up {
          0%   { transform: translateY(0px) scale(1);   opacity: var(--op); }
          50%  { transform: translateY(-18px) scale(1.3); opacity: calc(var(--op) * 1.5); }
          100% { transform: translateY(0px) scale(1);   opacity: var(--op); }
        }
        @keyframes ripple {
          0%   { width: 0; height: 0; opacity: 0.4; }
          100% { width: 420px; height: 420px; opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 10px rgba(196,242,13,0.2); }
          50%       { box-shadow: 0 0 30px rgba(196,242,13,0.5), 0 0 60px rgba(196,242,13,0.2); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }

        /* ── Sticky layout ── */
        /* The outer wrapper must NOT be overflow:hidden or it will kill sticky */
        #services-inner {
          display: grid;
          grid-template-columns: 1fr; /* mobile: single column */
          align-items: start;
        }
        @media (min-width: 1024px) {
          #services-inner {
            grid-template-columns: 5fr 7fr;
            gap: 2rem;
          }
        }

        /* Left sticky panel */
        #services-sticky-left {
          position: sticky;
          /* 32px gap from top of viewport while scrolling */
          top: 90px;
          /* Must NOT set max-height that cuts it short — let it be as tall as its content */
          align-self: start;
          z-index: 20;
        }
      `}</style>

      <section
        className="relative w-full bg-transparent py-24 sm:py-32 px-4 sm:px-8 xl:px-12 overflow-x-hidden"
        id="services"
      >

        {/* Circuit decoration right side */}
        <div className="absolute right-0 top-0 h-full w-64 overflow-hidden pointer-events-none">
          <CircuitRight />
        </div>


        {/* Main layout wrapper — NO overflow:hidden, use overflow:visible */}
        <div id="services-inner" className="max-w-7xl mx-auto w-full relative z-10">

          {/* ═══ STICKY LEFT PANEL ═══ */}
          <div
            id="services-sticky-left"
            ref={headerRef}
            className="text-left flex flex-col items-start px-4 py-6 lg:p-2 lg:bg-transparent lg:backdrop-blur-none lg:rounded-none lg:border-none lg:shadow-none"
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {/* Animated left accent bar */}
            <div
              className="absolute -left-4 top-10 w-[2px] h-32 bg-gradient-to-b from-[#C4F20D]/80 to-transparent rounded hidden md:block glow-pulse"
            />

            {/* Badge with shimmer */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#C4F20D]" />
              <span
                className="inline-block py-1 px-4 rounded-full border border-[#C4F20D]/40 text-[#C4F20D] text-xs font-bold tracking-[0.2em] uppercase bg-[#C4F20D]/10 relative overflow-hidden"
                style={{ boxShadow: '0 0 15px rgba(196,242,13,0.15)' }}
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C4F20D]/20 to-transparent"
                  style={{ animation: 'shimmer 2.5s linear infinite', backgroundSize: '200% 100%' }}
                />
                Our Digital Services
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#C4F20D] to-white font-['Astro'] mb-6 tracking-wider">
              Weblydoor
            </h2>

            {/* Typing text block */}
            <div className="w-full mt-2 relative">
              {/* Glowing dot on left border */}
              <span className="absolute -left-[3px] top-0 w-2 h-2 rounded-full bg-[#C4F20D] glow-pulse" />
              <p className="max-w-3xl lg:max-w-none text-base sm:text-lg lg:text-xl text-gray-400 font-sans leading-relaxed border-l-4 border-[#C4F20D]/30 pl-6 min-h-[140px] flex items-start text-left">
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

          {/* ═══ CARDS GRID ═══ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-12 lg:mt-0">
            {services.map((service, index) => (
              <div
                key={index}
                className={
                  index === 3 ? "lg:col-span-1 lg:col-start-1" :
                    index === 4 ? "sm:col-span-2" : ""
                }
              >
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Service;