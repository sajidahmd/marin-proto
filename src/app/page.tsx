import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import AboutUs from '@/components/landing/AboutUs';
import ProblemWeSolve from '@/components/landing/ProblemWeSolve';
import KeyFeatures from '@/components/landing/KeyFeatures';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import ContactUs from '@/components/landing/ContactUs';
import LiveChatWidget from '@/components/landing/LiveChatWidget';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <ProblemWeSolve />
        <KeyFeatures />
        <Testimonials />
        <FAQ />
        <ContactUs />
      </main>
      <LiveChatWidget />
      <Footer />
    </>
  );
}
