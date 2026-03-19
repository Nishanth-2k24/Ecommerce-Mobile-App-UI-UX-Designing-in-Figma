import { useState } from 'react';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { SlidersHorizontal } from 'lucide-react';

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'rating'>('default');

  const filteredProducts = products
    .filter((product) => selectedCategory === 'All' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-800 text-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl">
              Discover Amazing Products
            </h1>
            <p className="mb-8 text-lg md:text-xl text-gray-200">
              Shop the latest trends with exclusive deals and free shipping on orders over $50
            </p>
            <Button size="lg" variant="secondary">
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Filters and Categories */}
      <section className="sticky top-16 z-40 border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          {/* Categories */}
          <div className="mb-4 md:mb-0">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="inline-flex h-auto flex-wrap justify-start bg-transparent p-0 gap-2">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="rounded-full px-4 py-2 data-[state=active]:bg-black data-[state=active]:text-white"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Sort and Filter */}
          <div className="flex items-center justify-between pt-4 border-t md:border-0 md:pt-0">
            <p className="text-sm text-gray-500">
              {filteredProducts.length} products
            </p>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-black focus:outline-none"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
