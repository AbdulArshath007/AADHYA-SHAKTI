'use client';

import React, { useState, useEffect } from 'react';
import { Search, Landmark, Plus, ArrowRight, ShieldAlert, Sparkles, RefreshCw, Layers, ExternalLink, Calendar, Users, X, Info } from 'lucide-react';
import Image from 'next/image';

interface ScrapedScheme {
  id: string;
  name: string;
  level: 'Central' | 'State';
  location?: string;
  category: string;
  agency?: string;
  benefits?: string;
  eligibility?: string;
  documents?: string;
  officialUrl?: string;
  scrapedFrom?: string;
  deadline?: string;
  isLiveScraped?: boolean;
}

interface SchemesClientProps {
  initialSchemes: ScrapedScheme[];
}

export function SchemesClient({ initialSchemes }: SchemesClientProps) {
  const [schemes, setSchemes] = useState<ScrapedScheme[]>(initialSchemes);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLevel, setActiveLevel] = useState<'All' | 'Central' | 'State'>('All');
  
  // Scraper status states
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeMessage, setScrapeMessage] = useState<string | null>(null);
  const [scrapeSource, setScrapeSource] = useState<string | null>(null);

  // Selected scheme detail modal state
  const [selectedScheme, setSelectedScheme] = useState<ScrapedScheme | null>(null);

  // Custom scheme listing state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newScheme, setNewScheme] = useState({
    name: '',
    level: 'Central' as 'Central' | 'State',
    location: '',
    category: 'Entrepreneurship',
    agency: '',
    benefits: '',
    eligibility: '',
    documents: '',
    officialUrl: '',
    deadline: ''
  });

  const categories = ['All', 'Business Loan', 'Entrepreneurship', 'Skill Development', 'Financial Savings', 'Training & Subsidy', 'Welfare & Growth'];

  // Effect to perform an initial automated background soft-scrape check
  useEffect(() => {
    // If we only have fallback schemes, let's load live schemes immediately
    if (schemes.length <= 3) {
      handleScrape();
    }
  }, []);

  const handleScrape = async () => {
    setIsScraping(true);
    setScrapeMessage(null);
    setScrapeSource(null);
    
    try {
      const res = await fetch('/api/schemes/scrape?keyword=women');
      const json = await res.json();
      
      if (json.success && json.data) {
        setSchemes(json.data);
        setScrapeMessage(json.message);
        setScrapeSource(json.source);
        
        // Clear message after 6 seconds
        setTimeout(() => {
          setScrapeMessage(null);
        }, 6000);
      } else {
        throw new Error("Unable to read scraper data.");
      }
    } catch (err: any) {
      console.error(err);
      setScrapeMessage("Could not contact live crawler. Loaded cached portal repository.");
    } finally {
      setIsScraping(false);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScheme.name || !newScheme.benefits) return;

    const created: ScrapedScheme = {
      ...newScheme,
      id: `custom-${Date.now()}`,
      scrapedFrom: 'Empowerment Officer Board',
      isLiveScraped: false
    };

    setSchemes([created, ...schemes]);
    setIsCreateOpen(false);
    setNewScheme({
      name: '',
      level: 'Central',
      location: '',
      category: 'Entrepreneurship',
      agency: '',
      benefits: '',
      eligibility: '',
      documents: '',
      officialUrl: '',
      deadline: ''
    });
  };

  // Filter schemes logic
  const filteredSchemes = schemes.filter((s) => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (s.agency && s.agency.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.category && s.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.benefits && s.benefits.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    const matchesLevel = activeLevel === 'All' || s.level === activeLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-[var(--color-royal-heath-200)] shadow-md bg-gradient-to-r from-[var(--color-royal-heath-900)] to-[var(--color-royal-heath-750)] text-white p-6 sm:p-8 flex flex-col justify-between min-h-[160px]">
        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold w-fit text-[var(--color-royal-heath-50)]">
            <Landmark className="w-3.5 h-3.5" />
            Empowerment Scheme Directory
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">Authoritative Government Schemes</h1>
          <p className="text-sm text-[var(--color-royal-heath-100)]">
            Discover verified loans, skill initiatives, subsidies, and educational incentives aimed at women entrepreneurs and professionals in India.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-15 w-64 h-64 pointer-events-none transform translate-x-12 translate-y-12">
          <Landmark className="w-full h-full" />
        </div>
      </div>

      {/* Scraper Control Panel */}
      <div className="bg-white border border-[var(--color-royal-heath-200)] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-[var(--color-royal-heath-950)] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[var(--color-royal-heath-600)]" />
              Live Government Web Scraper
            </h3>
            <p className="text-xs text-[var(--color-royal-heath-800)]/70 font-medium">
              Crawl official platforms (<span className="font-semibold text-emerald-700">.gov.in</span>) in real-time for updated incentives.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleScrape}
              disabled={isScraping}
              className="flex items-center justify-center gap-2 bg-[var(--color-royal-heath-600)] hover:bg-[var(--color-royal-heath-700)] disabled:bg-[var(--color-royal-heath-300)] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScraping ? 'animate-spin' : ''}`} />
              {isScraping ? 'Crawling Portals...' : 'Sync Live Schemes'}
            </button>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center justify-center gap-1.5 border border-[var(--color-royal-heath-200)] bg-[var(--color-royal-heath-100)]/30 hover:bg-[var(--color-royal-heath-100)]/60 text-[var(--color-royal-heath-800)] hover:text-[var(--color-royal-heath-950)] text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Scheme
            </button>
          </div>
        </div>

        {/* Scrape Result Info banner */}
        {scrapeMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-xl p-3 flex items-start gap-3 animate-fade-in text-xs">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">{scrapeMessage}</p>
              {scrapeSource && (
                <p className="text-[10px] text-emerald-800 font-medium mt-0.5">
                  Source database: <span className="font-bold underline">{scrapeSource}</span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white border border-[var(--color-royal-heath-200)] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-royal-heath-800)]/50 pointer-events-none" />
            <input
              type="text"
              placeholder="Search scheme name, benefit, eligibility..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-royal-heath-50)]/40 hover:bg-[var(--color-royal-heath-50)]/70 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] focus:ring-1 focus:ring-[var(--color-royal-heath-400)] rounded-xl text-sm placeholder-[var(--color-royal-heath-800)]/50 focus:outline-none transition-all font-medium text-[var(--color-royal-heath-950)]"
            />
          </div>

          {/* Level Switch (All / Central / State) */}
          <div className="flex border border-[var(--color-royal-heath-200)] rounded-xl p-1 bg-[var(--color-royal-heath-50)]/50 w-fit shrink-0 self-start md:self-auto">
            {(['All', 'Central', 'State'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setActiveLevel(level)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeLevel === level
                    ? 'bg-white text-[var(--color-royal-heath-900)] shadow-sm'
                    : 'text-[var(--color-royal-heath-800)]/70 hover:text-[var(--color-royal-heath-950)]'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal scrollable Category pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 -mx-4 px-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all border ${
                activeCategory === cat
                  ? 'bg-[var(--color-royal-heath-600)] border-[var(--color-royal-heath-600)] text-white shadow-sm'
                  : 'bg-white border-[var(--color-royal-heath-200)] text-[var(--color-royal-heath-800)]/80 hover:bg-[var(--color-royal-heath-100)]/30 hover:text-[var(--color-royal-heath-950)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid Display */}
      {filteredSchemes.length === 0 ? (
        <div className="bg-white border border-[var(--color-royal-heath-200)] rounded-2xl py-12 px-6 text-center shadow-sm space-y-3">
          <Landmark className="w-12 h-12 text-[var(--color-royal-heath-200)] mx-auto" />
          <h4 className="font-serif font-bold text-lg text-[var(--color-royal-heath-950)]">No Schemes Found</h4>
          <p className="text-sm text-[var(--color-royal-heath-800)]/70 max-w-md mx-auto">
            Try adjusting your search criteria, selecting another category, or launching a new sync run on the government web scraper.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme) => (
            <div 
              key={scheme.id}
              onClick={() => setSelectedScheme(scheme)}
              className="bg-white border border-[var(--color-royal-heath-200)] rounded-2xl p-5 hover:border-[var(--color-royal-heath-400)] hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold bg-[var(--color-royal-heath-100)] text-[var(--color-royal-heath-800)] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {scheme.level}{scheme.location ? `: ${scheme.location}` : ''}
                    </span>
                    <span className="text-[10px] font-extrabold bg-[var(--color-royal-heath-50)] text-[var(--color-royal-heath-700)] border border-[var(--color-royal-heath-100)] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {scheme.category}
                    </span>
                  </div>
                  {scheme.isLiveScraped && (
                    <span className="text-[9px] font-extrabold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md uppercase border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Live
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-[var(--color-royal-heath-950)] leading-snug group-hover:text-[var(--color-royal-heath-600)] transition-colors line-clamp-2">
                  {scheme.name}
                </h3>

                {scheme.agency && (
                  <p className="text-xs text-[var(--color-royal-heath-800)] font-semibold truncate flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[var(--color-royal-heath-400)] shrink-0" />
                    {scheme.agency}
                  </p>
                )}

                {scheme.benefits && (
                  <p className="text-xs text-[var(--color-royal-heath-800)]/80 line-clamp-2 mt-2 leading-relaxed">
                    {scheme.benefits}
                  </p>
                )}
              </div>

              <div className="border-t border-[var(--color-royal-heath-200)]/60 mt-4 pt-4 flex items-center justify-between">
                <span className="text-xs text-[var(--color-royal-heath-800)] font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[var(--color-royal-heath-400)]" />
                  {scheme.deadline ? `Due: ${scheme.deadline}` : 'Open / Always Active'}
                </span>
                <span className="text-xs font-bold text-[var(--color-royal-heath-600)] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Inspect & Apply
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Scheme Detail Drawer Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[var(--color-royal-heath-200)] rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--color-royal-heath-900)] to-[var(--color-royal-heath-750)] text-white p-6 relative">
              <button 
                onClick={() => setSelectedScheme(null)}
                className="absolute right-4 top-4 p-1.5 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/25 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedScheme.level} Scheme
                </span>
                {selectedScheme.location && (
                  <span className="bg-white/20 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedScheme.location}
                  </span>
                )}
                <span className="bg-[var(--color-royal-heath-600)]/80 text-[var(--color-royal-heath-50)] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-[var(--color-royal-heath-400)]">
                  {selectedScheme.category}
                </span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold pr-8 leading-snug">{selectedScheme.name}</h2>
              {selectedScheme.agency && (
                <p className="text-xs text-[var(--color-royal-heath-100)] opacity-90 font-medium mt-1">
                  Nodal Authority: {selectedScheme.agency}
                </p>
              )}
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1 text-sm text-[var(--color-royal-heath-950)]">
              {/* Benefits */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-[var(--color-royal-heath-900)] flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[var(--color-royal-heath-600)]" />
                  Key Benefits & Incentives
                </h4>
                <p className="bg-[var(--color-royal-heath-50)]/60 border border-[var(--color-royal-heath-100)] rounded-xl p-3.5 font-medium leading-relaxed">
                  {selectedScheme.benefits}
                </p>
              </div>

              {/* Eligibility */}
              {selectedScheme.eligibility && (
                <div className="space-y-1.5">
                  <h4 className="font-bold text-[var(--color-royal-heath-900)] flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <Users className="w-4 h-4 text-[var(--color-royal-heath-600)]" />
                    Who is Eligible?
                  </h4>
                  <p className="leading-relaxed pl-1 font-medium text-[var(--color-royal-heath-900)]">
                    {selectedScheme.eligibility}
                  </p>
                </div>
              )}

              {/* Required Documents */}
              {selectedScheme.documents && (
                <div className="space-y-1.5">
                  <h4 className="font-bold text-[var(--color-royal-heath-900)] flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <Layers className="w-4 h-4 text-[var(--color-royal-heath-600)]" />
                    Required Documentation
                  </h4>
                  <p className="text-[var(--color-royal-heath-800)]/90 leading-relaxed font-semibold pl-1">
                    {selectedScheme.documents}
                  </p>
                </div>
              )}

              {/* Scraped Info tag */}
              <div className="flex items-center gap-2 border-t border-[var(--color-royal-heath-200)]/60 pt-4 text-xs font-semibold text-[var(--color-royal-heath-800)]/70">
                <span>Verification Source:</span>
                <span className="font-bold text-[var(--color-royal-heath-900)] bg-[var(--color-royal-heath-100)]/50 px-2 py-0.5 rounded border border-[var(--color-royal-heath-200)]/50">
                  {selectedScheme.scrapedFrom || 'Official Government Directory'}
                </span>
                {selectedScheme.deadline && (
                  <>
                    <span className="mx-1">•</span>
                    <span>Deadline: <span className="font-bold text-red-700">{selectedScheme.deadline}</span></span>
                  </>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-4 border-t border-[var(--color-royal-heath-200)] bg-[var(--color-royal-heath-50)]/50 flex items-center justify-end gap-2.5">
              <button 
                onClick={() => setSelectedScheme(null)}
                className="px-4 py-2 border border-[var(--color-royal-heath-200)] rounded-xl text-xs font-bold text-[var(--color-royal-heath-800)] hover:text-[var(--color-royal-heath-950)] hover:bg-white transition-colors"
              >
                Close details
              </button>
              {selectedScheme.officialUrl && (
                <a 
                  href={selectedScheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-[var(--color-royal-heath-600)] hover:bg-[var(--color-royal-heath-700)] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-colors"
                >
                  Apply on Official Site
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Scheme Modal (Admin/Empowerment Officer Panel) */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[var(--color-royal-heath-200)] rounded-2xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-scale-in">
            {/* Header */}
            <div className="p-5 border-b border-[var(--color-royal-heath-200)] flex items-center justify-between bg-[var(--color-royal-heath-50)]/50">
              <h3 className="font-serif font-bold text-lg text-[var(--color-royal-heath-950)] flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[var(--color-royal-heath-600)]" />
                Empowerment Officer: Add Scheme
              </h3>
              <button 
                onClick={() => setIsCreateOpen(false)}
                className="p-1 hover:bg-[var(--color-royal-heath-200)] rounded-full text-[var(--color-royal-heath-800)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleCreateSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-sm">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Scheme Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyadarshini Indira Loan Yojana"
                  value={newScheme.name}
                  onChange={(e) => setNewScheme({ ...newScheme, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 hover:bg-[var(--color-royal-heath-50)]/70 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] focus:ring-1 focus:ring-[var(--color-royal-heath-400)] rounded-xl placeholder-[var(--color-royal-heath-800)]/40 focus:outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Scheme Level</label>
                  <select
                    value={newScheme.level}
                    onChange={(e) => setNewScheme({ ...newScheme, level: e.target.value as 'Central' | 'State' })}
                    className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] focus:ring-1 focus:ring-[var(--color-royal-heath-400)] rounded-xl focus:outline-none font-semibold text-[var(--color-royal-heath-950)]"
                  >
                    <option value="Central">Central Govt</option>
                    <option value="State">State Govt</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Location / State</label>
                  <input
                    type="text"
                    placeholder="e.g. Maharashtra (if State)"
                    disabled={newScheme.level === 'Central'}
                    value={newScheme.location}
                    onChange={(e) => setNewScheme({ ...newScheme, location: e.target.value })}
                    className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl placeholder-[var(--color-royal-heath-800)]/40 focus:outline-none font-medium disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Category</label>
                  <select
                    value={newScheme.category}
                    onChange={(e) => setNewScheme({ ...newScheme, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] focus:ring-1 focus:ring-[var(--color-royal-heath-400)] rounded-xl focus:outline-none font-semibold text-[var(--color-royal-heath-950)]"
                  >
                    <option value="Business Loan">Business Loan</option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                    <option value="Skill Development">Skill Development</option>
                    <option value="Financial Savings">Financial Savings</option>
                    <option value="Training & Subsidy">Training & Subsidy</option>
                    <option value="Welfare & Growth">Welfare & Growth</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Deadline / Closes</label>
                  <input
                    type="text"
                    placeholder="e.g. Oct 15, 2026 or Open"
                    value={newScheme.deadline}
                    onChange={(e) => setNewScheme({ ...newScheme, deadline: e.target.value })}
                    className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl placeholder-[var(--color-royal-heath-800)]/40 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Administering Agency</label>
                <input
                  type="text"
                  placeholder="e.g. Ministry of Women & Child Development"
                  value={newScheme.agency}
                  onChange={(e) => setNewScheme({ ...newScheme, agency: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl placeholder-[var(--color-royal-heath-800)]/40 focus:outline-none font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Key Benefits *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Summarize financial aid, loan amounts, interest concession..."
                  value={newScheme.benefits}
                  onChange={(e) => setNewScheme({ ...newScheme, benefits: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl placeholder-[var(--color-royal-heath-800)]/40 focus:outline-none font-medium resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Eligibility Criteria</label>
                <textarea
                  rows={2}
                  placeholder="Who is eligible to apply for this incentive..."
                  value={newScheme.eligibility}
                  onChange={(e) => setNewScheme({ ...newScheme, eligibility: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl placeholder-[var(--color-royal-heath-800)]/40 focus:outline-none font-medium resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Official Portal URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newScheme.officialUrl}
                    onChange={(e) => setNewScheme({ ...newScheme, officialUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl placeholder-[var(--color-royal-heath-800)]/40 focus:outline-none font-medium"
                  />
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Documents Required</label>
                  <input
                    type="text"
                    placeholder="Aadhaar, income certificate..."
                    value={newScheme.documents}
                    onChange={(e) => setNewScheme({ ...newScheme, documents: e.target.value })}
                    className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl placeholder-[var(--color-royal-heath-800)]/40 focus:outline-none font-medium"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="border-t border-[var(--color-royal-heath-200)]/60 pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 border border-[var(--color-royal-heath-200)] rounded-xl text-xs font-bold text-[var(--color-royal-heath-800)] hover:bg-[var(--color-royal-heath-50)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[var(--color-royal-heath-600)] hover:bg-[var(--color-royal-heath-700)] text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
