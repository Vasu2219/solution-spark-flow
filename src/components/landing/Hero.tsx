
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 gradient-hero opacity-90" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <CheckCircle className="h-5 w-5 text-white" />
            <span className="text-sm font-medium text-white/90">Professional Software Development</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Transform Your Ideas Into
            <span className="block text-white/95">Powerful Software Solutions</span>
          </h1>
          
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            We deliver cutting-edge ML, AI, Full-Stack, and IoT projects for academic research and industrial applications. 
            From concept to deployment, we build solutions that scale.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-white/70">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-white/70">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-white/70">Support Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">5★</div>
              <div className="text-sm text-white/70">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
