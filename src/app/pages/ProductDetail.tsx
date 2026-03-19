import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Heart, ShoppingCart, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-2xl">Product not found</h1>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, { color: selectedColor, size: selectedSize });
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {discount > 0 && (
              <Badge variant="destructive" className="absolute left-4 top-4">
                -{discount}%
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={() => toast.success('Added to wishlist!')}
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="rounded-lg bg-white p-6 md:p-8">
              <Badge variant="outline" className="mb-4">
                {product.category}
              </Badge>

              <h1 className="mb-4 text-3xl md:text-4xl">{product.name}</h1>

              {/* Rating */}
              <div className="mb-4 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-400">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6 flex items-baseline gap-3">
                <span className="text-3xl font-semibold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <Separator className="my-6" />

              {/* Description */}
              <p className="mb-6 text-gray-600">{product.description}</p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="mb-3 block font-medium">
                    Color: <span className="text-gray-600">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-md border-2 px-4 py-2 text-sm transition-colors ${
                          selectedColor === color
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="mb-3 block font-medium">
                    Size: <span className="text-gray-600">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-md border-2 px-4 py-2 text-sm transition-colors ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="mb-3 block font-medium">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-md border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 border-x">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  {!product.inStock && (
                    <Badge variant="secondary">Out of Stock</Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="flex-1"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  Buy Now
                </Button>
              </div>

              <Separator className="my-6" />

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-gray-400" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <span>1 year warranty included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
