"use client";

import CategoryCard from './CategoryCard';

const categories = [
  {
    title: "Smartphones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80",
    slug: "smartphones",
    influencerCount: 24
  },
  {
    title: "Laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80",
    slug: "laptops",
    influencerCount: 18
  },
  {
    title: "Cameras",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    slug: "cameras",
    influencerCount: 15
  },
  {
    title: "Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    slug: "headphones",
    influencerCount: 21
  },
  {
    title: "TVs",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
    slug: "tvs",
    influencerCount: 12
  },
  {
    title: "Gaming",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    slug: "gaming",
    influencerCount: 27
  }
];

export default function CategorySection() {
  return (
    <div className="py-6 px-4">
      <h2 className="text-[#030303] font-bold text-lg mb-4">
        Follow Our Top Influencers
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            {...category}
          />
        ))}
      </div>
    </div>
  );
} 