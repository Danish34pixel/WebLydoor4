import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Initial state
    tl.set(logoRef.current, { scale: 0.5, opacity: 0 });
    tl.set(loaderRef.current, { opacity: 1 });

    // Entrance animation
    tl.to(logoRef.current, {
      scale: 1.5,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out"
    });

    // Slight pulse or hold
    tl.to(logoRef.current, {
      scale: 1.4,
      duration: 0.8,
      ease: "sine.inOut"
    });

    // Final transition: scale down and move towards navbar position
    tl.to(logoRef.current, {
      scale: 0.3,
      x: -window.innerWidth * 0.45,
      y: -window.innerHeight * 0.45,
      opacity: 0,
      duration: 1.2,
      ease: "power3.inOut"
    }, "+=0.2");

    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut"
    }, "-=1.0");

    // After animation, remove from DOM logic is handled in App.jsx via onComplete
  }, [onComplete]);

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0a0a0a]"
      style={{ pointerEvents: 'none' }} // Ensure it doesn't block clicks while fading
    >
      <div className="relative">
        <img 
          ref={logoRef}
          src="/logo1.png" 
          alt="Loading Logo" 
          className="w-64 md:w-80 object-contain"
        />
      </div>
    </div>
  );
};

export default Loader;
