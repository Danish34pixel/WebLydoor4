import React, { useRef, useState, useEffect } from "react";

/* ─── Intersection observer hook ─── */
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

/* ─── Mouse position tracker (relative to element) ─── */
function useMousePosition(ref) {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
    const handle = (e) => {
      const r = el.getBoundingClientRect();
      setPos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    el.addEventListener('mousemove', handle);
    return () => el.removeEventListener('mousemove', handle);
  }, [ref]);
  return pos;
}

/* ─── Animated counter ─── */
function useCounter(target, inView, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return val;
}

/* ─── Floating particle ─── */
const Particle = ({ style }) => (
  <div className="absolute rounded-full bg-[#C4F20D] pointer-events-none" style={style} />
);

/* ─── Enhanced circuit SVG ─── */
const CircuitLeft = () => (
  <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-[0.12]" viewBox="0 0 420 700" fill="none" preserveAspectRatio="xMidYMid slice">
    <path d="M20 80 L120 80 L120 180 L200 180 L200 120 L300 120" stroke="#C4F20D" strokeWidth="1.2" strokeDasharray="5 5">
      <animate attributeName="stroke-dashoffset" from="0" to="-120" dur="4s" repeatCount="indefinite" />
    </path>
    <path d="M400 280 L300 280 L300 380 L200 380 L200 450 L80 450" stroke="#C4F20D" strokeWidth="1" strokeDasharray="4 6">
      <animate attributeName="stroke-dashoffset" from="0" to="120" dur="6s" repeatCount="indefinite" />
    </path>
    <path d="M30 550 L130 550 L130 620 L230 620 L230 660 L340 660" stroke="#C4F20D" strokeWidth="0.8" strokeDasharray="3 7">
      <animate attributeName="stroke-dashoffset" from="0" to="-90" dur="7s" repeatCount="indefinite" />
    </path>
    {[[200,180],[200,380],[230,620]].map(([cx,cy],i) => (
      <circle key={i} cx={cx} cy={cy} r="4" fill="none" stroke="#C4F20D" strokeWidth="1">
        <animate attributeName="r" values="2;5;2" dur={`${2+i}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2+i}s`} repeatCount="indefinite" />
      </circle>
    ))}
    {[[120,80],[300,280],[130,550]].map(([cx,cy],i) => (
      <circle key={i} cx={cx} cy={cy} r="2.5" fill="#C4F20D">
        <animate attributeName="opacity" values="1;0.2;1" dur={`${1.5+i*0.7}s`} repeatCount="indefinite" />
      </circle>
    ))}
  </svg>
);

/* ─── Radar pulse ─── */
const RadarPulse = () => (
  <div className="absolute pointer-events-none" style={{ top: '10%', right: '6%' }}>
    {[0,1,2].map(i => (
      <div key={i} className="absolute rounded-full border border-[#C4F20D]"
        style={{ width:80, height:80, top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          animation:`radarRing 3s ease-out ${i}s infinite`, opacity:0 }} />
    ))}
    <div className="w-3 h-3 rounded-full bg-[#C4F20D]/60 border border-[#C4F20D] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ boxShadow:'0 0 12px #C4F20D' }} />
  </div>
);

