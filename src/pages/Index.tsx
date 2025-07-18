
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ProjectGallery } from "@/components/landing/ProjectGallery";
import { Testimonials } from "@/components/landing/Testimonials";
import { ContactSection } from "@/components/landing/ContactSection";
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type IndexProps = {
  user: any;
};

const Index = ({ user }: IndexProps) => {
  const navigate = useNavigate();

  if (user) {
    // If logged in, redirect to dashboard
    return <Navigate to="/dashboard" />;
  }

  // Not logged in: show only Services
  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <main className="container mx-auto px-4 py-8">
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
