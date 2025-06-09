import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0} 
           onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(!isOpen); }}>
        <h3>{question}</h3>
        <ChevronDown className="faq-icon" />
      </div>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default function FAQ() {
  const faqData = [
    {
      question: "How do I apply for membership?",
      answer: "Click 'Apply for Membership' and fill out the form."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use industry-standard security practices."
    },
    {
      question: "Can I bulk upload data?",
      answer: "Yes, our admin panel supports CSV/XLS uploads."
    }
  ];

  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Find answers to common questions about our marine marketing system.
          </p>
        </div>
        
        <div className="faq-content">
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
