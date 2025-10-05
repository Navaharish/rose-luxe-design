import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Leaf, Award } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-soft/30 to-lavender/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-elegant mb-6">
            Our Story
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Crafting beauty through nature's wisdom, one product at a time
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-elegant mb-6">
                Beauty Meets Nature
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Enormous, we believe that true beauty comes from within nature. 
                Our journey began with a simple mission: to create luxurious, effective 
                skincare products that harness the power of natural ingredients while 
                respecting our planet and its inhabitants.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-elegant">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To revolutionize the beauty industry by proving that luxury and 
                  sustainability can coexist. We envision a world where every woman 
                  can indulge in premium skincare that's both effective and ethical.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-elegant">Our Values</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Transparency, sustainability, and effectiveness guide everything we do. 
                  We're committed to using only the finest natural ingredients, 
                  cruelty-free practices, and sustainable packaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-gradient-to-br from-pink-soft/20 to-lavender/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: "100% Natural",
                desc: "Pure ingredients sourced from nature's bounty"
              },
              {
                icon: Heart,
                title: "Cruelty Free",
                desc: "Never tested on animals, always ethical"
              },
              {
                icon: Sparkles,
                title: "Premium Quality",
                desc: "Luxurious formulations for visible results"
              },
              {
                icon: Award,
                title: "Award Winning",
                desc: "Recognized for excellence in natural beauty"
              }
            ].map((value, i) => (
              <div key={i} className="card-elegant p-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-elegant">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-elegant mb-6">
              Join Our Beauty Journey
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Discover the difference that natural, luxurious skincare can make
            </p>
            <Link to="/shop">
              <Button size="lg" className="rounded-full btn-primary-gradient text-white">
                Explore Our Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
