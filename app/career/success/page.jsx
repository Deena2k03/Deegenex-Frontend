import React from 'react';
import './SuccessPage.css';

export default function SuccessPage() {
  return (
    <div className="success-page">
      <div className="success-card">
        {/* Animated Icon Circle */}
        <div className="icon-box">
          <svg 
            width="36" 
            height="36" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        {/* Professional & Sweet Content */}
        <h2>Application Received</h2>
        <p>
          Thank you for your interest in <span className="company-accent">Deegenex</span>. 
          Your profile is being reviewed by our team, and we will contact you via email shortly.
        </p>

        {/* Action Link */}
        <a href="/career" className="btn-return">
          Return to Careers
        </a>
      </div>
    </div>
  );
}