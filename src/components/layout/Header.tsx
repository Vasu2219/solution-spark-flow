
import { useState } from "react";
import { Menu, X, Code, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/90 text-white">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">SolutionSpark</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-white/80 hover:text-white transition-colors">
              Services
            </a>
            <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#projects" className="text-white/80 hover:text-white transition-colors">
              Projects
            </a>
            <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button size="sm" className="bg-white text-primary hover:bg-white/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-primary/95 border-t border-white/10">
              <a href="#services" className="block px-3 py-2 text-white/80 hover:text-white">
                Services
              </a>
              <a href="#how-it-works" className="block px-3 py-2 text-white/80 hover:text-white">
                How It Works
              </a>
              <a href="#projects" className="block px-3 py-2 text-white/80 hover:text-white">
                Projects
              </a>
              <a href="#testimonials" className="block px-3 py-2 text-white/80 hover:text-white">
                Testimonials
              </a>
              <a href="#contact" className="block px-3 py-2 text-white/80 hover:text-white">
                Contact
              </a>
              <div className="flex flex-col space-y-2 px-3 pt-4">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button size="sm" className="bg-white text-primary hover:bg-white/90">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
