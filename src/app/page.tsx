import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RocketIcon, SettingsIcon, UsersIcon, ZapIcon } from 'lucide-react';
import Image from 'next/image';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center py-12 md:py-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
            Welcome to Tailwind Shadz
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            A beautifully designed application starter using Next.js, Tailwind CSS, and Shadcn UI.
            Jumpstart your project with this sleek and modern interface.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg">
              Get Started <RocketIcon className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <ZapIcon className="mr-3 h-7 w-7 text-primary" />
                Lightning Fast
              </CardTitle>
              <CardDescription>Optimized for performance and speed.</CardDescription>
            </CardHeader>
            <CardContent>
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="Lightning Fast Placeholder" 
                data-ai-hint="speed technology" 
                width={600} height={400} 
                className="rounded-md mb-4 aspect-video object-cover" 
              />
              <p>Experience blazing-fast load times and a smooth user experience, powered by Next.js and server components.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">Explore Speed</Button>
            </CardFooter>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <UsersIcon className="mr-3 h-7 w-7 text-primary" />
                Seamless Collaboration
              </CardTitle>
              <CardDescription>Tools designed for effective teamwork.</CardDescription>
            </CardHeader>
            <CardContent>
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="Seamless Collaboration Placeholder" 
                data-ai-hint="teamwork office" 
                width={600} height={400} 
                className="rounded-md mb-4 aspect-video object-cover"
              />
              <p>Connect with your team like never before. Streamlined workflows and communication to boost productivity.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">Boost Teamwork</Button>
            </CardFooter>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <SettingsIcon className="mr-3 h-7 w-7 text-primary" />
                Highly Customizable
              </CardTitle>
              <CardDescription>Tailor everything to your specific needs.</CardDescription>
            </CardHeader>
            <CardContent>
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="Highly Customizable Placeholder" 
                data-ai-hint="settings interface"
                width={600} height={400} 
                className="rounded-md mb-4 aspect-video object-cover"
              />
              <p>Flexible options and powerful settings allow you to adapt the application perfectly to your workflow.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">Customize Now</Button>
            </CardFooter>
          </Card>
        </section>

        <section className="mb-16 p-8 bg-card rounded-xl shadow-lg">
          <h2 className="text-3xl font-headline font-semibold text-center mb-8">Manage Your Profile</h2>
          <Tabs defaultValue="account" className="w-full max-w-2xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="account">Account Details</TabsTrigger>
              <TabsTrigger value="password">Change Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your account details here. Click save when you are finished.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Your Name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="your.email@example.com" placeholder="Enter your email" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Save Account</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle>Password Settings</CardTitle>
                  <CardDescription>
                    Update your password. For security, you might be logged out after changing it.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" placeholder="Enter current password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" placeholder="Enter new password" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
}
