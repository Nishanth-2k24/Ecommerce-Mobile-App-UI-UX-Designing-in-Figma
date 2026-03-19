import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

export function Cart() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const totalPrice = getTotalPrice();
  const shipping = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md rounded-lg bg-white p-12 text-center">
            <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h2 className="mb-2 text-2xl">Your cart is empty</h2>
            <p className="mb-6 text-gray-500">
              Start adding some products to your cart!
            </p>
            <Button onClick={() => navigate('/')}>Continue Shopping</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl">Shopping Cart</h1>
            <Button
              variant="ghost"
              onClick={() => {
                clearCart();
                toast.success('Cart cleared');
              }}
            >
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                className="rounded-lg bg-white p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link
                    to={`/product/${item.id}`}
                    className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 sm:h-32 sm:w-32"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            to={`/product/${item.id}`}
                            className="font-medium hover:underline"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.category}
                          </p>
                          {(item.selectedColor || item.selectedSize) && (
                            <p className="mt-1 text-sm text-gray-500">
                              {item.selectedColor && `Color: ${item.selectedColor}`}
                              {item.selectedColor && item.selectedSize && ' • '}
                              {item.selectedSize && `Size: ${item.selectedSize}`}
                            </p>
                          )}
                        </div>
                        <p className="font-semibold">${item.price}</p>
                      </div>
                    </div>

                    {/* Quantity and Remove */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-md border">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.success('Removed from cart');
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                {totalPrice < 50 && (
                  <p className="text-xs text-gray-500">
                    Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                  </p>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button className="mt-6 w-full" size="lg" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>

              <p className="mt-4 text-center text-xs text-gray-500">
                Secure checkout with SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
