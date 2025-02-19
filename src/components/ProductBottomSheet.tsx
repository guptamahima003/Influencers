"use client";

import { X, Heart, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Snackbar from './Snackbar';

interface ProductOption {
  type: 'color' | 'storage';
  name: string;
  values: {
    id: string;
    label: string;
    available: boolean;
    image?: string;
  }[];
}

interface ProductDetails {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  pickupDate: string;
  options: ProductOption[];
}

interface ProductBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetails;
}

export default function ProductBottomSheet({ isOpen, onClose, product }: ProductBottomSheetProps) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.options[0].values[0].id);
  const [selectedStorage, setSelectedStorage] = useState(product.options[1].values[0].id);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowSnackbar(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50">
        <div 
          className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-3xl overflow-hidden"
          style={{ 
            animation: 'slideUp 0.3s ease-out',
          }}
        >
          <style jsx>{`
            @keyframes slideUp {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
          `}</style>

          {/* Header */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <button onClick={onClose}>
                <X size={24} className="text-[#0077B6]/80 hover:text-[#0077B6]" />
              </button>
              <button className="p-2">
                <Heart size={24} className="text-[#0077B6]/80 hover:text-[#0077B6]" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[calc(85vh-180px)]">
            {/* Product Images */}
            <div className="relative aspect-square bg-gray-50">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-[#0077B6]">{product.title}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? 'text-[#FFD700]' : 'text-gray-200'}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviewCount})</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#0077B6]">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through">${product.originalPrice}</span>
                )}
              </div>

              {/* Pickup Info */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Pickup:</span>
                  <span>{product.pickupDate}</span>
                </div>
              </div>

              {/* Color Options */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-600">Color</span>
                  <ChevronDown size={20} className="text-gray-400" />
                </div>
                <div className="flex gap-3">
                  {product.options[0].values.map((color) => (
                    <button
                      key={color.id}
                      className={`w-12 h-12 rounded-full border-2 ${
                        selectedColor === color.id ? 'border-[#FFD700]' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedColor(color.id)}
                      disabled={!color.available}
                    >
                      {color.image && (
                        <div 
                          className="w-full h-full rounded-full overflow-hidden"
                          style={{ opacity: color.available ? 1 : 0.5 }}
                        >
                          <Image
                            src={color.image}
                            alt={color.label}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage Options */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-600">Storage</span>
                  <ChevronDown size={20} className="text-gray-400" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.options[1].values.map((storage) => (
                    <button
                      key={storage.id}
                      className={`p-3 rounded-lg border ${
                        selectedStorage === storage.id
                          ? 'border-[#FFD700] bg-[#FFD700]/10'
                          : 'border-gray-200'
                      } ${!storage.available ? 'opacity-50' : ''}`}
                      onClick={() => setSelectedStorage(storage.id)}
                      disabled={!storage.available}
                    >
                      <span className={`text-sm font-medium ${selectedStorage === storage.id ? 'text-[#FFD700]' : 'text-gray-400'}`}>
                        {storage.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Bottom CTAs */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 p-4 flex gap-3">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-[#0077B6] text-white py-3 rounded-lg font-medium hover:bg-[#0077B6]/90 transition-colors"
            >
              Add to Cart
            </button>
            <button 
              className="flex-1 bg-gray-100 text-[#0077B6] py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              See Details
            </button>
          </div>
        </div>
      </div>
      
      <Snackbar 
        message="Product added to cart!"
        isVisible={showSnackbar}
        onHide={() => setShowSnackbar(false)}
      />
    </>
  );
} 