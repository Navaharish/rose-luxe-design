import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import vitaminCSerum from "@/assets/vitamin-c-serum.png";
import beetrootLipbalm from "@/assets/beetroot-lipbalm.png";
import nightCream from "@/assets/night-cream.png";
import orangeFaceWash from "@/assets/orange-face-wash.png";
import rabbitHairOil from "@/assets/rabbit-hair-oil.png";
import redWineFaceWash from "@/assets/red-wine-face-wash.png";
import sunscreen from "@/assets/sunscreen.png";
import underEyeCream from "@/assets/under-eye-cream.png";

export default function Shop() {
  const [priceRange, setPriceRange] = useState([0, 50]);

  const products = [
    { id: "1", name: "Vitamin C Serum - Brightens Skin", price: 35, image: vitaminCSerum, category: "Serums", rating: 4.8 },
    { id: "2", name: "Natural Beetroot Lip Balm", price: 12, image: beetrootLipbalm, category: "Lip Care", rating: 4.9 },
    { id: "3", name: "Nighty Night Cream", price: 28, image: nightCream, category: "Night Care", rating: 4.7 },
    { id: "4", name: "Orange Whitening Face Wash", price: 18, image: orangeFaceWash, category: "Cleansers", rating: 4.6 },
    { id: "5", name: "Rabbit Blood Hair Oil", price: 32, image: rabbitHairOil, category: "Hair Care", rating: 4.8 },
    { id: "6", name: "Red Wine Face Wash", price: 22, image: redWineFaceWash, category: "Cleansers", rating: 4.7 },
    { id: "7", name: "Sun Screen Lotion SPF 50", price: 26, image: sunscreen, category: "Sun Care", rating: 4.9 },
    { id: "8", name: "Under Eye Cream", price: 24, image: underEyeCream, category: "Eye Care", rating: 4.6 }
  ];

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-3">
          {["Serums", "Lip Care", "Night Care", "Cleansers", "Hair Care", "Sun Care", "Eye Care"].map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox id={cat} />
              <Label htmlFor={cat} className="text-sm cursor-pointer">{cat}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={50}
          step={1}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Rating</h3>
        <div className="space-y-3">
          {[5, 4, 3].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer">
                {rating}★ & above
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-soft/30 to-lavender/20 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-elegant mb-4">Our Collection</h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore our complete range of natural, luxurious beauty and skincare products
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="card-elegant p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="h-5 w-5" />
                <h2 className="font-semibold text-lg">Filters</h2>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Mobile Filter */}
            <div className="lg:hidden mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="mt-8">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground">
                Showing {products.length} products
              </p>
              <select className="px-4 py-2 rounded-lg border border-border bg-background">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
