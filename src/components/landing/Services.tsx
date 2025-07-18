
import { Brain, Globe, Cpu, Database, Code, Smartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Brain,
    title: "Machine Learning & AI",
    description: "Custom ML models, deep learning solutions, computer vision, NLP, and AI-powered applications.",
    features: ["Neural Networks", "Computer Vision", "NLP", "Predictive Analytics"]
  },
  {
    icon: Globe,
    title: "Full-Stack Development",
    description: "Modern web applications using React, Node.js, Python, and cloud technologies.",
    features: ["React/Next.js", "Node.js/Python", "Database Design", "API Development"]
  },
  {
    icon: Cpu,
    title: "IoT Solutions",
    description: "Smart IoT systems, sensor integration, real-time monitoring, and data visualization.",
    features: ["Sensor Integration", "Real-time Data", "Dashboard Design", "Cloud Connectivity"]
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "Big data processing, ETL pipelines, data warehousing, and analytics platforms.",
    features: ["Data Pipelines", "Analytics", "Visualization", "Cloud Storage"]
  },
  {
    icon: Code,
    title: "Custom Software",
    description: "Tailored desktop applications, automation tools, and enterprise solutions.",
    features: ["Desktop Apps", "Automation", "Integration", "Scalable Architecture"]
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Cross-platform mobile apps with modern UI/UX and backend integration.",
    features: ["React Native", "Flutter", "Native iOS/Android", "Backend Integration"]
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We specialize in cutting-edge technologies to deliver solutions that drive innovation and growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {service.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
