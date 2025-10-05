import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, Minus, Plus, Star } from "lucide-react";
import vitaminCSerum from "@/assets/vitamin-c-serum.png";
import beetrootLipbalm from "@/assets/beetroot-lipbalm.png";
import nightCream from "@/assets/night-cream.png";
import orangeFaceWash from "@/assets/orange-face-wash.png";

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app, fetch by ID
  const product = {
    id: "1",
    name: "Vitamin C Serum",
    price: 35,
    image: vitaminCSerum,
    category: "Serums",
    rating: 4.8,
    reviews: 128,
    description: "A lightweight facial serum that brightens skin tone and enhances overall radiance. Formulated with citrus extracts for optimal Vitamin C absorption.",
    ingredients: "Aqua, Ascorbic Acid (Vitamin C), Hyaluronic Acid, Glycerin, Citrus Extract, Aloe Vera",
    howToUse: "Apply 2-3 drops to cleansed face and neck. Gently massage until fully absorbed. Use morning and evening before moisturizer.",
    inStock: true
  };

  const recommendedProducts = [
    { id: "2", name: "Natural Beetroot Lip Balm", price: 12, image: beetrootLipbalm, category: "Lip Care", rating: 4.9 },
    { id: "3", name: "Nighty Night Cream", price: 28, image: nightCream, category: "Night Care", rating: 4.7 },
    { id: "4", name: "Orange Whitening Face Wash", price: 18, image: orangeFaceWash, category: "Cleansers", rating: 4.6 }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="space-y-4">
            <div className="card-elegant aspect-square overflow-hidden bg-gradient-to-br from-pink-soft/30 to-cream">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-bold text-elegant mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-3xl font-bold text-primary mb-6">${product.price}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-l-full"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-r-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 rounded-full btn-primary-gradient text-white"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-20">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start rounded-full bg-muted p-1">
              <TabsTrigger value="description" className="rounded-full">Description</TabsTrigger>
              <TabsTrigger value="ingredients" className="rounded-full">Ingredients</TabsTrigger>
              <TabsTrigger value="howto" className="rounded-full">How to Use</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-full">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <div className="card-elegant p-8">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="ingredients" className="mt-8">
              <div className="card-elegant p-8">
                <p className="text-muted-foreground leading-relaxed">{product.ingredients}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="howto" className="mt-8">
              <div className="card-elegant p-8">
                <p className="text-muted-foreground leading-relaxed">{product.howToUse}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="card-elegant p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-soft to-lavender flex items-center justify-center font-semibold">
                        A
                      </div>
                      <div>
                        <p className="font-semibold">Anonymous User</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Amazing product! Highly recommend for daily skincare routine.
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Recommended */}
        <div>
          <h2 className="text-3xl font-bold text-elegant mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
