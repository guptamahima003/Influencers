"use client";

import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  title: string;
  image: string;
  slug: string;
  influencerCount: number;
}

export default function CategoryCard({ title, image, slug, influencerCount }: CategoryCardProps) {
  return (
    <Link 
      href={`/category/${slug}`}
      className="group relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover group-hover:scale-110 transition-transform duration-300"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <p className="text-white/80 text-sm">{influencerCount} influencers</p>
      </div>
    </Link>
  );
} 