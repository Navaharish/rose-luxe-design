import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, Minus, Plus, Star } from "lucide-react";
import { api } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const data = await api.products.getById(productId);
      setProduct(data);
      
      const allProducts = await api.products.getAll();
      const related = allProducts
        .filter(p => p.category === data.category && p.id !== data.id)
        .slice(0, 3);
      setRelatedProducts(related);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!id) return;
    await addToCart(id, quantity);
    setQuantity(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const inStock = product.stock > 0;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-4">
            <div className="card-elegant aspect-square overflow-hidden bg-gradient-to-br from-pink-soft/30 to-cream">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

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
                        i < Math.floor(parseFloat(product.rating || "0"))
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating}
                </span>
              </div>

              <p className="text-3xl font-bold text-primary mb-6">${parseFloat(product.price).toFixed(2)}</p>
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
                <span className={`text-sm ${inStock ? "text-green-600" : "text-red-600"}`}>
                  {inStock ? `${product.stock} In Stock` : "Out of Stock"}
                </span>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 rounded-full btn-primary-gradient text-white"
                  disabled={!inStock}
                  onClick={handleAddToCart}
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

        <div className="mb-20">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start rounded-full bg-muted p-1">
              <TabsTrigger value="description" className="rounded-full">Description</TabsTrigger>
              <TabsTrigger value="ingredients" className="rounded-full">Ingredients</TabsTrigger>
              <TabsTrigger value="howto" className="rounded-full">How to Use</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <div className="card-elegant p-8">
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  {product.detailedDescription ? (
                    product.detailedDescription.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 leading-relaxed whitespace-pre-line">{paragraph}</p>
                    ))
                  ) : (
                    <p className="leading-relaxed">{product.description}</p>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ingredients" className="mt-8">
              <div className="card-elegant p-8">
                <p className="text-muted-foreground leading-relaxed">
                  {product.ingredients || "No ingredients information available."}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="howto" className="mt-8">
              <div className="card-elegant p-8">
                <p className="text-muted-foreground leading-relaxed">
                  {product.howToUse || "No usage instructions available."}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-elegant mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  id={product.id}
                  name={product.name}
                  price={parseFloat(product.price)}
                  image={product.imageUrl}
                  category={product.category}
                  rating={parseFloat(product.rating || "0")}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
