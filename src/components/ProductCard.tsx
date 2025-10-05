import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
}

export const ProductCard = ({ id, name, price, image, category, rating = 4.5 }: ProductCardProps) => {
  return (
    <Card className="card-elegant group overflow-hidden border-border/50">
      <Link to={`/product/${id}`}>
        <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-pink-soft to-cream">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-4 right-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist logic
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>
      
      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{category}</p>
          <Link to={`/product/${id}`}>
            <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xl font-semibold text-primary">${price}</p>
            {rating && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>⭐</span>
                <span>{rating}</span>
              </div>
            )}
          </div>
          
          <Button 
            size="icon" 
            className="rounded-full bg-primary hover:bg-primary/90"
            onClick={() => {
              // Add to cart logic
            }}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
