"use client";
import Link from 'next/link';
import { Anchor } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import type { MouseEvent } from 'react';
import { useCallback } from 'react';

// Inline SVGs for social icons as lucide-react doesn't have brand icons
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);


export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavLinkClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, targetIdWithHash: string) => {
      if (targetIdWithHash.startsWith("#")) {
        e.preventDefault();
        if (pathname === '/') {
          const targetSection = document.querySelector(targetIdWithHash);
          if (targetSection) {
            const navbarHeight = (document.querySelector('.navbar') as HTMLElement)?.offsetHeight || 80;
            const offsetTop = (targetSection as HTMLElement).offsetTop - navbarHeight;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        } else {
          router.push('/' + targetIdWithHash);
        }
      }
    },
    [pathname, router]
  );

  const handleChatLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const chatToggle = document.getElementById('chat-toggle');
    if (chatToggle) {
        // Open chat if not already open, or simply bring focus if complex logic is not desired
        const chatPopup = document.getElementById('chat-popup');
        if (chatPopup && !chatPopup.classList.contains('active')) {
            chatToggle.click();
        } else if (chatPopup && chatPopup.classList.contains('active')) {
            // Optionally, if already open, maybe scroll to it or do nothing
            // For a fixed widget, scrolling is not very effective
        } else {
           chatToggle.click(); // Fallback if active class check is tricky
        }
    }
  };


  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <Anchor className="logo-icon" />
              <span className="logo-text">Marine Marketing</span>
            </Link>
            <p className="footer-description">
              Streamline your marine marketing operations with our comprehensive system designed for industry leaders.
            </p>
            
            <div className="social-links">
              <Link href="#" className="social-link facebook" aria-label="Facebook"><FacebookIcon /></Link>
              <Link href="#" className="social-link linkedin" aria-label="LinkedIn"><LinkedInIcon /></Link>
              <Link href="#" className="social-link whatsapp" aria-label="WhatsApp"><WhatsAppIcon /></Link>
              <Link href="#" className="social-link telegram" aria-label="Telegram"><TelegramIcon /></Link>
            </div>
          </div>
          
          <div className="footer-sitemap">
            <div className="sitemap-column">
              <h4>Company</h4>
              <ul>
                <li><Link href="#about" onClick={(e) => handleNavLinkClick(e, '#about')}>About Us</Link></li>
                <li><Link href="#features" onClick={(e) => handleNavLinkClick(e, '#features')}>Features</Link></li>
                <li><Link href="#testimonials" onClick={(e) => handleNavLinkClick(e, '#testimonials')}>Testimonials</Link></li>
                <li><Link href="#contact" onClick={(e) => handleNavLinkClick(e, '#contact')}>Contact</Link></li>
              </ul>
            </div>
            
            <div className="sitemap-column">
              <h4>Solutions</h4>
              <ul>
                <li><Link href="#problems" onClick={(e) => handleNavLinkClick(e, '#problems')}>Problem/Solution</Link></li>
                <li><Link href="#features" onClick={(e) => handleNavLinkClick(e, '#features')}>Key Features</Link></li>
                <li><Link href="/pricing" onClick={(e) => handleNavLinkClick(e, '/pricing')}>Pricing</Link></li>
                <li><Link href="/case-studies" onClick={(e) => handleNavLinkClick(e, '/case-studies')}>Case Studies</Link></li>
              </ul>
            </div>
            
            <div className="sitemap-column">
              <h4>Support</h4>
              <ul>
                <li><Link href="#faq" onClick={(e) => handleNavLinkClick(e, '#faq')}>FAQ</Link></li>
                <li><Link href="/documentation" onClick={(e) => handleNavLinkClick(e, '/documentation')}>Documentation</Link></li>
                <li><Link href="/help-center" onClick={(e) => handleNavLinkClick(e, '/help-center')}>Help Center</Link></li>
                <li><a href="#chat-widget" onClick={handleChatLinkClick}>Live Chat</a></li>
              </ul>
            </div>
            
            <div className="sitemap-column">
              <h4>Legal</h4>
              <ul>
                <li><Link href="/privacy-policy" onClick={(e) => handleNavLinkClick(e, '/privacy-policy')}>Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" onClick={(e) => handleNavLinkClick(e, '/terms-of-service')}>Terms of Service</Link></li>
                <li><Link href="/cookie-policy" onClick={(e) => handleNavLinkClick(e, '/cookie-policy')}>Cookie Policy</Link></li>
                <li><Link href="/gdpr" onClick={(e) => handleNavLinkClick(e, '/gdpr')}>GDPR</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} Marine Marketing Solutions. All rights reserved.</p>
            <p>Streamlining marine operations worldwide.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
