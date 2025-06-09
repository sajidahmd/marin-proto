
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import MembershipForm from '@/components/membership/MembershipForm';


export default function ApplyForMembershipPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-10 bg-muted min-h-screen">
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Apply for Membership</h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Join our community of marine industry leaders. Fill out the form below to get started.
            </p>
          </div>
          <MembershipForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
