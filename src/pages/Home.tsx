import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, Sparkles, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import vitaminCSerum from "@/assets/vitamin-c-serum.png";
import beetrootLipbalm from "@/assets/beetroot-lipbalm.png";
import nightCream from "@/assets/night-cream.png";
import orangeFaceWash from "@/assets/orange-face-wash.png";

export default function Home() {
  const featuredProducts = [
    {
      id: "1",
      name: "Vitamin C Serum",
      price: 35,
      image: vitaminCSerum,
      category: "Serums",
      rating: 4.8
    },
    {
      id: "2",
      name: "Natural Beetroot Lip Balm",
      price: 12,
      image: beetrootLipbalm,
      category: "Lip Care",
      rating: 4.9
    },
    {
      id: "3",
      name: "Nighty Night Cream",
      price: 28,
      image: nightCream,
      category: "Night Care",
      rating: 4.7
    },
    {
      id: "4",
      name: "Orange Whitening Face Wash",
      price: 18,
      image: orangeFaceWash,
      category: "Cleansers",
      rating: 4.6
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-pink-soft/40 via-lavender/30 to-cream/50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Natural • Luxurious • Trusted</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-elegant mb-6 leading-tight">
              Radiant Beauty,{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Naturally Yours
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Discover our curated collection of premium cosmetics and home care products, 
              crafted with love and nature's finest ingredients.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button size="lg" className="rounded-full btn-primary-gradient text-white">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="rounded-full">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: "100% Natural", desc: "Pure ingredients from nature" },
              { icon: Heart, title: "Cruelty Free", desc: "Never tested on animals" },
              { icon: Shield, title: "Quality Assured", desc: "Premium certified products" }
            ].map((feature, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-soft to-lavender/50">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-elegant">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-elegant mb-4">
              Featured Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked bestsellers loved by our community
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/shop">
              <Button size="lg" variant="outline" className="rounded-full">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-br from-pink-soft/20 to-lavender/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-elegant mb-4">
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Skincare", count: 24, color: "from-pink-soft to-pink-medium" },
              { name: "Lip Care", count: 12, color: "from-rose-gold to-lavender" },
              { name: "Hair Care", count: 8, color: "from-lavender to-secondary" },
              { name: "Sun Care", count: 6, color: "from-accent/30 to-cream" }
            ].map((category) => (
              <Link key={category.name} to={`/shop?category=${category.name.toLowerCase()}`}>
                <div className={`card-elegant p-8 text-center bg-gradient-to-br ${category.color} hover:scale-105 transition-transform cursor-pointer`}>
                  <h3 className="text-xl font-semibold text-elegant mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} Products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-elegant mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                text: "The vitamin C serum transformed my skin! Absolutely in love with the results.",
                rating: 5
              },
              {
                name: "Emma L.",
                text: "Natural ingredients, luxurious feel. These products are simply amazing!",
                rating: 5
              },
              {
                name: "Jessica K.",
                text: "Best skincare investment I've ever made. My skin has never looked better.",
                rating: 5
              }
            ].map((review, i) => (
              <div key={i} className="card-elegant p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-primary">⭐</span>
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{review.text}"</p>
                <p className="font-semibold">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-elegant mb-4">
            Join Our Beauty Community
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Subscribe to get exclusive offers, beauty tips, and early access to new products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="lg" className="rounded-full btn-primary-gradient text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
