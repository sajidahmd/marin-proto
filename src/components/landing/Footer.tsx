import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Anchor} from 'lucide-react';
import {MouseEvent, useCallback} from 'react';
import {FacebookIcon, LinkedInIcon, TelegramIcon, WhatsAppIcon} from "@/components/icons"

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavLinkClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, targetIdWithHash: string) => {
      if (targetIdWithHash.startsWith("#")) {
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
      }
    },
    [location.pathname, navigate]
  );

  const handleChatLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const chatToggle = document.getElementById('chat-toggle');
    if (chatToggle) {
      const chatPopup = document.getElementById('chat-popup');
      if (chatPopup && !chatPopup.classList.contains('active')) {
        chatToggle.click();
      } else if (chatPopup && chatPopup.classList.contains('active')) {
        // Optionally, if already open, maybe scroll to it or do nothing
      } else {
        chatToggle.click();
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <Anchor className="logo-icon"/>
              <span className="logo-text">Marine Marketing</span>
            </Link>
            <p className="footer-description">
              Streamline your marine marketing operations with our comprehensive system designed for industry leaders.
            </p>

            <div className="social-links">
              <Link to="#" className="social-link facebook" aria-label="Facebook"><FacebookIcon/></Link>
              <Link to="#" className="social-link linkedin" aria-label="LinkedIn"><LinkedInIcon/></Link>
              <Link to="#" className="social-link whatsapp" aria-label="WhatsApp"><WhatsAppIcon/></Link>
              <Link to="#" className="social-link telegram" aria-label="Telegram"><TelegramIcon/></Link>
            </div>
          </div>

          <div className="footer-sitemap">
            <div className="sitemap-column">
              <h4>Company</h4>
              <ul>
                <li>
                  <Link to="#about"
                        onClick={(e) => handleNavLinkClick(e, '#about')}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#features" onClick={(e) => handleNavLinkClick(e, '#features')}>
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#testimonials" onClick={(e) => handleNavLinkClick(e, '#testimonials')}>
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link to="#contact" onClick={(e) => handleNavLinkClick(e, '#contact')}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="sitemap-column">
              <h4>Solutions</h4>
              <ul>
                <li>
                  <Link to="#problems" onClick={(e) => handleNavLinkClick(e, '#problems')}>
                    Problem/Solution
                  </Link>
                </li>
                <li>
                  <Link to="#features" onClick={(e) => handleNavLinkClick(e, '#features')}>
                    Key Features
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => console.log("het gelp")}>
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => console.log("het gelp")}>
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>

            <div className="sitemap-column">
              <h4>Support</h4>
              <ul>
                <li>
                  <Link to="#faq" onClick={(e) => handleNavLinkClick(e, '#faq')}>FAQ</Link>
                </li>
                <li>
                  <Link to="/" onClick={() => console.log("het gelp")}>Documentation</Link>
                </li>
                <li>
                  <Link to="/" onClick={() => console.log("het gelp")}>Help Center</Link>
                </li>
                <li>
                  <a href="#chat-widget" onClick={handleChatLinkClick}>Live Chat</a>
                </li>
              </ul>
            </div>

            <div className="sitemap-column">
              <h4>Legal</h4>
              <ul>
                <li>
                  <Link to="/" onClick={() => console.log("het gelp")}>Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/" onClick={() => console.log("het gelp")}>Terms of Service</Link>
                </li>
                <li>
                  <Link to="/" onClick={() => console.log("het gelp")}>Cookie Policy</Link>
                </li>
                <li>
                  <Link to="/" onClick={() => console.log("het gelp")}>GDPR</Link>
                </li>
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