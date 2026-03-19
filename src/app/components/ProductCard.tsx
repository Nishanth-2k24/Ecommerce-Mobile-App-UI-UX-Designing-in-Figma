import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router';
import { Product } from '../data/products';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success('Added to cart!');
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-2">
            {discount > 0 && (
              <Badge variant="destructive" className="shadow-sm">
                -{discount}%
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary" className="shadow-sm">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 bg-white/80 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toast.success('Added to wishlist!');
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Quick Add to Cart */}
          {product.inStock && (
            <Button
              className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="mb-1 text-xs text-gray-500">{product.category}</p>
          <h3 className="mb-2 font-medium line-clamp-2">{product.name}</h3>
          
          {/* Rating */}
          <div className="mb-2 flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-lg">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
