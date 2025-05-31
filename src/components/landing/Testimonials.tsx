import { Quote, UserCircle } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Hear from marine industry leaders who have transformed their operations with our platform.
          </p>
        </div>
        
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="quote-icon-wrapper">
                <Quote />
              </div>
              <p className="testimonial-text">
                &quot;This platform has revolutionized how we manage our fleet operations. The comprehensive dashboard and analytics have helped us increase efficiency by 40%.&quot;
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <UserCircle />
                </div>
                <div className="author-info">
                  <h4 className="author-name">Captain Sarah Johnson</h4>
                  <p className="author-title">Fleet Operations Manager, Pacific Marine Corp</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="quote-icon-wrapper">
                <Quote />
              </div>
              <p className="testimonial-text">
                &quot;The customer support is exceptional, and the platform&apos;s security features give us peace of mind when handling sensitive marine data.&quot;
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <UserCircle />
                </div>
                <div className="author-info">
                  <h4 className="author-name">Michael Chen</h4>
                  <p className="author-title">IT Director, Harbor Solutions Ltd</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="quote-icon-wrapper">
                <Quote />
              </div>
              <p className="testimonial-text">
                &quot;We&apos;ve streamlined our entire marketing process. The bulk upload feature alone has saved us countless hours of manual data entry.&quot;
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <UserCircle />
                </div>
                <div className="author-info">
                  <h4 className="author-name">Elena Rodriguez</h4>
                  <p className="author-title">Marketing Director, Coastal Enterprises</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
