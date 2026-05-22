'use client';

import React, { useState } from 'react';
import { Search, Users, Sparkles, UserPlus, Heart, MessageSquare, Send, Check, Star, Shield, ArrowRight, X } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  reviewsCount: number;
  expertise: string[];
  bio: string;
  avatarInitials: string;
  bgGradient: string;
  availableSlots: number;
}

interface MentorshipClientProps {
  initialMentors: Mentor[];
}

export function MentorshipClient({ initialMentors }: MentorshipClientProps) {
  const [mentors, setMentors] = useState<Mentor[]>(initialMentors);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Connect request modal state
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [pitchMessage, setPitchMessage] = useState('');
  const [requestSentStatus, setRequestSentStatus] = useState<string | null>(null);

  // Onboard mentor modal state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [newMentor, setNewMentor] = useState({
    name: '',
    role: '',
    company: '',
    expertiseString: '',
    bio: '',
    availableSlots: 2
  });

  const categories = ['All', 'Tech & Engineering', 'Entrepreneurship', 'Venture Capital', 'Product Design', 'Marketing', 'Finance & Law'];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMentor.name || !newMentor.role || !newMentor.company || !newMentor.bio) return;

    const expertiseList = newMentor.expertiseString
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const initials = newMentor.name
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'M';

    const royalHeathGradients = [
      'from-[var(--color-royal-heath-500)] to-[var(--color-royal-heath-700)]',
      'from-[var(--color-royal-heath-600)] to-[var(--color-royal-heath-850)]',
      'from-[var(--color-royal-heath-400)] to-[var(--color-royal-heath-650)]'
    ];
    const chosenGradient = royalHeathGradients[Math.floor(Math.random() * royalHeathGradients.length)];

    const created: Mentor = {
      id: `mentor-${Date.now()}`,
      name: newMentor.name,
      role: newMentor.role,
      company: newMentor.company,
      rating: 5.0,
      reviewsCount: 1,
      expertise: expertiseList.length > 0 ? expertiseList : ['Mentorship', 'General business'],
      bio: newMentor.bio,
      avatarInitials: initials,
      bgGradient: chosenGradient,
      availableSlots: Number(newMentor.availableSlots) || 2
    };

    setMentors([created, ...mentors]);
    setIsRegisterOpen(false);
    setNewMentor({
      name: '',
      role: '',
      company: '',
      expertiseString: '',
      bio: '',
      availableSlots: 2
    });
  };

  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitchMessage.trim() || !selectedMentor) return;

    setRequestSentStatus("sending");
    
    // Simulate API delay for match validation
    setTimeout(() => {
      setRequestSentStatus("success");
      
      // Update available slots of mentor in state
      setMentors(mentors.map(m => {
        if (m.id === selectedMentor.id) {
          return { ...m, availableSlots: Math.max(0, m.availableSlots - 1) };
        }
        return m;
      }));

      // Close modal after success animation completes
      setTimeout(() => {
        setSelectedMentor(null);
        setPitchMessage('');
        setRequestSentStatus(null);
      }, 2500);

    }, 1500);
  };

  // Filter mentors logic
  const filteredMentors = mentors.filter((m) => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = activeCategory === 'All' || 
      (activeCategory === 'Tech & Engineering' && m.expertise.some(e => ['software', 'tech', 'engineering', 'frontend', 'ai', 'cloud', 'architecture'].some(x => e.toLowerCase().includes(x)))) ||
      (activeCategory === 'Entrepreneurship' && m.expertise.some(e => ['startups', 'business', 'growth', 'entrepreneurship', 'scaling'].some(x => e.toLowerCase().includes(x)))) ||
      (activeCategory === 'Venture Capital' && m.expertise.some(e => ['funding', 'vc', 'raising capital', 'investment', 'finance'].some(x => e.toLowerCase().includes(x)))) ||
      (activeCategory === 'Product Design' && m.expertise.some(e => ['ui/ux', 'design', 'product management', 'ux'].some(x => e.toLowerCase().includes(x)))) ||
      (activeCategory === 'Marketing' && m.expertise.some(e => ['marketing', 'seo', 'branding', 'sales'].some(x => e.toLowerCase().includes(x)))) ||
      (activeCategory === 'Finance & Law' && m.expertise.some(e => ['finance', 'tax', 'accounting', 'legal', 'compliance'].some(x => e.toLowerCase().includes(x))));

    return matchesSearch && (activeCategory === 'All' || matchesCategory);
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-[var(--color-royal-heath-200)] shadow-md bg-gradient-to-r from-[var(--color-royal-heath-900)] to-[var(--color-royal-heath-750)] text-white p-6 sm:p-8 flex flex-col justify-between min-h-[160px]">
        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold w-fit text-[var(--color-royal-heath-50)]">
            <Users className="w-3.5 h-3.5" />
            Empowered Connections Hub
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">Mentorship Directory</h1>
          <p className="text-sm text-[var(--color-royal-heath-100)]">
            Find female leaders, tech executives, and veteran entrepreneurs offering collateral-free mentorship to accelerate your professional roadmap.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-15 w-64 h-64 pointer-events-none transform translate-x-12 translate-y-12">
          <Users className="w-full h-full" />
        </div>
      </div>

      {/* Quick onboard bar */}
      <div className="bg-white border border-[var(--color-royal-heath-200)] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-[var(--color-royal-heath-950)] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[var(--color-royal-heath-600)]" />
            Support Other Sisters
          </h3>
          <p className="text-xs text-[var(--color-royal-heath-800)]/70 font-medium">
            Are you an experienced professional? Share your knowledge by offering active mentorship.
          </p>
        </div>
        <button
          onClick={() => setIsRegisterOpen(true)}
          className="flex items-center justify-center gap-2 bg-[var(--color-royal-heath-600)] hover:bg-[var(--color-royal-heath-700)] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm shrink-0"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Join as Mentor
        </button>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white border border-[var(--color-royal-heath-200)] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-royal-heath-800)]/50 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, company, role, or skillset..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-royal-heath-50)]/40 hover:bg-[var(--color-royal-heath-50)]/70 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] focus:ring-1 focus:ring-[var(--color-royal-heath-400)] rounded-xl text-sm placeholder-[var(--color-royal-heath-800)]/50 focus:outline-none transition-all font-medium text-[var(--color-royal-heath-950)]"
            />
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

      {/* Mentors Grid Display */}
      {filteredMentors.length === 0 ? (
        <div className="bg-white border border-[var(--color-royal-heath-200)] rounded-2xl py-12 px-6 text-center shadow-sm space-y-3">
          <Users className="w-12 h-12 text-[var(--color-royal-heath-200)] mx-auto" />
          <h4 className="font-serif font-bold text-lg text-[var(--color-royal-heath-950)]">No Mentors Found</h4>
          <p className="text-sm text-[var(--color-royal-heath-800)]/70 max-w-md mx-auto">
            Try adjusting your search query or selecting a different expertise category pill.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => (
            <div 
              key={mentor.id}
              className="bg-white border border-[var(--color-royal-heath-200)] rounded-2xl p-5 hover:border-[var(--color-royal-heath-400)] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Profile Card Header */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${mentor.bgGradient} text-white flex items-center justify-center font-serif font-bold shrink-0 shadow-sm text-sm`}>
                    {mentor.avatarInitials}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-serif font-bold text-base text-[var(--color-royal-heath-950)] leading-snug truncate">
                      {mentor.name}
                    </h3>
                    <p className="text-xs text-[var(--color-royal-heath-800)] font-semibold truncate leading-tight mt-0.5">
                      {mentor.role} at <span className="text-[var(--color-royal-heath-900)] font-bold">{mentor.company}</span>
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="flex items-center gap-0.5 text-xs font-extrabold text-[var(--color-royal-heath-800)]">
                        <Star className="w-3.5 h-3.5 fill-[var(--color-royal-heath-500)] text-[var(--color-royal-heath-500)]" />
                        {mentor.rating.toFixed(1)}
                      </span>
                      <span className="text-[10px] text-[var(--color-royal-heath-800)]/60 font-semibold">
                        ({mentor.reviewsCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio text */}
                <p className="text-xs text-[var(--color-royal-heath-800)]/80 leading-relaxed line-clamp-3">
                  {mentor.bio}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5">
                  {mentor.expertise.map((exp, idx) => (
                    <span 
                      key={idx}
                      className="text-[9px] font-extrabold bg-[var(--color-royal-heath-50)] text-[var(--color-royal-heath-700)] border border-[var(--color-royal-heath-100)] px-2 py-0.5 rounded-md uppercase tracking-wider"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom stats and button */}
              <div className="border-t border-[var(--color-royal-heath-200)]/60 mt-4 pt-4 flex items-center justify-between">
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  mentor.availableSlots > 0 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    : 'bg-red-50 text-red-700 border border-red-100'
                }`}>
                  {mentor.availableSlots > 0 ? `${mentor.availableSlots} Slots Available` : 'Fully Booked'}
                </span>
                
                <button
                  disabled={mentor.availableSlots === 0}
                  onClick={() => setSelectedMentor(mentor)}
                  className="flex items-center gap-1 text-xs font-bold text-[var(--color-royal-heath-600)] hover:text-[var(--color-royal-heath-700)] disabled:text-[var(--color-royal-heath-300)] transition-colors"
                >
                  Request Connection
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Connect request Modal Overlay */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[var(--color-royal-heath-200)] rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--color-royal-heath-900)] to-[var(--color-royal-heath-750)] text-white p-5 relative">
              <button 
                onClick={() => {
                  if (requestSentStatus !== "sending" && requestSentStatus !== "success") {
                    setSelectedMentor(null);
                  }
                }}
                disabled={requestSentStatus === "sending" || requestSentStatus === "success"}
                className="absolute right-4 top-4 p-1.5 hover:bg-white/20 rounded-full text-white transition-colors disabled:opacity-30"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="font-serif text-lg font-bold pr-8 leading-snug">Connect with {selectedMentor.name}</h2>
              <p className="text-xs text-[var(--color-royal-heath-100)] opacity-95 mt-1 font-semibold">
                {selectedMentor.role} at {selectedMentor.company}
              </p>
            </div>

            {/* Form / State view */}
            <div className="p-6">
              {requestSentStatus === null && (
                <form onSubmit={handleConnectSubmit} className="space-y-4">
                  <p className="text-xs text-[var(--color-royal-heath-800)] leading-relaxed font-semibold">
                    Explain what challenges you are currently facing (e.g. business launch, code debug, fundraising) and why you would love {selectedMentor.name} to guide you.
                  </p>
                  
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Your Pitch Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Hi! I am working on building a greenfield commerce platform and would love your guidance on scaling backend architectures..."
                      value={pitchMessage}
                      onChange={(e) => setPitchMessage(e.target.value)}
                      className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 hover:bg-[var(--color-royal-heath-50)]/70 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] focus:ring-1 focus:ring-[var(--color-royal-heath-400)] rounded-xl placeholder-[var(--color-royal-heath-800)]/40 focus:outline-none font-medium resize-none text-xs text-[var(--color-royal-heath-950)]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedMentor(null)}
                      className="px-4 py-2 border border-[var(--color-royal-heath-200)] rounded-xl text-xs font-bold text-[var(--color-royal-heath-800)] hover:bg-[var(--color-royal-heath-50)] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!pitchMessage.trim()}
                      className="flex items-center gap-1.5 bg-[var(--color-royal-heath-600)] hover:bg-[var(--color-royal-heath-700)] disabled:bg-[var(--color-royal-heath-300)] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Send Pitch
                    </button>
                  </div>
                </form>
              )}

              {requestSentStatus === "sending" && (
                <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="w-10 h-10 border-2 border-[var(--color-royal-heath-600)] border-t-transparent rounded-full animate-spin"></div>
                  <h4 className="font-bold text-sm text-[var(--color-royal-heath-950)]">Validating Profile Match...</h4>
                  <p className="text-xs text-[var(--color-royal-heath-800)]/70">Connecting with network servers, sending credentials...</p>
                </div>
              )}

              {requestSentStatus === "success" && (
                <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center animate-scale-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200 shadow-sm">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[var(--color-royal-heath-950)]">Request Sent Successfully!</h4>
                    <p className="text-xs text-emerald-800 font-semibold mt-1">
                      Connection successfully created in system dashboard.
                    </p>
                  </div>
                  <p className="text-[11px] text-[var(--color-royal-heath-800)]/70 max-w-xs leading-normal">
                    {selectedMentor.name} has been notified and will receive your pitch via dashboard. Keep an eye on your notifications!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Become a mentor Onboarding Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[var(--color-royal-heath-200)] rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl animate-scale-in">
            {/* Header */}
            <div className="p-5 border-b border-[var(--color-royal-heath-200)] flex items-center justify-between bg-[var(--color-royal-heath-50)]/50">
              <h3 className="font-serif font-bold text-base text-[var(--color-royal-heath-950)] flex items-center gap-2">
                <Users className="w-5 h-5 text-[var(--color-royal-heath-600)]" />
                Onboard as AADHYA SHAKTI Mentor
              </h3>
              <button 
                onClick={() => setIsRegisterOpen(false)}
                className="p-1 hover:bg-[var(--color-royal-heath-200)] rounded-full text-[var(--color-royal-heath-800)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form fields */}
            <form onSubmit={handleRegisterSubmit} className="p-5 space-y-4 text-xs font-medium">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Aggarwal"
                  value={newMentor.name}
                  onChange={(e) => setNewMentor({ ...newMentor, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 hover:bg-[var(--color-royal-heath-50)]/70 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] focus:ring-1 focus:ring-[var(--color-royal-heath-400)] rounded-xl placeholder-[var(--color-royal-heath-800)]/40 focus:outline-none text-[var(--color-royal-heath-950)] font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Current Role/Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VP of Product"
                    value={newMentor.role}
                    onChange={(e) => setNewMentor({ ...newMentor, role: e.target.value })}
                    className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl placeholder-[var(--color-royal-heath-800)]/40 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Company/Startup *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ShopClues"
                    value={newMentor.company}
                    onChange={(e) => setNewMentor({ ...newMentor, company: e.target.value })}
                    className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl placeholder-[var(--color-royal-heath-800)]/40 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Key Expertise (Comma separated) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UI/UX, Product Management, Seed Funding"
                  value={newMentor.expertiseString}
                  onChange={(e) => setNewMentor({ ...newMentor, expertiseString: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl placeholder-[var(--color-royal-heath-800)]/40 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Short Bio / Introductory Pitch *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell potential mentees about your career highlights and what topics you love to help with..."
                  value={newMentor.bio}
                  onChange={(e) => setNewMentor({ ...newMentor, bio: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl placeholder-[var(--color-royal-heath-800)]/40 focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Monthly Mentorship Availability Slots *</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={5}
                  value={newMentor.availableSlots}
                  onChange={(e) => setNewMentor({ ...newMentor, availableSlots: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl focus:outline-none"
                />
              </div>

              {/* Form Buttons */}
              <div className="border-t border-[var(--color-royal-heath-200)]/60 pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(false)}
                  className="px-4 py-2 border border-[var(--color-royal-heath-200)] rounded-xl text-xs font-bold text-[var(--color-royal-heath-800)] hover:bg-[var(--color-royal-heath-50)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[var(--color-royal-heath-600)] hover:bg-[var(--color-royal-heath-700)] text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
                >
                  Register Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
