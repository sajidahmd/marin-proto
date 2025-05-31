import { Ship, Users, FileText, Lock } from 'lucide-react';

export default function KeyFeatures() {
  return (
    <section id="features" className="key-features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Key Features</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Discover the powerful features that make our marine marketing system the industry standard.
          </p>
        </div>
        
        <div className="features-grid">
          <div className="key-feature-card">
            <div className="key-feature-icon">
              <Ship />
            </div>
            <h3>Comprehensive Company and Vessel Management</h3>
            <p>Manage all aspects of your marine operations from a single, intuitive dashboard.</p>
          </div>
          
          <div className="key-feature-card">
            <div className="key-feature-icon">
              <Users />
            </div>
            <h3>Employee and Interaction Tracking</h3>
            <p>Track team performance and client interactions with comprehensive reporting tools.</p>
          </div>
          
          <div className="key-feature-card">
            <div className="key-feature-icon">
              <FileText />
            </div>
            <h3>Bulk Upload and Analytics</h3>
            <p>Import large datasets effortlessly and gain insights through advanced analytics.</p>
          </div>
          
          <div className="key-feature-card">
            <div className="key-feature-icon">
              <Lock />
            </div>
            <h3>Secure Admin Panel with Role-Based Access</h3>
            <p>Enterprise-grade security with customizable permissions for different team roles.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
