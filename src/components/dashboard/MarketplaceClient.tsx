'use client';

import React, { useState } from 'react';
import { Store, Plus, Search, Tag, ShoppingCart, User, MessageSquare, Check, X, ArrowLeft, Heart } from 'lucide-react';
import { BalloonsEffect } from '@/components/balloons-effect';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'Handcrafted' | 'Tech & Dev' | 'Consulting' | 'Art & Fashion';
  imageUrl: string;
  rating: number;
  seller: {
    name: string;
    avatarInitials: string;
    role: string;
    bio: string;
  };
  likes: number;
  likedByUser?: boolean;
}

interface MarketplaceClientProps {
  user?: {
    user_metadata?: {
      full_name?: string;
    };
    email?: string;
  };
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Terracotta Hand-Painted Clay Jewelry',
    description: 'Beautiful, eco-friendly terracotta jewelry set handcrafted with natural river silt clay and hand-painted in traditional vibrant Indian patterns. Each set includes a dual-strand necklace and matching stud earrings. Made with 100% organic colors and hypoallergenic metal hooks.',
    price: 35.00,
    category: 'Handcrafted',
    imageUrl: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    seller: {
      name: 'Aditi Deshmukh',
      avatarInitials: 'AD',
      role: 'Clay Artisan',
      bio: 'Crafting natural clay jewelry from my home workshop in Pune. I support five local women artisans through this business!'
    },
    likes: 42
  },
  {
    id: 'prod-2',
    title: 'SaaS Platform Next.js Admin Template',
    description: 'A premium, modern Next.js 15 template using Tailwind CSS 4, built specifically for women-led startups. Features pre-integrated charts, user authentication schemas, settings dashboards, interactive tables, and fully responsive glassmorphic interfaces. Clean TypeScript code with lifetime updates.',
    price: 79.00,
    category: 'Tech & Dev',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    seller: {
      name: 'Sneha Rao',
      avatarInitials: 'SR',
      role: 'Full Stack Dev',
      bio: 'Ex-Google software developer passionate about building lightweight, high-performance developer templates for female tech entrepreneurs.'
    },
    likes: 31
  },
  {
    id: 'prod-3',
    title: '1-on-1 Legal & IP Strategy Consultation',
    description: 'Get comprehensive legal counsel on company incorporation, trademark registration, intellectual property licensing, and contract drafts tailored specifically for new businesses. This package includes a 60-minute interactive live call, detailed roadmap notes, and contract templates.',
    price: 120.00,
    category: 'Consulting',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    rating: 5.0,
    seller: {
      name: 'Priyanka Sen',
      avatarInitials: 'PS',
      role: 'Corporate Counsel',
      bio: 'Practicing business attorney with 10+ years specializing in startup legal frameworks and intellectual property rights protection.'
    },
    likes: 56
  },
  {
    id: 'prod-4',
    title: 'Upcycled Organic Cotton Embroidered Tote',
    description: 'Stunning premium tote bag handcrafted from high-quality upcycled fabric remnants and embroidered with beautiful floral themes by rural women cooperatives. Sturdy double-stitched straps, roomy internal zipper pockets, and fully biodegradable. Carry your essentials sustainably!',
    price: 28.00,
    category: 'Art & Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    seller: {
      name: 'Radhika Patel',
      avatarInitials: 'RP',
      role: 'Eco-Fashion Designer',
      bio: 'Founder of EcoSutra. I combine sustainable materials with regional embroidery patterns to build beautiful, modern fashion items.'
    },
    likes: 29
  },
  {
    id: 'prod-5',
    title: 'Organic Herbal Hibiscus & Rose Bud Tea',
    description: 'Exquisite loose-leaf blend of organic red hibiscus petals, sun-dried rosebuds, and refreshing lemongrass grown ethically by small-scale women farming collectives. Naturally caffeine-free, packed with antioxidants, and rich in natural Vitamin C. Perfect hot or cold-brewed.',
    price: 18.00,
    category: 'Handcrafted',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    seller: {
      name: 'Meenakshi Iyer',
      avatarInitials: 'MI',
      role: 'Horticulturist',
      bio: 'Farming and sourcing organic, pesticide-free therapeutic herb blends while empowering smallholder women farming cooperatives.'
    },
    likes: 67
  }
];

