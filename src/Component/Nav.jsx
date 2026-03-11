import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from "./Navbar";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    // Entrance animation for the logo
    gsap.fromTo(logoRef.current, 
      { scale: 2, opacity: 0, x: 100, y: 100 }, 
      { scale: 1, opacity: 1, x: 0, y: 0, duration: 1.2, ease: "power3.out", delay: 0.5 }
    );
  }, []);
  const items = [
    { label: "Home", href: "/#home" },
    { label: "Services", href: "/#services" },
    { label: "About us", href: "/#about" },
    { label: "Blog", href: "/#blog" },
    { label: "Contact us", href: "/#contact" },
  ];

  return (
    <div className="sticky top-0 z-[100] w-full h-[100px] flex items-center px-4 sm:px-8 bg-transparent backdrop-blur-lg">
      
      <a href="/#home" className="mr-8">
        <img 
          ref={logoRef}
          className='h-[75px] md:h-[90px] object-contain cursor-pointer' 
          src="/logo1.png" 
          alt="logo" 
          style={{ opacity: 0 }} // Start invisible before GSAP kicks in
        />
      </a>
      
      {/* Desktop Menu */}
      <div className="hidden md:block ml-auto">
        <Navbar
          items={items}
          particleCount={41}
          particleDistances={[90, 10]}
          particleR={400}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={1200}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>

      {/* Mobile Hamburger Icon */}
      <button 
        className="md:hidden ml-auto text-[#C4F20D] focus:outline-none p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle Navigation"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`fixed top-[100px] left-0 w-full h-[calc(100vh-100px)] bg-transparent backdrop-blur-xl border-t border-[#C4F20D]/20 md:hidden overflow-hidden transition-all duration-300 ease-in-out origin-top z-[60] ${
          isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col text-center">
          {items.map((item, index) => (
            <li key={index} className="border-b border-[#C4F20D]/10 last:border-none">
              <a 
                href={item.href} 
                className="block py-4 text-lg font-medium tracking-wide text-[#C4F20D] hover:bg-[#C4F20D]/10 active:bg-[#C4F20D]/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
