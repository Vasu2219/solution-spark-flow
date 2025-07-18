
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "AI-Powered Analytics Platform",
    description: "Machine learning platform for predictive analytics with real-time dashboard.",
    image: "/placeholder.svg",
    tags: ["Python", "TensorFlow", "React", "AWS"],
    type: "Industrial"
  },
  {
    title: "IoT Environmental Monitor",
    description: "Smart sensor network for environmental monitoring with mobile app interface.",
    image: "/placeholder.svg",
    tags: ["Arduino", "React Native", "Node.js", "MongoDB"],
    type: "Academic"
  },
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration and inventory management.",
    image: "/placeholder.svg",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Docker"],
    type: "Industrial"
  },
  {
    title: "Computer Vision System",
    description: "Deep learning model for object detection and classification in manufacturing.",
    image: "/placeholder.svg",
    tags: ["PyTorch", "OpenCV", "Flask", "Docker"],
    type: "Industrial"
  },
  {
    title: "Research Data Portal",
    description: "Academic research platform for data collection and collaborative analysis.",
    image: "/placeholder.svg",
    tags: ["Django", "PostgreSQL", "D3.js", "Docker"],
    type: "Academic"
  },
  {
    title: "Mobile Health App",
    description: "Cross-platform health monitoring app with wearable device integration.",
    image: "/placeholder.svg",
    tags: ["Flutter", "Firebase", "BLE", "Charts"],
    type: "Industrial"
  }
];

export const ProjectGallery = () => {
  return (
    <section id="projects" className="py-20 gradient-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Featured Projects and Customer Stories
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Explore our portfolio of successful projects across various industries and technologies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-white/95 backdrop-blur">
              <div className="aspect-video bg-muted/50 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant={project.type === "Industrial" ? "default" : "secondary"} className="bg-primary text-white">
                    {project.type}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs border-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
