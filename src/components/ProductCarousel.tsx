"use client";

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import Snackbar from './Snackbar';

interface Product {
  id: string;
  title: string;
  images: string[];
  price: number;
  category: string;
}

const products: Product[] = [
  {
    id: '1',
    title: 'Ray-Ban Meta - Skyler smart glasses with Meta AI',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80'],
    price: 299,
    category: 'smartphones'
  },
  {
    id: '2',
    title: 'iPhone 15 Pro Max - Natural Titanium',
    images: ['https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80'],
    price: 1199,
    category: 'smartphones'
  },
  {
    id: '3',
    title: 'MacBook Pro 16" M3 Max',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80'],
    price: 2499,
    category: 'laptops'
  },
  {
    id: '4',
    title: 'Sony WH-1000XM5 Wireless Headphones',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80'],
    price: 399,
    category: 'headphones'
  },
  {
    id: '5',
    title: 'Canon EOS R5 Mirrorless Camera',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80'],
    price: 3899,
    category: 'cameras'
  },
  {
    id: '6',
    title: 'LG C3 65" OLED evo Smart TV',
    images: ['https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80'],
    price: 1999,
    category: 'tvs'
  },
  {
    id: '7',
    title: 'PlayStation 5 Digital Edition',
    images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80'],
    price: 499,
    category: 'gaming'
  },
  {
    id: '8',
    title: 'Samsung Galaxy S24 Ultra',
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80'],
    price: 1299,
    category: 'smartphones'
  },
  {
    id: '9',
    title: 'Dell XPS 15 OLED',
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80'],
    price: 2199,
    category: 'laptops'
  },
  {
    id: '10',
    title: 'AirPods Pro (2nd Generation)',
    images: ['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80'],
    price: 249,
    category: 'headphones'
  }
];

interface ProductCarouselProps {
  category: string;
}

export default function ProductCarousel({ category }: ProductCarouselProps) {
  const { addToCart } = useCart();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryProducts = products.filter(product => product.category === category);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      images: product.images,
      quantity: 1
    });
    setShowSnackbar(true);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Scroll Buttons */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-colors"
      >
        <ChevronLeft size={24} className="text-[#030303]" />
      </button>
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-colors"
      >
        <ChevronRight size={24} className="text-[#030303]" />
      </button>

      {/* Products Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 py-4 px-2 scrollbar-hide snap-x snap-mandatory"
      >
        {categoryProducts.map((product) => (
          <div 
            key={product.id}
            className="flex-none w-[280px] snap-start bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative h-[150px] bg-gray-50">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 280px, 33vw"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            <div className="p-4">
              <h3 className="text-[#030303] font-medium text-sm line-clamp-2">
                {product.title}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[#030303] font-bold">
                  ${product.price}
                </span>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="bg-[#00B4D8] text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#0077B6] transition-colors"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Snackbar 
        message="Product added to cart!"
        isVisible={showSnackbar}
        onHide={() => setShowSnackbar(false)}
      />
    </div>
  );
} 