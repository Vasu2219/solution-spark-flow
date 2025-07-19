
import { useState } from "react";
import { Menu, X, Code, LogIn, UserPlus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Accept user prop
export const Header = ({ user }: { user?: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-blur-header text-white">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">SolutionSpark</span>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <Link to="/dashboard" className="text-white/80 hover:text-white transition-colors font-semibold">Dashboard</Link>
            ) : null}
          </div>

          {/* Auth/Profile Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <Button variant="ghost" size="sm" className="flex items-center" onClick={() => setProfileOpen((v) => !v)}>
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Profile</span>
                </Button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 glass-blur-card rounded-lg z-50">
                    <Link to="/profile" className="block px-4 py-2 text-foreground hover:bg-muted rounded">Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-foreground hover:bg-muted rounded">Settings</Link>
                    <button className="block w-full text-left px-4 py-2 text-foreground hover:bg-muted rounded" onClick={() => { /* TODO: handle logout */ }}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-white text-primary hover:bg-white/90">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </Link>
              </>
            )}
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
            <div className="px-2 pt-2 pb-3 space-y-1 glass-blur border-t border-white/10">
              {user ? (
                <Link to="/dashboard" className="block px-3 py-2 text-white/80 hover:text-white font-semibold">Dashboard</Link>
              ) : null}
              <div className="flex flex-col space-y-2 px-3 pt-4">
                {user ? (
                  <>
                    <Link to="/profile">
                      <Button variant="ghost" size="sm" className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <Link to="/settings">
                      <Button variant="ghost" size="sm" className="flex items-center">
                        Settings
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="flex items-center" onClick={() => { /* TODO: handle logout */ }}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button size="sm" className="bg-white text-primary hover:bg-white/90">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
