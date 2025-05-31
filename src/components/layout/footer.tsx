import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Tailwind Shadz. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm hover:text-primary transition-colors" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-sm hover:text-primary transition-colors" prefetch={false}>
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
