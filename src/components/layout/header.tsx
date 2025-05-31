import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import Logo from '@/components/logo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Logo />
          <span className="font-headline text-lg font-semibold">Tailwind Shadz</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60" prefetch={false}>
            Features
          </Link>
          <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60" prefetch={false}>
            Pricing
          </Link>
          <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60" prefetch={false}>
            About
          </Link>
          <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60" prefetch={false}>
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button size="sm" className="hidden md:inline-flex">Sign Up</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 p-6">
                <Link href="/" className="flex items-center gap-2 mb-4" prefetch={false}>
                  <Logo />
                  <span className="font-headline text-lg font-semibold">Tailwind Shadz</span>
                </Link>
                <Link href="#" className="text-lg font-medium hover:text-accent transition-colors" prefetch={false}>
                  Features
                </Link>
                <Link href="#" className="text-lg font-medium hover:text-accent transition-colors" prefetch={false}>
                  Pricing
                </Link>
                <Link href="#" className="text-lg font-medium hover:text-accent transition-colors" prefetch={false}>
                  About
                </Link>
                <Link href="#" className="text-lg font-medium hover:text-accent transition-colors" prefetch={false}>
                  Contact
                </Link>
                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full">Sign In</Button>
                  <Button className="w-full">Sign Up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
