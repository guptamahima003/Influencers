"use client";

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, UserPlus } from 'lucide-react';
import ProductCarousel from '../../../components/ProductCarousel';

interface Influencer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  category: string;
  bio: string;
}

// Mock data - replace with real data in production
const influencers: Influencer[] = [
  {
    id: '1',
    name: "Tech Review Pro",
    username: "@techreviewpro",
    avatar: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&q=80",
    followers: 125000,
    category: "smartphones",
    bio: "Reviewing the latest in mobile tech. Your go-to source for smartphone insights."
  },
  {
    id: '2',
    name: "Mobile Maven",
    username: "@mobilemaven",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    followers: 89000,
    category: "smartphones",
    bio: "Smartphone photography expert. Helping you capture life's moments."
  },
  {
    id: '3',
    name: "Laptop Legend",
    username: "@laptoplegend",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    followers: 156000,
    category: "laptops",
    bio: "Your guide to the best laptops for work and play."
  },
  {
    id: '4',
    name: "Gaming Guru",
    username: "@gamingguru",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    followers: 234000,
    category: "gaming",
    bio: "Professional gamer sharing the best gaming setups and reviews."
  },
  {
    id: '5',
    name: "Camera Creative",
    username: "@cameracreative",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80",
    followers: 92000,
    category: "cameras",
    bio: "Professional photographer reviewing the latest camera gear."
  },
  {
    id: '6',
    name: "Audio Expert",
    username: "@audioexpert",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
    followers: 78000,
    category: "headphones",
    bio: "Audiophile and music producer. Testing the best headphones for you."
  },
  {
    id: '7',
    name: "TV Tech",
    username: "@tvtech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    followers: 112000,
    category: "tvs",
    bio: "Home theater enthusiast. Bringing cinema quality to your living room."
  },
  {
    id: '8',
    name: "Smart Home Sage",
    username: "@smarthomesage",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    followers: 143000,
    category: "smartphones",
    bio: "Making homes smarter, one device at a time."
  }
];

export default function CategoryPage() {
  const params = useParams();
  const { slug } = params;
  
  const categoryInfluencers = influencers.filter(inf => inf.category === slug);

  return (
    <main className="h-screen overflow-y-auto bg-gradient-to-b from-[#F8FDFF] to-[#E3F8FF]">
      <div className="w-full min-h-full pb-20">
        {/* Header - Make it sticky */}
        <div className="sticky top-0 z-20 bg-white shadow-sm">
          <div className="px-4 py-3 flex items-center gap-4">
            <Link href="/" className="text-[#0077B6] hover:text-[#00B4D8]">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-[#0077B6] font-bold text-xl capitalize">
              {slug?.toString().replace('-', ' ')} Experts
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-8">
          {categoryInfluencers.length > 0 ? (
            categoryInfluencers.map((influencer) => (
              <div key={influencer.id} className="space-y-4">
                {/* Influencer Card */}
                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={influencer.avatar}
                      alt={influencer.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                      priority
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#0077B6]">{influencer.name}</h3>
                    <p className="text-sm text-[#0077B6]/60">{influencer.username}</p>
                    <p className="text-sm text-[#0077B6]/80 mt-1">
                      {influencer.followers.toLocaleString()} followers
                    </p>
                    <p className="text-sm text-[#0077B6]/80 mt-1">{influencer.bio}</p>
                  </div>
                  <button className="bg-[#00B4D8] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#0077B6] transition-colors">
                    <UserPlus size={18} />
                    <span>Follow</span>
                  </button>
                </div>

                {/* Product Carousel */}
                <div className="ml-4">
                  <h4 className="text-[#0077B6] font-medium mb-2">
                    {influencer.name}'s Recommended Products
                  </h4>
                  <ProductCarousel category={slug as string} />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-[#0077B6]/60 text-lg">
                No influencers found for this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 