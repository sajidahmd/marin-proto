import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { Anchor, Menu } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetIdWithHash: string) => {
    e.preventDefault();

    if (location.pathname === '/') {
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
      navigate('/' + targetIdWithHash);
    }
    setMenuOpen(false);
  }, [location.pathname, navigate]);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
            <Anchor className="logo-icon"/>
            <span className="logo-text">Marine Marketing</span>
          </Link>

          <ul className={`nav-menu ${menuOpen ? 'nav-menu-open' : ''}`}>
            <li>
              <Link to="#hero" className="nav-link" onClick={(e) => handleNavLinkClick(e, '#hero')}>Home</Link>
            </li>
            <li>
              <Link to="#about" className="nav-link" onClick={(e) => handleNavLinkClick(e, '#about')}>About</Link>
            </li>
            <li>
              <Link to="#problems" className="nav-link" onClick={(e) => handleNavLinkClick(e, '#problems')}>Problem/Solution</Link>
            </li>
            <li>
              <Link to="#features" className="nav-link" onClick={(e) => handleNavLinkClick(e, '#features')}>Features</Link>
            </li>
            <li>
              <Link to="#testimonials" className="nav-link" onClick={(e) => handleNavLinkClick(e, '#testimonials')}>Testimonial</Link>
            </li>
            <li>
              <Link to="#faq" className="nav-link" onClick={(e) => handleNavLinkClick(e, '#faq')}>FAQ</Link>
            </li>
            <li>
              <Link to="#contact" className="nav-link" onClick={(e) => handleNavLinkClick(e, '#contact')}>Contact</Link>
            </li>
          </ul>

          <button
            className={`mobile-menu-toggle ${menuOpen ? 'mobile-menu-open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <Menu/>
          </button>
        </div>
      </div>
    </nav>
  );
}