/* ─── Stat badge ─── */
const StatBadge = ({ value, suffix, label, delay, inView }) => {
  const count = useCounter(value, inView, 1600);
  return (
    <div className="flex flex-col items-center gap-1"
      style={{ opacity: inView?1:0, transform: inView?'translateY(0)':'translateY(20px)',
        transition:`opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
      <span className="text-3xl font-extrabold text-[#C4F20D] font-['Astro'] tracking-wider"
        style={{ textShadow:'0 0 20px rgba(196,242,13,0.4)' }}>
        {count}{suffix}
      </span>
      <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase font-sans">{label}</span>
    </div>
  );
};

/* ─── Info card with 3D tilt + animated corner + orbit ring ─── */
const InfoCard = ({ icon, label, value, delay }) => {
  const [ref, inView] = useInView(0.1);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x:0, y:0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -14;
    setTilt({ x, y });
  };

  return (
    <div
      ref={el => { ref.current = el; cardRef.current = el; }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({x:0,y:0}); }}
      className="relative flex items-center gap-4 bg-[#050702]/70 backdrop-blur-xl border rounded-2xl px-6 py-5 overflow-hidden cursor-default"
      style={{
        opacity: inView?1:0,
        transform: inView
          ? `translateY(0) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
          : 'translateY(30px)',
        transition: hovered
          ? `opacity 0.7s ease ${delay}ms, border-color 0.3s, box-shadow 0.3s`
          : `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, border-color 0.3s, box-shadow 0.3s`,
        borderColor: hovered ? 'rgba(196,242,13,0.55)' : 'rgba(196,242,13,0.2)',
        boxShadow: hovered ? '0 0 35px rgba(196,242,13,0.12)':'',
        perspective:'600px', transformStyle:'preserve-3d',
      }}
    >
      {/* Sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C4F20D]/5 to-transparent pointer-events-none"
        style={{ transform: hovered?'translateX(100%)':'translateX(-100%)', transition: hovered?'transform 0.7s ease':'none' }} />
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ backgroundImage:'linear-gradient(rgba(196,242,13,1) 1px,transparent 1px),linear-gradient(90deg,rgba(196,242,13,1) 1px,transparent 1px)',
          backgroundSize:'20px 20px', opacity: hovered?0.04:0, transition:'opacity 0.5s' }} />
      {/* Icon + orbit */}
      <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-[#C4F20D]/40"
          style={{ borderStyle:'dashed', animation: hovered?'spinSlow 3s linear infinite':'none' }} />
        <div className="w-full h-full rounded-full bg-[#C4F20D]/10 border border-[#C4F20D]/30 flex items-center justify-center"
          style={{ boxShadow: hovered?'0 0 22px rgba(196,242,13,0.4)':'0 0 10px rgba(196,242,13,0.1)',
            transition:'box-shadow 0.4s, transform 0.3s', transform: hovered?'scale(1.1)':'scale(1)' }}>
          {icon}
        </div>
        <div className="absolute inset-0 rounded-full border border-[#C4F20D]/20 animate-ping opacity-30" />
      </div>
      <div>
        <p className="text-xs text-[#C4F20D]/50 font-bold tracking-[0.15em] uppercase font-['Astro'] mb-1">{label}</p>
        <p className="text-gray-200 text-sm font-sans">{value}</p>
      </div>
      {/* Animated corner */}
      <div className="absolute top-0 right-0 rounded-tr-2xl border-t border-r border-[#C4F20D] pointer-events-none"
        style={{ width: hovered?64:0, height: hovered?64:0, opacity: hovered?0.7:0, transition:'width 0.4s,height 0.4s,opacity 0.4s' }} />
    </div>
  );
};

/* ─── Input field with animated fill indicator ─── */
const InputField = ({ label, type="text", placeholder, value, onChange, name, animDelay=0, formVisible }) => {
  const [focused, setFocused] = useState(false);
  const [hasVal, setHasVal] = useState(false);
  const handle = (e) => { onChange(e); setHasVal(!!e.target.value); };
  return (
    <div className="relative flex flex-col gap-2"
      style={{ opacity:formVisible?1:0, transform:formVisible?'translateY(0)':'translateY(20px)',
        transition:`opacity 0.6s ease ${animDelay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${animDelay}ms` }}>
      <label className="text-xs font-bold tracking-[0.18em] uppercase font-['Astro']"
        style={{ color: focused?'#C4F20D':'rgba(196,242,13,0.5)', transition:'color 0.3s' }}>{label}</label>
      <div className="relative rounded-xl overflow-hidden"
        style={{ boxShadow: focused
          ? '0 0 0 1.5px #C4F20D, 0 0 25px rgba(196,242,13,0.2)'
          : hasVal ? '0 0 0 1px rgba(196,242,13,0.4)' : '0 0 0 1px rgba(196,242,13,0.15)',
          transition:'box-shadow 0.35s' }}>
        {focused && <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4F20D]/70 to-transparent pointer-events-none z-10"
          style={{ top:0, animation:'scanDown 1.2s ease-out forwards' }} />}
        {hasVal && !focused && <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4F20D]/40 to-transparent pointer-events-none" />}
        <input type={type} name={name} placeholder={placeholder} value={value} onChange={handle}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className="w-full bg-[#050702]/80 backdrop-blur-xl text-gray-200 placeholder-gray-600 text-sm px-5 py-4 outline-none font-sans"
          style={{ caretColor:'#C4F20D' }} />
        {hasVal && (
          <div className="absolute right-4 top-1/2 pointer-events-none"
            style={{ animation:'popIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards', transform:'translateY(-50%)' }}>
            <svg className="w-4 h-4 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Textarea with live progress bar ─── */
const TextAreaField = ({ label, placeholder, value, onChange, name, animDelay=0, formVisible }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative flex flex-col gap-2"
      style={{ opacity:formVisible?1:0, transform:formVisible?'translateY(0)':'translateY(20px)',
        transition:`opacity 0.6s ease ${animDelay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${animDelay}ms` }}>
      <label className="text-xs font-bold tracking-[0.18em] uppercase font-['Astro']"
        style={{ color: focused?'#C4F20D':'rgba(196,242,13,0.5)', transition:'color 0.3s' }}>{label}</label>
      <div className="relative rounded-xl overflow-hidden"
        style={{ boxShadow: focused?'0 0 0 1.5px #C4F20D, 0 0 25px rgba(196,242,13,0.2)':'0 0 0 1px rgba(196,242,13,0.15)', transition:'box-shadow 0.35s' }}>
        {focused && <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4F20D]/70 to-transparent pointer-events-none z-10"
          style={{ top:0, animation:'scanDown 1.2s ease-out forwards' }} />}
        <textarea name={name} placeholder={placeholder} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          rows={5} className="w-full bg-[#050702]/80 backdrop-blur-xl text-gray-200 placeholder-gray-600 text-sm px-5 py-4 outline-none resize-none font-sans"
          style={{ caretColor:'#C4F20D' }} />
        {value && <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#C4F20D]/70 to-transparent rounded pointer-events-none"
          style={{ width:`${Math.min(value.length/2,100)}%`, transition:'width 0.3s' }} />}
      </div>
    </div>
  );
};

/* ─── Magnetic submit button with click ripple ─── */
const MagneticButton = ({ sending }) => {
  const btnRef = useRef(null);
  const [offset, setOffset] = useState({x:0,y:0});
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  const onMove = (e) => {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    setOffset({ x:(e.clientX-r.left-r.width/2)*0.25, y:(e.clientY-r.top-r.height/2)*0.25 });
  };

  const onClick = (e) => {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    const id = Date.now();
    setRipples(prev => [...prev, { id, x:e.clientX-r.left, y:e.clientY-r.top }]);
    setTimeout(() => setRipples(prev => prev.filter(rp => rp.id!==id)), 700);
  };

  return (
    <button ref={btnRef} type="submit" disabled={sending}
      onMouseMove={onMove} onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setOffset({x:0,y:0}); setHovered(false); }}
      onClick={onClick}
      className="relative mt-2 w-full py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-sm overflow-hidden"
      style={{
        background: sending?'rgba(196,242,13,0.12)':'#C4F20D',
        color: sending?'#C4F20D':'#020500',
        border: sending?'1px solid rgba(196,242,13,0.35)':'none',
        transform:`translate(${offset.x}px,${offset.y}px) scale(${hovered&&!sending?1.02:1})`,
        transition:'transform 0.2s ease, background 0.3s, box-shadow 0.3s',
        boxShadow: hovered&&!sending?'0 0 45px rgba(196,242,13,0.55), 0 0 90px rgba(196,242,13,0.2)':sending?'none':'0 0 22px rgba(196,242,13,0.3)',
      }}>
      {ripples.map(rp => (
        <span key={rp.id} className="absolute rounded-full bg-black/15 pointer-events-none"
          style={{ left:rp.x, top:rp.y, width:0, height:0, transform:'translate(-50%,-50%)',
            animation:'btnRipple 0.65s ease-out forwards' }} />
      ))}
      {!sending && <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
        style={{ transform:hovered?'translateX(100%)':'translateX(-100%)', transition:hovered?'transform 0.6s ease':'none' }} />}
      {sending ? (
        <span className="flex items-center justify-center gap-3">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
            style={{ animation:'spinSlow 0.8s linear infinite' }}>
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
          </svg>
          Sending...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2 font-['Astro']">
          Send Message
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            style={{ transform:hovered?'translateX(4px)':'translateX(0)', transition:'transform 0.2s' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      )}
    </button>
  );
};

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
const Contact = () => {
  const sectionRef = useRef(null);
  const mousePos = useMousePosition(sectionRef);
  const [formRef, formInView] = useInView(0.05);
  const [headerRef, headerInView] = useInView(0.1);
  const [statsRef, statsInView] = useInView(0.2);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setSending(true); setTimeout(() => { setSending(false); setSubmitted(true); }, 1800); };

  const particles = useRef(
    Array.from({ length: 22 }, (_, i) => ({
      id: i, size: Math.random()*4+1,
      left: `${Math.random()*100}%`, top: `${Math.random()*100}%`,
      duration: `${Math.random()*7+5}s`, delay: `${Math.random()*6}s`,
      opacity: Math.random()*0.35+0.08,
    }))
  ).current;

  return (
    <>
      <style>{`
        @keyframes float-up {
          0%,100% { transform:translateY(0) scale(1); opacity:var(--op); }
          50%      { transform:translateY(-20px) scale(1.4); opacity:calc(var(--op)*1.6); }
        }
        @keyframes shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glow-pulse {
          0%,100% { box-shadow:0 0 10px rgba(196,242,13,0.2); }
          50%      { box-shadow:0 0 30px rgba(196,242,13,0.55),0 0 60px rgba(196,242,13,0.2); }
        }
        @keyframes scanDown {
          0%   { top:0%;   opacity:1; }
          100% { top:100%; opacity:0; }
        }
        @keyframes spinSlow {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes radarRing {
          0%   { transform:translate(-50%,-50%) scale(0.3); opacity:0.8; }
          100% { transform:translate(-50%,-50%) scale(3);   opacity:0; }
        }
        @keyframes successPop {
          0%   { transform:scale(0.6); opacity:0; }
          65%  { transform:scale(1.08); }
          100% { transform:scale(1);   opacity:1; }
        }
        @keyframes checkDraw {
          from { stroke-dashoffset:30; }
          to   { stroke-dashoffset:0; }
        }
        @keyframes popIn {
          0%   { transform:translateY(-50%) scale(0); }
          70%  { transform:translateY(-50%) scale(1.2); }
          100% { transform:translateY(-50%) scale(1); }
        }
        @keyframes btnRipple {
          0%   { width:0;     height:0;     opacity:0.35; }
          100% { width:400px; height:400px; opacity:0; }
        }
        @keyframes titleGlitch {
          0%,94%,100% { text-shadow:0 0 20px rgba(196,242,13,0.4); transform:none; }
          95%  { transform:translateX(-3px); text-shadow: 3px 0 #C4F20D,-3px 0 rgba(196,242,13,0.3); }
          96%  { transform:translateX(3px);  text-shadow:-3px 0 #C4F20D, 3px 0 rgba(196,242,13,0.3); }
          97%  { transform:translateX(0); }
        }
        @keyframes orbitDot {
          from { transform:rotate(0deg) translateX(38px) rotate(0deg); }
          to   { transform:rotate(360deg) translateX(38px) rotate(-360deg); }
        }
        @keyframes borderShimmer {
          0%   { background-position:0% 50%; }
          100% { background-position:200% 50%; }
        }
        .glow-pulse   { animation:glow-pulse 3s ease-in-out infinite; }
        .success-pop  { animation:successPop 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .title-glitch { animation:titleGlitch 7s ease-in-out infinite; }
      `}</style>

      <section ref={sectionRef}
        className="relative w-full bg-transparent py-24 sm:py-32 px-4 sm:px-8 xl:px-12 overflow-visible"
        id="contact">

        {/* Mouse-tracked spotlight */}
        <div className="absolute pointer-events-none rounded-full"
          style={{ width:600, height:600,
            left:`calc(${mousePos.x*100}% - 300px)`, top:`calc(${mousePos.y*100}% - 300px)`,
            background:'radial-gradient(circle, rgba(196,242,13,0.06) 0%, transparent 65%)',
            filter:'blur(30px)', transition:'left 0.4s ease, top 0.4s ease' }} />

        {/* Particles */}
        {particles.map(p => (
          <Particle key={p.id} style={{ width:p.size, height:p.size, left:p.left, top:p.top,
            opacity:p.opacity, '--op':p.opacity, animation:`float-up ${p.duration} ${p.delay} ease-in-out infinite` }} />
        ))}

        {/* Circuit */}
        <div className="absolute left-0 top-0 h-full w-72 overflow-hidden pointer-events-none"><CircuitLeft /></div>

        {/* Radar */}
        <RadarPulse />

        {/* Static ambient */}
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle, rgba(196,242,13,0.035) 0%, transparent 70%)', filter:'blur(70px)' }} />

        <div className="max-w-7xl mx-auto w-full relative z-10">

          {/* HEADER */}
          <div ref={headerRef} className="text-center mb-14 sm:mb-20"
            style={{ opacity:headerInView?1:0, transform:headerInView?'translateY(0)':'translateY(36px)',
              transition:'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)' }}>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#C4F20D]" />
              <span className="inline-block py-1 px-4 rounded-full border border-[#C4F20D]/40 text-[#C4F20D] text-xs font-bold tracking-[0.2em] uppercase bg-[#C4F20D]/10 relative overflow-hidden"
                style={{ boxShadow:'0 0 15px rgba(196,242,13,0.15)' }}>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C4F20D]/20 to-transparent"
                  style={{ animation:'shimmer 2.5s linear infinite', backgroundSize:'200% 100%' }} />
                Contact Us
              </span>
              <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#C4F20D]" />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#C4F20D] to-white font-['Astro'] tracking-wider mb-5 title-glitch">
              Get In Touch
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
              We would love to hear from you. Whether you have a question, need a consultation, or want to start a new project — our team is here to help.
            </p>

            {/* Stats */}
            <div ref={statsRef} className="flex items-center justify-center gap-10 sm:gap-16 mt-10">
              <StatBadge value={50}  suffix="+"  label="Projects Done" delay={0}   inView={statsInView} />
              <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-[#C4F20D]/30 to-transparent" />
              <StatBadge value={30}  suffix="+"  label="Happy Clients"  delay={150} inView={statsInView} />
              <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-[#C4F20D]/30 to-transparent" />
              <StatBadge value={24}  suffix="/7" label="Support"        delay={300} inView={statsInView} />
            </div>
          </div>

          {/* TWO COLUMNS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* LEFT */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div style={{ opacity:headerInView?1:0, transform:headerInView?'translateX(0)':'translateX(-24px)',
                transition:'opacity 0.8s ease 250ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 250ms' }}>
                <p className="text-gray-400 font-sans leading-relaxed text-[0.95rem] border-l-4 border-[#C4F20D]/30 pl-5">
                  If you are interested in working with Weblydoor or want to learn more about our services, feel free to reach out through the details below.
                </p>
              </div>

              <div className="flex flex-col gap-4 mt-2">
                <InfoCard delay={0} label="Email" value="info@weblydoor.com"
                  icon={<svg className="w-5 h-5 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                />
                <InfoCard delay={100} label="Phone" value="+91 XXXXX XXXXX"
                  icon={<svg className="w-5 h-5 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                />
              </div>

              {/* CTA card — shimmer animated border */}
              <div className="relative rounded-2xl p-[1px] overflow-hidden mt-2"
                style={{ background:'linear-gradient(90deg, rgba(196,242,13,0.6) 0%, rgba(196,242,13,0.1) 50%, rgba(196,242,13,0.6) 100%)',
                  backgroundSize:'200% 100%', animation:'borderShimmer 3s linear infinite' }}>
                <div className="relative rounded-2xl overflow-hidden bg-[#050702]/85 backdrop-blur-xl p-7">
                  {/* Orbiting dot */}
                  <div className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none z-0">
                    <div className="w-2 h-2 rounded-full bg-[#C4F20D]"
                      style={{ animation:'orbitDot 6s linear infinite', opacity:0.35, boxShadow:'0 0 8px #C4F20D' }} />
                  </div>
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage:'linear-gradient(rgba(196,242,13,1) 1px,transparent 1px),linear-gradient(90deg,rgba(196,242,13,1) 1px,transparent 1px)', backgroundSize:'24px 24px' }} />
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#C4F20D] font-['Astro'] tracking-wider mb-3 relative z-10">
                    Let's Build Something Great
                  </h3>
                  <p className="text-gray-400 text-sm font-sans leading-relaxed relative z-10">
                    Your digital success starts with the right partner. Contact Weblydoor today and take the first step toward your digital future.
                  </p>
                  <div className="mt-5 h-[2px] w-full bg-gradient-to-r from-[#C4F20D]/60 via-[#C4F20D]/20 to-transparent rounded-full relative z-10" />
                </div>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div ref={formRef}
              className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-[#050702]/70 backdrop-blur-xl border border-[#C4F20D]/20 p-7 sm:p-10"
              style={{ opacity:formInView?1:0, transform:formInView?'translateY(0)':'translateY(44px)',
                transition:'opacity 0.8s ease 150ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 150ms',
                boxShadow:'0 8px 60px rgba(0,0,0,0.55)' }}>

              <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{ backgroundImage:'linear-gradient(rgba(196,242,13,1) 1px,transparent 1px),linear-gradient(90deg,rgba(196,242,13,1) 1px,transparent 1px)', backgroundSize:'24px 24px' }} />

              {/* Animated corner brackets */}
              {[
                'top-0 right-0 border-t border-r rounded-tr-2xl',
                'bottom-0 left-0 border-b border-l rounded-bl-2xl',
              ].map((cls,i) => (
                <div key={i} className={`absolute ${cls} border-[#C4F20D] pointer-events-none`}
                  style={{ width:formInView?(i===0?72:52):0, height:formInView?(i===0?72:52):0,
                    opacity:formInView?(i===0?0.45:0.3):0,
                    transition:`width 1s ease ${300+i*150}ms,height 1s ease ${300+i*150}ms,opacity 0.6s ease ${300+i*150}ms` }} />
              ))}

              <div className="absolute bottom-4 right-6 text-8xl font-extrabold font-['Astro'] select-none pointer-events-none"
                style={{ color:'rgba(196,242,13,0.03)' }}>WD</div>

              {!submitted ? (
                <>
                  <div className="mb-7 relative z-10"
                    style={{ opacity:formInView?1:0, transform:formInView?'translateY(0)':'translateY(16px)',
                      transition:'opacity 0.6s ease 200ms, transform 0.6s ease 200ms' }}>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Astro'] tracking-wider mb-2">
                      Send Us a Message
                    </h3>
                    <p className="text-gray-500 text-sm font-sans">
                      Have a project in mind? Our team will get back to you as soon as possible.
                    </p>
                    {/* Animated underline reveal */}
                    <div className="mt-3 h-[1px] bg-gradient-to-r from-[#C4F20D]/50 to-transparent rounded"
                      style={{ width:formInView?'100%':'0%', transition:'width 1.2s ease 500ms' }} />
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField label="Full Name"     name="name"  placeholder="John Doe"         value={form.name}    onChange={handleChange} animDelay={350} formVisible={formInView} />
                      <InputField label="Email Address" name="email" type="email" placeholder="john@email.com" value={form.email} onChange={handleChange} animDelay={450} formVisible={formInView} />
                    </div>
                    <InputField label="Phone Number" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} animDelay={550} formVisible={formInView} />
                    <TextAreaField label="Your Message" name="message" placeholder="Tell us about your project..." value={form.message} onChange={handleChange} animDelay={650} formVisible={formInView} />
                    <div style={{ opacity:formInView?1:0, transform:formInView?'translateY(0)':'translateY(16px)',
                      transition:'opacity 0.6s ease 750ms, transform 0.6s ease 750ms' }}>
                      <MagneticButton sending={sending} />
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-14 gap-7 relative z-10 success-pop">
                  {/* Concentric rings */}
                  <div className="relative flex items-center justify-center">
                    {[0,1,2].map(i => (
                      <div key={i} className="absolute rounded-full border border-[#C4F20D]"
                        style={{ width:80+i*36, height:80+i*36, opacity:0.15-i*0.04,
                          animation:`glow-pulse ${2+i*0.5}s ease-in-out ${i*0.3}s infinite` }} />
                    ))}
                    <div className="w-20 h-20 rounded-full bg-[#C4F20D]/10 border border-[#C4F20D]/60 flex items-center justify-center glow-pulse relative z-10">
                      <svg className="w-9 h-9 text-[#C4F20D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        strokeDasharray="30" strokeDashoffset="30"
                        style={{ animation:'checkDraw 0.6s ease 0.3s forwards' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-extrabold text-[#C4F20D] font-['Astro'] tracking-wider mb-3">Message Sent!</h3>
                    <p className="text-gray-400 text-sm font-sans max-w-xs mx-auto leading-relaxed">
                      Thank you for reaching out. Our team will get back to you as soon as possible.
                    </p>
                  </div>
                  <button onClick={() => { setSubmitted(false); setForm({name:'',email:'',phone:'',message:''}); }}
                    className="text-xs text-[#C4F20D]/60 hover:text-[#C4F20D] underline underline-offset-4 tracking-widest uppercase font-bold transition-colors font-['Astro']">
                    Send Another
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;