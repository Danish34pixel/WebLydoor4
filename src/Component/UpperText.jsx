import React, { useEffect, useRef, useState, useCallback } from 'react';

// ─── Inline styles (replaces UpperText.css + Tailwind) ───────────────────────
const styles = {
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '90vh',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Syne', sans-serif",
    overflow: 'hidden',
    padding: '0 16px',
    paddingBottom: '22vh', /* Shifting the visual center upward */
  },
  // Subtle grid overlay
  gridOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(196,242,13,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(196,242,13,0.04) 1px, transparent 1px)',
    backgroundSize: '60px 60px',
    pointerEvents: 'none',
    zIndex: 0,
  },
  // Glow blob behind content
  glowBlob: {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60vw',
    height: '40vh',
    background: 'radial-gradient(ellipse, rgba(196,242,13,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  badgeWrap: {
    position: 'relative',
    zIndex: 2,
    marginTop: '8%',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    border: '1px solid rgba(196,242,13,0.35)',
    borderRadius: '999px',
    padding: '4px 14px',
    fontSize: '11px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#C4F20D',
    background: 'rgba(196,242,13,0.07)',
    backdropFilter: 'blur(8px)',
  },
  dot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#C4F20D',
    animation: 'pulse 2s infinite',
    flexShrink: 0,
  },
  typelineWrap: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    padding: '0 16px',
  },
  typeline: {
    display: 'inline-block',
    color: '#C4F20D',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(1.2rem, 4.5vw, 3.5rem)',
    lineHeight: 1.15,
    letterSpacing: '-0.01em',
    whiteSpace: 'nowrap',
    textShadow: '0 0 40px rgba(196,242,13,0.4)',
  },
  cursor: {
    display: 'inline-block',
    width: '3px',
    height: '1em',
    background: '#C4F20D',
    marginLeft: '4px',
    verticalAlign: 'middle',
    animation: 'blink 1s step-end infinite',
    borderRadius: '2px',
  },
  divider: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    maxWidth: '600px',
    margin: '18px auto 0',
    padding: '0 24px',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(196,242,13,0.4), transparent)',
  },
  dividerDiamond: {
    width: '8px',
    height: '8px',
    background: '#C4F20D',
    transform: 'rotate(45deg)',
    flexShrink: 0,
  },
  bodyWrap: {
    position: 'relative',
    zIndex: 2,
    marginTop: '22px',
    width: '100%',
    maxWidth: '760px',
    display: 'grid',
    placeItems: 'center',
    padding: '0 16px',
    textAlign: 'center',
  },
  bodyText: {
    gridArea: '1 / 1',
    color: '#C4F20D',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: 'clamp(0.85rem, 3.5vw, 1.15rem)',
    lineHeight: 1.75,
    letterSpacing: '0.01em',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
    padding: '0 8px',
  },
  // Progress indicators
  progressWrap: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    gap: '8px',
    marginTop: '30px',
    alignItems: 'center',
  },
  progressDot: (active) => ({
    width: active ? '28px' : '8px',
    height: '8px',
    borderRadius: '4px',
    background: active ? '#C4F20D' : 'rgba(196,242,13,0.25)',
    transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
    boxShadow: active ? '0 0 12px rgba(196,242,13,0.6)' : 'none',
  }),
};

// ─── Tiny inline TextType (so component is self-contained) ───────────────────
const TEXTS = [
  "Welcome to Weblydoor!",
  "The Door to Digital Success!",
  "What We Do!",
  "Why Choose Weblydoor!",
  "Let's Grow Together!",
];

const BODY_TEXTS = [
  "At Weblydoor, we help businesses grow in the digital world with smart and effective online solutions. Our goal is simple — to open the door to new digital opportunities for every business.",
  "In today's competitive market, having a strong online presence is critical. We combine creativity, strategy, and technology to deliver solutions that truly make an impact.",
  "From website development to digital marketing and branding, we provide everything needed to build and grow your digital identity — all under one roof.",
  "We believe every business deserves the right digital strategy. Our team focuses on quality, creativity, and results — working closely with you to achieve real success.",
  "At Weblydoor, we don't just provide services — we build long-term partnerships. Let us help you take the next step in your digital journey.",
];

function useTypingCycle(texts, typingSpeed = 70, deletingSpeed = 45, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState('typing'); // typing | pausing | deleting
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const onIndexChange = useRef(null);

  const registerCallback = useCallback((cb) => { onIndexChange.current = cb; }, []);

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
        if (onIndexChange.current) onIndexChange.current(next);
      }
    }
    return () => clearTimeout(timeout);
  }, [phase, charIdx, textIdx, texts, typingSpeed, deletingSpeed, pause]);

  return { displayed, textIdx, registerCallback };
}

// ─── Main Component ───────────────────────────────────────────────────────────
const UpperText = ({ onIndexChange: externalCb } = {}) => {
  const { displayed, textIdx, registerCallback } = useTypingCycle(TEXTS);

  useEffect(() => {
    registerCallback(externalCb || (() => {}));
  }, [registerCallback, externalCb]);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(196,242,13,0.5); }
          50%      { box-shadow: 0 0 0 6px rgba(196,242,13,0); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform: translateY(18px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes fadeDown {
          from { opacity:1; transform: translateY(0); }
          to   { opacity:0; transform: translateY(-12px); }
        }
        .body-enter  { animation: fadeUp   0.55s cubic-bezier(0.22,1,0.36,1) forwards; }
        .body-exit   { animation: fadeDown 0.35s ease-in forwards; }
      `}</style>

      <div style={styles.root}>
        {/* Background layers */}
        <div style={styles.gridOverlay} />
        <div style={styles.glowBlob} />

        {/* Live badge */}
        <div style={styles.badgeWrap}>
          <span style={styles.badge}>
            <span style={styles.dot} />
            Digital Growth Partner
          </span>
        </div>

        {/* Typing headline */}
        <div style={styles.typelineWrap}>
          <span style={styles.typeline}>
            {displayed}
            <span style={styles.cursor} />
          </span>
        </div>

        {/* Ornamental divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <div style={styles.dividerDiamond} />
          <div style={styles.dividerLine} />
        </div>

        {/* Body text */}
        <div style={styles.bodyWrap}>
          {BODY_TEXTS.map((text, i) => (
            <p
              key={i}
              className={i === textIdx ? 'body-enter' : 'body-exit'}
              style={{
                ...styles.bodyText,
                opacity: i === textIdx ? 1 : 0,
                pointerEvents: i === textIdx ? 'auto' : 'none',
              }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Progress dots */}
        <div style={styles.progressWrap}>
          {TEXTS.map((_, i) => (
            <div key={i} style={styles.progressDot(i === textIdx)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UpperText;