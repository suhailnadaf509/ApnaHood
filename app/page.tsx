"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Menu, Search } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signIn, signOut } from "next-auth/react";

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}

      <nav className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">
              DataBridge
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link
                href="#about"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
              <div>
                {session ? (
                  <button
                    onClick={() => signOut()}
                    className="bg-zinc-900 text-white px-6 py-2 rounded-md hover:bg-zinc-800 transition-colors duration-200 font-medium"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => signIn("google")}
                    className="inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-2 rounded-md hover:bg-zinc-800 transition-colors duration-200 font-medium"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign In with Google
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="#features" className="text-lg">
                    Features
                  </Link>
                  <Link href="#about" className="text-lg">
                    About
                  </Link>
                  <Link href="#contact" className="text-lg">
                    Contact
                  </Link>
                  <Button variant="secondary">Sign In</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 relative">
        {/* Add background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Add gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black"></div>
        </div>

        {/* Update container to be relative and above the background */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Connecting Communities with Resources
          </h1>
          <p className="text-xl md:text-2xl text-zinc-200 mb-12 max-w-3xl mx-auto">
            DataBridge connects you with local food banks, shelters, and
            healthcare services based on your needs and location.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="text-lg">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            How DataBridge Helps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-6">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Local Resources
                </h3>
                <p className="text-zinc-400">
                  Find nearby community services tailored to your specific needs
                  and location.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-6">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Easy Search
                </h3>
                <p className="text-zinc-400">
                  Simple and intuitive interface to help you find the right
                  resources quickly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-6">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Community Support
                </h3>
                <p className="text-zinc-400">
                  Connect with verified local organizations ready to provide
                  assistance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Connect with Your Community?
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Join DataBridge today and discover the resources available in your
              area.
            </p>
            <Button size="lg" className="text-lg">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-zinc-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} DataBridge. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
