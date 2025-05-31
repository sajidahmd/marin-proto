
import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password - Marine Marketing Solutions',
  description: 'Reset your password for Marine Marketing Solutions.',
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-muted pt-20 pb-10">
        <ForgotPasswordForm />
      </main>
      <Footer />
    </>
  );
}
