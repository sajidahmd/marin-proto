"use client";
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { Anchor, Menu } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const navbarHeight = (document.querySelector('.navbar') as HTMLElement)?.offsetHeight || 80;
      const offsetTop = (targetSection as HTMLElement).offsetTop - navbarHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setMenuOpen(false);
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <div className="nav-logo">
            <Anchor className="logo-icon" />
            <span className="logo-text">Marine Marketing</span>
          </div>
          
          <ul className={`nav-menu ${menuOpen ? 'nav-menu-open' : ''}`}>
            <li><Link href="#hero" className="nav-link" onClick={(e) => handleNavLinkClick(e, '#hero')}>Home</Link></li>
            <li><Link href="#about" className="nav-link" onClick={(e) => handleNavLinkClick(e, '#about')}>About</Link></li>
            <li><Link href="#problems" className="nav-link" onClick={(e) => handleNavLinkClick(e, '#problems')}>Problem/Solution</Link></li>
            <li><Link href="#features" className="nav-link" onClick={(e) => handleNavLinkClick(e, '#features')}>Features</Link></li>
            <li><Link href="#testimonials" className="nav-link" onClick={(e) => handleNavLinkClick(e, '#testimonials')}>Testimonial</Link></li>
            <li><Link href="#faq" className="nav-link" onClick={(e) => handleNavLinkClick(e, '#faq')}>FAQ</Link></li>
            <li><Link href="#contact" className="nav-link" onClick={(e) => handleNavLinkClick(e, '#contact')}>Contact</Link></li>
          </ul>
          
          <button className={`mobile-menu-toggle ${menuOpen ? 'mobile-menu-open' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
            <Menu />
          </button>
        </div>
      </div>
    </nav>
  );
}
