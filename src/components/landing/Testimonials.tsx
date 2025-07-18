
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Research Director",
    company: "Tech University",
    image: "/placeholder.svg",
    rating: 5,
    text: "Outstanding work on our ML research project. The team delivered beyond expectations with excellent documentation and support."
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "StartupCorp",
    image: "/placeholder.svg",
    rating: 5,
    text: "Professional, timely, and innovative. They built our entire IoT platform from scratch and it's been running flawlessly."
  },
  {
    name: "Prof. David Martinez",
    role: "Department Head",
    company: "State College",
    image: "/placeholder.svg",
    rating: 5,
    text: "Excellent collaboration on multiple academic projects. Their expertise in data science and web development is impressive."
  },
  {
    name: "Lisa Thompson",
    role: "Product Manager",
    company: "InnovateTech",
    image: "/placeholder.svg",
    rating: 5,
    text: "They transformed our idea into a full-featured web application. Great communication and project management throughout."
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about our work.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 bg-muted"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
