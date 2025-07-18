
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ProjectGallery } from "@/components/landing/ProjectGallery";
import { Testimonials } from "@/components/landing/Testimonials";
import { ContactSection } from "@/components/landing/ContactSection";
import { Link, useNavigate } from 'react-router-dom';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Index = () => {

 const navigate = useNavigate();

  return (
 <div className="min-h-screen bg-background">

      <Header />
      <main className="container mx-auto px-4 py-8">
        {!showAuthForms ? (
          <div className="space-y-16">
            <Hero onGetStarted={() => setShowAuthForms(true)} />
            <Services />
 <HowItWorks />
            {/* Added direct links for Login and Signup */}
            <div className="flex justify-center space-x-4 mt-8">
              <Link to="/login">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600">Login</button>
              </Link>
              <Link to="/signup">
                <button className="bg-green-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-600">Sign Up</button>
              </Link>
            </div>
 <Testimonials />
 <ContactSection />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
            <div className="w-full max-w-md space-y-8">
              <h2 className="text-2xl font-bold text-center">Get Started</h2>

              {/* Authentication Forms Removed */}
              <button
                onClick={() => setShowAuthForms(false)}
                className="text-center text-sm text-muted-foreground hover:underline"
              >
                Back to Home
              </button>

              {/* Display authenticated user */}
              {user && (
                <div className="text-center mt-4">
                  <p>Logged in as: {user.email}</p>
                  <button onClick={handleSignOut} className="text-sm text-red-500 hover:underline mt-2">Sign Out</button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
