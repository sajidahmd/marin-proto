import { Anchor, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg"></div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-icon">
            <Anchor className="anchor-icon" />
            <div className="icon-glow"></div>
          </div>
          
          <h1 className="hero-title">
            Streamline Your Marine Marketing Operations
          </h1>
          
          <p className="hero-subtitle">
            Navigate the future of marine business with our comprehensive marketing system designed for industry leaders.
          </p>
          
          <div className="hero-buttons">
            <button className="btn btn-primary">
              Apply for Membership
              <ArrowRight className="btn-icon" />
            </button>
            
            <button className="btn btn-outline">
              Sign In
            </button>
          </div>
        </div>
      </div>
      
      <div className="floating-element floating-1"></div>
      <div className="floating-element floating-2"></div>
      <div className="floating-element floating-3"></div>
    </section>
  );
}
