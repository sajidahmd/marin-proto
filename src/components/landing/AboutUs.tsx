import { Sailboat, Users, Trophy } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about" className="about-us">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Legacy in Marine Innovation</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
            </p>
          </div>
          
          <div className="about-features">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon cyan">
                  <Sailboat />
                </div>
              </div>
              <h3>Maritime Expertise</h3>
              <p>Over two decades of experience in marine industry solutions and innovations.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon blue">
                  <Users />
                </div>
              </div>
              <h3>Trusted Partners</h3>
              <p>Serving hundreds of marine businesses worldwide with dedicated support.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon cyan">
                  <Trophy />
                </div>
              </div>
              <h3>Industry Leaders</h3>
              <p>Award-winning platform recognized for excellence in marine marketing solutions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