export function MarketplaceClient({ user }: MarketplaceClientProps) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Modals state
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [triggerBalloons, setTriggerBalloons] = useState(false);
  
  // Contact state
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Form input state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState<'Handcrafted' | 'Tech & Dev' | 'Consulting' | 'Art & Fashion'>('Handcrafted');
  const [newImage, setNewImage] = useState('');

  const categories = ['All', 'Handcrafted', 'Tech & Dev', 'Consulting', 'Art & Fashion'];

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDescription || !newPrice) return;

    const fullName = user?.user_metadata?.full_name || 'Empowered Entrepreneur';
    const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'EE';

    // Premium fallback placeholder images based on category choice
    let imgUrl = newImage.trim();
    if (!imgUrl) {
      if (newCategory === 'Handcrafted') imgUrl = 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop&q=80';
      else if (newCategory === 'Tech & Dev') imgUrl = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80';
      else if (newCategory === 'Consulting') imgUrl = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80';
      else imgUrl = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80';
    }

    const createdProduct: Product = {
      id: `prod-${Date.now()}`,
      title: newTitle,
      description: newDescription,
      price: parseFloat(newPrice) || 10.00,
      category: newCategory,
      imageUrl: imgUrl,
      rating: 5.0,
      seller: {
        name: fullName,
        avatarInitials: initials,
        role: 'Community Partner',
        bio: 'Empowered AADHYA SHAKTI member supporting women-led commerce and mutual growth.'
      },
      likes: 0
    };

    setProducts([createdProduct, ...products]);
    setIsSellModalOpen(false);
    
    // Clear inputs
    setNewTitle('');
    setNewDescription('');
    setNewPrice('');
    setNewCategory('Handcrafted');
    setNewImage('');
  };

  const handleLikeProduct = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProducts(products.map(p => {
      if (p.id === id) {
        const liked = !p.likedByUser;
        return {
          ...p,
          likes: liked ? p.likes + 1 : p.likes - 1,
          likedByUser: liked
        };
      }
      return p;
    }));
  };

  const handleOrder = () => {
    setTriggerBalloons(true);
    setIsSuccessOpen(true);
    // Auto turn off balloons trigger so it can retrigger later
    setTimeout(() => {
      setTriggerBalloons(false);
    }, 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setIsContactOpen(false);
      setContactMessage('');
    }, 2000);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <BalloonsEffect trigger={triggerBalloons} />

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[var(--color-royal-heath-900)] via-[var(--color-royal-heath-800)] to-[var(--color-royal-heath-600)] text-white rounded-3xl p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-xl -ml-12 -mb-12"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              <Store className="w-3.5 h-3.5 text-[var(--color-royal-heath-200)]" />
              <span>AADHYA SHAKTI Bazaar</span>
            </div>
            <h1 className="font-serif text-3xl font-bold tracking-tight">Supporting Women-Led Businesses</h1>
            <p className="text-xs text-[var(--color-royal-heath-100)] font-medium leading-relaxed">
              Explore unique creations, specialized digital services, and targeted consulting designed by female founders, artisans, and professionals in our community. Buy directly to support women empowerment.
            </p>
          </div>
          <button
            onClick={() => setIsSellModalOpen(true)}
            className="self-start md:self-auto inline-flex items-center gap-2 bg-white text-[var(--color-royal-heath-950)] px-5 py-3 rounded-2xl text-xs font-bold hover:bg-[var(--color-royal-heath-50)] active:scale-98 transition-all shadow-lg hover:shadow-xl shrink-0"
          >
            <Plus className="w-4 h-4 text-[var(--color-royal-heath-600)]" />
            <span>List Your Product</span>
          </button>
        </div>
      </div>

      {/* Search & Filtering Tools */}
      <div className="bg-white rounded-2xl border border-[var(--color-royal-heath-200)] p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Custom Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-royal-heath-800)]/40" />
            <input
              placeholder="Search products, descriptions, or creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--color-royal-heath-200)] bg-[var(--color-royal-heath-50)]/40 text-xs text-[var(--color-royal-heath-950)] placeholder-[var(--color-royal-heath-800)]/40 focus:outline-none focus:border-[var(--color-royal-heath-400)] transition-all focus:bg-white"
            />
          </div>
          
          {/* Category Pill Filters */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  selectedCategory === category
                    ? 'bg-[var(--color-royal-heath-600)] text-white shadow-md shadow-[var(--color-royal-heath-200)]'
                    : 'bg-[var(--color-royal-heath-50)] text-[var(--color-royal-heath-800)] hover:bg-[var(--color-royal-heath-100)] border border-[var(--color-royal-heath-200)]/60'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl border border-[var(--color-royal-heath-200)] p-12 text-center text-[var(--color-royal-heath-800)]/70">
            <Store className="w-16 h-16 mx-auto mb-4 opacity-30 text-[var(--color-royal-heath-600)]" />
            <h3 className="font-serif text-lg font-bold text-[var(--color-royal-heath-950)] mb-1">No products found</h3>
            <p className="text-xs">We couldn't find matches for "{searchQuery}". Try searching other keywords or choose "All" categories!</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group bg-white border border-[var(--color-royal-heath-200)] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[var(--color-royal-heath-300)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Product Visual */}
              <div className="relative aspect-video w-full overflow-hidden bg-[var(--color-royal-heath-100)]/50 shrink-0">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[var(--color-royal-heath-800)] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[var(--color-royal-heath-200)] flex items-center gap-1 shadow-sm">
                  <Tag className="w-3 h-3 text-[var(--color-royal-heath-500)]" />
                  {product.category}
                </span>
                
                <button
                  onClick={(e) => handleLikeProduct(product.id, e)}
                  className={`absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full border border-[var(--color-royal-heath-100)] transition-transform hover:scale-110 active:scale-95 shadow-sm text-xs font-semibold flex items-center justify-center ${
                    product.likedByUser ? 'text-[var(--color-royal-heath-600)]' : 'text-[var(--color-royal-heath-800)]/60 hover:text-[var(--color-royal-heath-600)]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${product.likedByUser ? 'fill-[var(--color-royal-heath-600)] stroke-[var(--color-royal-heath-600)]' : ''}`} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[var(--color-royal-heath-800)]/60 font-semibold">
                    <span>by {product.seller.name.split(' ')[0]}</span>
                    <span className="flex items-center gap-0.5 text-amber-500 font-bold">★ {product.rating.toFixed(1)}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[var(--color-royal-heath-950)] leading-snug line-clamp-1 group-hover:text-[var(--color-royal-heath-700)] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-[var(--color-royal-heath-800)]/70 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-royal-heath-50)] shrink-0">
                  <div>
                    <p className="text-[10px] text-[var(--color-royal-heath-800)]/50 font-bold uppercase tracking-wider">Price</p>
                    <p className="text-base font-serif font-black text-[var(--color-royal-heath-900)]">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  
                  <span className="inline-flex items-center gap-1 text-[var(--color-royal-heath-600)] font-bold text-xs bg-[var(--color-royal-heath-50)] border border-[var(--color-royal-heath-200)]/70 px-3 py-1.5 rounded-xl group-hover:bg-[var(--color-royal-heath-600)] group-hover:text-white group-hover:border-transparent transition-all">
                    <span>View Detail</span>
                    <ShoppingCart className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= SELLER UPLOAD MODAL ================= */}
      {isSellModalOpen && (
        <div className="fixed inset-0 bg-[var(--color-royal-heath-950)]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 z-0" 
            onClick={() => setIsSellModalOpen(false)}
          ></div>
          
          <div className="bg-white border border-[var(--color-royal-heath-200)] w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--color-royal-heath-900)] to-[var(--color-royal-heath-700)] text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-[var(--color-royal-heath-200)]" />
                <h3 className="font-serif text-lg font-bold">List Your Creation</h3>
              </div>
              <button 
                onClick={() => setIsSellModalOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateProduct} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[var(--color-royal-heath-800)] uppercase tracking-wider">Product Name *</label>
                <input
                  required
                  placeholder="e.g. Handmade Terracotta Jewelry Set"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-royal-heath-200)] text-xs text-[var(--color-royal-heath-950)] bg-[var(--color-royal-heath-50)]/30 focus:outline-none focus:border-[var(--color-royal-heath-400)] transition-colors focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[var(--color-royal-heath-800)] uppercase tracking-wider">Price (USD) *</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g. 29.99"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-royal-heath-200)] text-xs text-[var(--color-royal-heath-950)] bg-[var(--color-royal-heath-50)]/30 focus:outline-none focus:border-[var(--color-royal-heath-400)] transition-colors focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[var(--color-royal-heath-800)] uppercase tracking-wider">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-royal-heath-200)] text-xs text-[var(--color-royal-heath-950)] bg-[var(--color-royal-heath-50)]/30 focus:outline-none focus:border-[var(--color-royal-heath-400)] transition-colors focus:bg-white"
                  >
                    <option value="Handcrafted">Handcrafted</option>
                    <option value="Tech & Dev">Tech & Dev</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Art & Fashion">Art & Fashion</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[var(--color-royal-heath-800)] uppercase tracking-wider">Image URL (Optional)</label>
                <input
                  placeholder="Paste high-res Unsplash image link or leave empty for template"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-royal-heath-200)] text-xs text-[var(--color-royal-heath-950)] bg-[var(--color-royal-heath-50)]/30 focus:outline-none focus:border-[var(--color-royal-heath-400)] transition-colors focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[var(--color-royal-heath-800)] uppercase tracking-wider">Product Description *</label>
                <textarea
                  required
                  placeholder="Provide deep descriptions detailing the craftsmanship, materials, scope of work, timeline, and delivery. Explain why your product represents authentic quality!"
                  rows={4}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-royal-heath-200)] text-xs text-[var(--color-royal-heath-950)] bg-[var(--color-royal-heath-50)]/30 focus:outline-none focus:border-[var(--color-royal-heath-400)] transition-colors focus:bg-white resize-none"
                ></textarea>
              </div>

              <div className="pt-2 shrink-0">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[var(--color-royal-heath-600)] to-[var(--color-royal-heath-500)] text-white py-3 rounded-xl text-xs font-bold hover:shadow-lg shadow-[var(--color-royal-heath-200)] transition-all hover:scale-101 active:scale-99 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  List Product Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= PRODUCT DETAIL MODAL ================= */}
      {selectedProduct && !isSuccessOpen && (
        <div className="fixed inset-0 bg-[var(--color-royal-heath-950)]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 z-0" 
            onClick={() => setSelectedProduct(null)}
          ></div>

          <div className="bg-white border border-[var(--color-royal-heath-200)] w-full max-w-3xl rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:h-[500px] animate-in zoom-in-95 duration-150">
            {/* Visual Column */}
            <div className="relative w-full md:w-1/2 bg-[var(--color-royal-heath-100)] h-48 md:h-full overflow-hidden shrink-0">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.title}
                className="object-cover w-full h-full"
              />
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[var(--color-royal-heath-800)] text-[10px] font-bold px-3 py-1 rounded-full border border-[var(--color-royal-heath-200)] flex items-center gap-1 shadow-sm">
                <Tag className="w-3.5 h-3.5 text-[var(--color-royal-heath-500)]" />
                {selectedProduct.category}
              </span>
            </div>

            {/* Info Column */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between overflow-y-auto space-y-6">
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="inline-flex items-center gap-1 text-[var(--color-royal-heath-800)] hover:text-[var(--color-royal-heath-950)] text-[10px] font-bold uppercase tracking-wider transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold text-xs">★ {selectedProduct.rating.toFixed(1)} rating</span>
                </div>
                
                <h2 className="font-serif text-lg md:text-xl font-bold text-[var(--color-royal-heath-950)] leading-tight">
                  {selectedProduct.title}
                </h2>
                
                <p className="text-xs text-[var(--color-royal-heath-800)]/70 leading-relaxed max-h-36 overflow-y-auto">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Seller Profile Slot */}
              <div className="bg-[var(--color-royal-heath-50)] border border-[var(--color-royal-heath-200)]/70 rounded-2xl p-4 flex items-start gap-3 shadow-inner">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[var(--color-royal-heath-100)] to-[var(--color-royal-heath-200)] flex items-center justify-center text-[var(--color-royal-heath-700)] font-serif font-bold shrink-0 shadow-sm border border-white">
                  {selectedProduct.seller.avatarInitials}
                </div>
                <div className="space-y-0.5 overflow-hidden">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-[var(--color-royal-heath-950)]">{selectedProduct.seller.name}</span>
                    <span className="text-[9px] font-bold text-[var(--color-royal-heath-600)] uppercase tracking-wider bg-white border border-[var(--color-royal-heath-200)] px-1.5 rounded">{selectedProduct.seller.role}</span>
                  </div>
                  <p className="text-[10px] text-[var(--color-royal-heath-800)]/80 italic leading-snug line-clamp-2 font-medium">"{selectedProduct.seller.bio}"</p>
                </div>
              </div>

              {/* Order checkout actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-royal-heath-200)]/50 shrink-0 gap-4">
                <div>
                  <p className="text-[10px] text-[var(--color-royal-heath-800)]/50 font-bold uppercase tracking-wider">Total Price</p>
                  <p className="text-xl md:text-2xl font-serif font-black text-[var(--color-royal-heath-900)]">
                    ${selectedProduct.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="p-3 bg-[var(--color-royal-heath-100)] text-[var(--color-royal-heath-800)] hover:text-[var(--color-royal-heath-950)] hover:bg-[var(--color-royal-heath-200)]/60 rounded-xl transition-all shadow-sm flex items-center justify-center"
                    title="Message Creator"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleOrder}
                    className="bg-gradient-to-r from-[var(--color-royal-heath-600)] to-[var(--color-royal-heath-500)] text-white px-6 py-3 rounded-xl text-xs font-bold hover:shadow-lg shadow-[var(--color-royal-heath-200)] transition-all hover:scale-103 active:scale-97 flex items-center gap-1.5"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Purchase Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PURCHASE SUCCESS CELEBRATION ================= */}
      {isSuccessOpen && (
        <div className="fixed inset-0 bg-[var(--color-royal-heath-950)]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-[var(--color-royal-heath-200)] w-full max-w-sm rounded-3xl p-8 shadow-2xl relative z-10 text-center space-y-6 flex flex-col items-center animate-in zoom-in-95 duration-150">
            <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100 shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-[var(--color-royal-heath-950)]">Purchase Successful!</h3>
              <p className="text-xs text-[var(--color-royal-heath-800)]/70 leading-relaxed px-2">
                Congratulations! Your payment has been simulated successfully. We have notified <span className="font-bold text-[var(--color-royal-heath-700)]">{selectedProduct?.seller.name}</span>, who will prepare your shipment or schedule your service immediately. Thank you for buying women-led!
              </p>
            </div>

            <button
              onClick={() => {
                setIsSuccessOpen(false);
                setSelectedProduct(null);
              }}
              className="bg-gradient-to-r from-[var(--color-royal-heath-600)] to-[var(--color-royal-heath-50)] text-white font-bold text-xs py-3 w-full rounded-xl hover:shadow-lg shadow-[var(--color-royal-heath-200)] transition-all hover:scale-101 shrink-0"
            >
              Back to Bazaar
            </button>
          </div>
        </div>
      )}

      {/* ================= CONTACT SELLER DRAWER ================= */}
      {isContactOpen && selectedProduct && (
        <div className="fixed inset-0 bg-[var(--color-royal-heath-950)]/40 backdrop-blur-sm z-55 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 z-0" 
            onClick={() => setIsContactOpen(false)}
          ></div>

          <div className="bg-white border border-[var(--color-royal-heath-200)] w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
            <div className="bg-gradient-to-r from-[var(--color-royal-heath-900)] to-[var(--color-royal-heath-700)] text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[var(--color-royal-heath-200)]" />
                <h3 className="font-serif text-sm font-bold">Inquiry for {selectedProduct.seller.name}</h3>
              </div>
              <button 
                onClick={() => setIsContactOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="p-6 space-y-4">
              {contactSuccess ? (
                <div className="py-8 text-center space-y-3 flex flex-col items-center">
                  <div className="h-12 w-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="font-bold text-xs text-[var(--color-royal-heath-950)]">Message Sent Successfully!</h4>
                  <p className="text-[10px] text-[var(--color-royal-heath-800)]/70">A notification has been sent. The creator will respond via your email slot.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[var(--color-royal-heath-800)] uppercase tracking-wider">Product Inquired</label>
                    <input
                      disabled
                      value={selectedProduct.title}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-royal-heath-200)] text-xs text-[var(--color-royal-heath-800)]/60 bg-[var(--color-royal-heath-50)]/50 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[var(--color-royal-heath-800)] uppercase tracking-wider">Your Message *</label>
                    <textarea
                      required
                      placeholder={`Hi ${selectedProduct.seller.name.split(' ')[0]}, I am interested in your listing! Let me know if...`}
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-royal-heath-200)] text-xs text-[var(--color-royal-heath-950)] bg-[var(--color-royal-heath-50)]/30 focus:outline-none focus:border-[var(--color-royal-heath-400)] transition-colors focus:bg-white resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[var(--color-royal-heath-600)] hover:bg-[var(--color-royal-heath-700)] text-white py-3 rounded-xl text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
