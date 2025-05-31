import { AlertTriangle, TrendingUp, Clock, DollarSign } from 'lucide-react';

export default function ProblemWeSolve() {
  return (
    <section id="problems" className="problems">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Navigating Industry Challenges</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        
        <div className="problems-grid">
          <div className="problem-card">
            <div className="problem-icon red">
              <AlertTriangle />
            </div>
            <h3>Complex Operations</h3>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
          
          <div className="problem-card">
            <div className="problem-icon orange">
              <TrendingUp />
            </div>
            <h3>Market Visibility</h3>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div>
          
          <div className="problem-card">
            <div className="problem-icon yellow">
              <Clock />
            </div>
            <h3>Time Management</h3>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          
          <div className="problem-card">
            <div className="problem-icon green">
              <DollarSign />
            </div>
            <h3>Cost Efficiency</h3>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
          </div>
        </div>
        
        <div className="problems-summary">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>
    </section>
  );
}
