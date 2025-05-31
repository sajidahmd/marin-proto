import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import SignInForm from '@/components/auth/SignInForm';

export const metadata: Metadata = {
  title: 'Sign In - Marine Marketing Solutions',
  description: 'Sign in to access your Marine Marketing Solutions account.',
};

export default function SignInPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-muted pt-20 pb-10">
        <SignInForm />
      </main>
      <Footer />
    </>
  );
}
