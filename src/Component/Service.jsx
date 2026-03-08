import React, { useRef, useState, useEffect } from 'react';

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

function useSimpleTyping(texts, typingSpeed = 50, deletingSpeed = 50, pause = 1000) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState('typing'); // typing | pausing | deleting
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

const services = [
  {
    title: 'Website Development',
    description: 'We create modern, responsive, and user-friendly websites that represent your brand and help convert visitors into customers. Our websites are built to perform smoothly across all devices.',
    icon: (
      <svg className="w-8 h-8 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Search Engine Optimization',
    description: 'Our SEO services help your website rank higher in search engines. We use effective strategies to improve visibility, increase organic traffic, and bring more potential customers to your business.',
    icon: (
      <svg className="w-8 h-8 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 13a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
    ),
  },
  {
    title: 'Digital Marketing',
    description: 'Our digital marketing solutions help businesses promote their products and services online. We focus on strategies that increase brand awareness and generate real results.',
    icon: (
      <svg className="w-8 h-8 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    title: 'Branding & Design',
    description: 'A strong brand identity helps businesses stand out. We design professional logos, graphics, and brand visuals that create a lasting impression on your audience.',
    icon: (
      <svg className="w-8 h-8 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Website Maintenance',
    description: 'Keeping a website updated and secure is important. Our maintenance services ensure your website runs smoothly, stays updated, and performs at its best.',
    icon: (
      <svg className="w-8 h-8 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  }
];

const ServiceCard = ({ service }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    // Get mouse position relative to the card's bounds
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Find the center point
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-10 to 10 degrees)
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };
  
  const handleMouseLeave = () => {
    // Reset back to absolute zero directly when user leaves
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full h-full"
      style={{ perspective: '1000px' }}
    >
      <div 
        className="w-full h-full relative cursor-default"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Neon Glow backdrop behind the card */}
        <div className="absolute inset-0 bg-[#C4F20D] opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-2xl rounded-2xl -z-10" 
             style={{ transform: 'translateZ(-10px)' }}/>
        
        {/* Actual Card Body */}
        <div className="w-full h-full bg-[#050702]/80 backdrop-blur-xl border border-[#C4F20D]/20 group-hover:border-[#C4F20D]/80 rounded-2xl p-6 sm:p-8 flex flex-col items-start gap-5 transition-colors duration-500 overflow-hidden relative shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          {/* Subtle tech grid over the card on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(196,242,13,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,242,13,1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />
          
          {/* Icon Wrap */}
          <div 
            className="w-16 h-16 rounded-full bg-[#C4F20D]/10 flex items-center justify-center border border-[#C4F20D]/30 shadow-[0_0_15px_rgba(196,242,13,0.15)] group-hover:shadow-[0_0_25px_rgba(196,242,13,0.4)] transition-shadow duration-500 relative"
            style={{ transform: 'translateZ(30px)' }}
          >
             <div className="absolute inset-0 rounded-full border border-[#C4F20D]/50 animate-ping opacity-20" />
             {service.icon}
          </div>

          <div style={{ transform: 'translateZ(40px)' }} className="z-10 bg-[#050702]/50 px-2 py-1 rounded inline-block -ml-2">
            <h3 className="text-xl sm:text-2xl font-bold text-[#C4F20D] font-['Astro'] tracking-wider leading-tight">
              {service.title}
            </h3>
          </div>
          
          <div style={{ transform: 'translateZ(20px)' }}>
            <p className="text-[0.95rem] text-gray-300/90 leading-relaxed font-sans mt-2">
              {service.description}
            </p>
          </div>
          
          {/* Decorative Corner neon accents */}
          <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-[#C4F20D] opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-tr-2xl -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 shadow-[inset_0_0_20px_rgba(196,242,13,0.3)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#C4F20D] opacity-0 group-hover:opacity-50 transition-all duration-700 rounded-bl-2xl translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

const Service = () => {
  const displayedText = useSimpleTyping(TYPING_TEXTS);

  return (
    <section className="relative w-full min-h-screen bg-transparent py-24 sm:py-32 px-4 sm:px-8 xl:px-12 flex flex-col justify-center" id="services">
      {/* Container wrapper */}
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
        {/* Section Header (Sticky) */}
        <div className="lg:col-span-5 text-left flex flex-col items-start px-4 py-6 lg:p-2 sticky top-[80px] lg:top-[120px] z-30 bg-[#020500]/80 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none rounded-2xl lg:rounded-none lg:mb-0 lg:border-none shadow-[0_4px_30px_rgba(0,0,0,0.5)] lg:shadow-none border border-[#C4F20D]/10">
          <div className="flex items-center gap-3 mb-6">
             <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#C4F20D]" />
             <span className="inline-block py-1 px-4 rounded-full border border-[#C4F20D]/40 text-[#C4F20D] text-xs sm:text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_10px_rgba(196,242,13,0.15)]">
               Our Digital Services
             </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#C4F20D] to-white font-['Astro'] mb-6 tracking-wider">
            Weblydoor
          </h2>
          <p className="max-w-3xl lg:max-w-none text-base sm:text-lg lg:text-xl text-gray-400 font-sans leading-relaxed border-l-4 border-[#C4F20D]/30 pl-6 min-h-[140px] flex items-start text-left">
            <span>
              {displayedText}
              <span className="inline-block w-[3px] h-[1em] bg-[#C4F20D] ml-[6px] align-middle opacity-100 animate-[blink_1s_step-end_infinite] rounded-[2px]" />
            </span>
          </p>
        </div>

        {/* 3D Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              /* Make the last few cards span appropriately so there are no empty gaps in standard 3-col grid */
              className={
                index === 3 ? "lg:col-span-1 lg:col-start-1" : 
                index === 4 ? "lg:col-span-2" : 
                ""
              }
            > 
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;