"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, XCircle } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('idle'); 
    if (validateForm()) {
      // Simulate form submission
      console.log('Form data submitted:', formData);
      setTimeout(() => {
        setFormStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000); // Hide success message after 5 seconds
      }, 1000);
    } else {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000); // Hide error message after 5 seconds
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get in Touch</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Ready to transform your marine marketing operations? Contact us today to learn more about our innovative solutions.
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <h3>Contact Information</h3>
              
              <div className="contact-item">
                <div className="contact-icon-wrapper cyan">
                  <Mail />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>contact@marinemmarketing.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon-wrapper blue">
                  <Phone />
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon-wrapper cyan">
                  <MapPin />
                </div>
                <div>
                  <h4>Address</h4>
                  <p>123 Harbor Drive<br />Marine City, MC 12345</p>
                </div>
              </div>
            </div>
            
            <div className="benefits-card">
              <h3>Why Choose Our System?</h3>
              <ul>
                <li>24/7 Dedicated Support</li>
                <li>Industry-Leading Technology</li>
                <li>Proven Track Record</li>
                <li>Scalable Solutions</li>
              </ul>
            </div>
          </div>
          
          <div className="contact-form">
            <form id="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    placeholder="Enter your first name" 
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'error' : ''}
                    required 
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    placeholder="Enter your last name" 
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                    required 
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address <span className="required">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Enter your email address" 
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  required 
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="company">Company (Optional)</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  placeholder="Enter your company name" 
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message <span className="required">*</span></label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  placeholder="Tell us about your marine marketing needs..." 
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                  required
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
              
              <button type="submit" className="btn btn-gradient">
                Send Message
                <Send className="btn-icon" />
              </button>
              
              {formStatus === 'success' && (
                <div className="form-message success-message show" id="success-message">
                  <CheckCircle2 />
                  <p>Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.</p>
                </div>
              )}
              
              {formStatus === 'error' && Object.keys(errors).length > 0 && (
                 <div className="form-message error-message-box show" id="error-message-box">
                   <XCircle />
                   <p>Please correct the errors above and try again.</p>
                 </div>
              )}
               {formStatus === 'error' && Object.keys(errors).length === 0 && (
                 <div className="form-message error-message-box show" id="error-message-box-general">
                   <XCircle />
                   <p>Sorry, there was an error sending your message. Please try again.</p>
                 </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
