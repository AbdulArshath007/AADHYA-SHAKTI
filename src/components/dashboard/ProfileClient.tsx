'use client';

import React, { useState } from 'react';
import { UserCircle, Landmark, Shield, Mail, Phone, MapPin, Briefcase, FileText, Check, Save, Award, Settings, Activity, X } from 'lucide-react';
import { createClient } from '@/lib/client';

interface UserProfile {
  name: string;
  email: string;
  role: 'Mentor' | 'Learner';
  company: string;
  title: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
  startupName?: string;
  startupStage?: string;
  startupIndustry?: string;
  startupBio?: string;
}

interface ProfileClientProps {
  initialProfile: UserProfile;
}

export function ProfileClient({ initialProfile }: ProfileClientProps) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [activeTab, setActiveTab] = useState<'profile' | 'startup' | 'settings'>('profile');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Editable fields in state
  const [name, setName] = useState(profile.name);
  const [title, setTitle] = useState(profile.title);
  const [company, setCompany] = useState(profile.company);
  const [phone, setPhone] = useState(profile.phone);
  const [location, setLocation] = useState(profile.location);
  const [bio, setBio] = useState(profile.bio);
  const [skillsString, setSkillsString] = useState(profile.skills.join(', '));

  // Startup fields in state
  const [startupName, setStartupName] = useState(profile.startupName || '');
  const [startupStage, setStartupStage] = useState(profile.startupStage || 'Idea Stage');
  const [startupIndustry, setStartupIndustry] = useState(profile.startupIndustry || '');
  const [startupBio, setStartupBio] = useState(profile.startupBio || '');

  // Settings in state
  const [isAvailableAsMentor, setIsAvailableAsMentor] = useState(profile.role === 'Mentor');

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");

    try {
      const skillsList = skillsString
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: name,
          title,
          company,
          phone,
          location,
          bio,
          skills: skillsList,
          intent: isAvailableAsMentor ? 'teach' : 'learn'
        }
      });

      if (error) throw error;

      const updated: UserProfile = {
        ...profile,
        name,
        title,
        company,
        phone,
        location,
        bio,
        skills: skillsList,
        role: isAvailableAsMentor ? 'Mentor' : 'Learner'
      };

      setProfile(updated);
      setSaveStatus("success");

      setTimeout(() => {
        setSaveStatus(null);
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      console.error("Failed to save profile:", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleStartupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        data: {
          startupName,
          startupStage,
          startupIndustry,
          startupBio
        }
      });

      if (error) throw error;

      const updated: UserProfile = {
        ...profile,
        startupName,
        startupStage,
        startupIndustry,
        startupBio
      };

      setProfile(updated);
      setSaveStatus("success");

      setTimeout(() => {
        setSaveStatus(null);
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      console.error("Failed to save startup details:", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const initials = profile.name
    .split(' ')
    .map(n => n.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'E';

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Top Profile Card */}
      <div className="bg-white border border-[var(--color-royal-heath-200)] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
        {/* Profile Initials Avatar */}
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[var(--color-royal-heath-600)] to-[var(--color-royal-heath-800)] text-white flex items-center justify-center font-serif font-bold text-3xl shrink-0 shadow-md">
          {initials}
        </div>

        {/* User basic info */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="font-serif text-2xl font-bold text-[var(--color-royal-heath-950)]">{profile.name}</h1>
              <p className="text-sm text-[var(--color-royal-heath-800)] font-bold">
                {profile.title} at <span className="text-[var(--color-royal-heath-600)]">{profile.company}</span>
              </p>
            </div>
            <span className="bg-[var(--color-royal-heath-100)] border border-[var(--color-royal-heath-200)] text-[var(--color-royal-heath-800)] text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider self-center md:self-start w-fit">
              {profile.role} Profile
            </span>
          </div>

          <p className="text-xs text-[var(--color-royal-heath-800)]/80 leading-relaxed font-semibold">
            {profile.bio}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-semibold text-[var(--color-royal-heath-800)] pt-2">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[var(--color-royal-heath-400)]" />
              {profile.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-[var(--color-royal-heath-400)]" />
              {profile.email}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Stat metrics */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Feed Posts", value: 3, icon: FileText },
          { label: "Connections", value: 14, icon: UserCircle },
          { label: "Listed Products", value: 1, icon: Landmark }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-[var(--color-royal-heath-200)] rounded-2xl p-4 text-center shadow-sm space-y-1">
            <stat.icon className="w-4 h-4 text-[var(--color-royal-heath-500)] mx-auto mb-1" />
            <h4 className="text-xl font-bold text-[var(--color-royal-heath-950)] leading-none">{stat.value}</h4>
            <p className="text-[10px] font-bold text-[var(--color-royal-heath-850)]/70 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-[var(--color-royal-heath-200)] gap-1">
        {[
          { id: 'profile' as const, label: "Professional Profile", icon: Briefcase },
          { id: 'startup' as const, label: "My Startup Pitch", icon: Award },
          { id: 'settings' as const, label: "Settings", icon: Settings }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (saveStatus === null) setActiveTab(tab.id);
            }}
            className={`flex items-center gap-1.5 px-4 py-3 border-b-2 font-bold text-xs transition-all ${
              activeTab === tab.id
                ? 'border-[var(--color-royal-heath-600)] text-[var(--color-royal-heath-900)] bg-[var(--color-royal-heath-100)]/30'
                : 'border-transparent text-[var(--color-royal-heath-800)]/80 hover:text-[var(--color-royal-heath-950)] hover:bg-[var(--color-royal-heath-50)]/40'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Status Alert Notification */}
      {saveStatus && (
        <div className={`p-3 rounded-xl border text-xs flex items-center gap-3 animate-fade-in ${
          saveStatus === "saving"
            ? "bg-[var(--color-royal-heath-100)] border-[var(--color-royal-heath-200)] text-[var(--color-royal-heath-950)]"
            : saveStatus === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-950"
              : "bg-red-50 border-red-200 text-red-950"
        }`}>
          {saveStatus === "saving" ? (
            <div className="w-4 h-4 border-2 border-[var(--color-royal-heath-600)] border-t-transparent rounded-full animate-spin shrink-0"></div>
          ) : saveStatus === "success" ? (
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200 shadow-sm shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 border border-red-200 shadow-sm shrink-0">
              <X className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}
          <span className="font-bold">
            {saveStatus === "saving" 
              ? "Saving configuration changes to system database..." 
              : saveStatus === "success"
                ? "Account updates saved successfully!"
                : "Failed to update profile. Please try again."}
          </span>
        </div>
      )}

      {/* Tab Panels */}
      <div className="bg-white border border-[var(--color-royal-heath-200)] rounded-2xl p-6 shadow-sm">
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs font-semibold text-[var(--color-royal-heath-950)]">
            <h3 className="font-serif font-bold text-sm text-[var(--color-royal-heath-900)] border-b border-[var(--color-royal-heath-100)] pb-2 flex items-center gap-1.5">
              <Briefcase className="w-4.5 h-4.5 text-[var(--color-royal-heath-500)]" />
              General Professional Credentials
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Job Role / Professional Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Company / Venture Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Contact Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Skills & Expertises (comma separated)</label>
                <input
                  type="text"
                  value={skillsString}
                  onChange={(e) => setSkillsString(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Short Biography / Intro</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl focus:outline-none resize-none font-semibold"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--color-royal-heath-200)]/60">
              <button
                type="submit"
                disabled={saveStatus === "saving"}
                className="flex items-center gap-1.5 bg-[var(--color-royal-heath-600)] hover:bg-[var(--color-royal-heath-700)] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm"
              >
                <Save className="w-4 h-4" />
                Save Profile Details
              </button>
            </div>
          </form>
        )}

        {activeTab === 'startup' && (
          <form onSubmit={handleStartupSubmit} className="space-y-4 text-xs font-semibold text-[var(--color-royal-heath-950)]">
            <h3 className="font-serif font-bold text-sm text-[var(--color-royal-heath-900)] border-b border-[var(--color-royal-heath-100)] pb-2 flex items-center gap-1.5">
              <Award className="w-4.5 h-4.5 text-[var(--color-royal-heath-500)]" />
              Empowerment Business Pitch Profile
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Startup / Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. SheBuilds Textiles"
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Funding / Development Stage</label>
                <select
                  value={startupStage}
                  onChange={(e) => setStartupStage(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl focus:outline-none text-[var(--color-royal-heath-950)] font-semibold"
                >
                  <option value="Idea Stage">Idea Stage</option>
                  <option value="Prototype / MVP">Prototype / MVP</option>
                  <option value="Early Traction">Early Traction</option>
                  <option value="Seed Funded">Seed Funded</option>
                  <option value="Growth Stage">Growth / Profitable</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Industry Verticals</label>
              <input
                type="text"
                placeholder="e.g. E-Commerce, Handicrafts, Clean Energy"
                value={startupIndustry}
                onChange={(e) => setStartupIndustry(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-[var(--color-royal-heath-900)] uppercase tracking-wider">Startup Pitch / Business Bio</label>
              <textarea
                rows={4}
                placeholder="Describe your vision, product offerings, who your target customer is, and what resources you are seeking to scale your operations..."
                value={startupBio}
                onChange={(e) => setStartupBio(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--color-royal-heath-50)]/40 focus:bg-white border border-[var(--color-royal-heath-200)] focus:border-[var(--color-royal-heath-400)] rounded-xl focus:outline-none resize-none font-semibold"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--color-royal-heath-200)]/60">
              <button
                type="submit"
                disabled={saveStatus === "saving"}
                className="flex items-center gap-1.5 bg-[var(--color-royal-heath-600)] hover:bg-[var(--color-royal-heath-700)] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm"
              >
                <Save className="w-4 h-4" />
                Save Business Profile
              </button>
            </div>
          </form>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 text-xs text-[var(--color-royal-heath-950)] font-semibold">
            {/* Mentorship Settings */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-sm text-[var(--color-royal-heath-900)] border-b border-[var(--color-royal-heath-100)] pb-2 flex items-center gap-1.5">
                <Settings className="w-4.5 h-4.5 text-[var(--color-royal-heath-500)]" />
                Empowerment Directory Settings
              </h3>

              <div className="flex items-center justify-between p-4 bg-[var(--color-royal-heath-50)]/60 border border-[var(--color-royal-heath-100)] rounded-2xl shadow-inner">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm text-[var(--color-royal-heath-950)]">Available as Active Mentor</h4>
                  <p className="text-[10px] text-[var(--color-royal-heath-800)]/70 font-semibold">
                    Toggle to list your profile and skills in the public Mentorship Directory.
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={async () => {
                    const nextVal = !isAvailableAsMentor;
                    setSaveStatus("saving");
                    try {
                      const supabase = createClient();
                      const { error } = await supabase.auth.updateUser({
                        data: {
                          intent: nextVal ? 'teach' : 'learn'
                        }
                      });

                      if (error) throw error;

                      setIsAvailableAsMentor(nextVal);
                      setSaveStatus("success");
                      setTimeout(() => {
                        setSaveStatus(null);
                        window.location.reload();
                      }, 1500);
                    } catch (err: any) {
                      console.error("Failed to save settings details:", err);
                      setSaveStatus("error");
                      setTimeout(() => setSaveStatus(null), 3000);
                    }
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 shrink-0 ${
                    isAvailableAsMentor ? 'bg-[var(--color-royal-heath-600)]' : 'bg-gray-300'
                  }`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full transition-transform shadow-md ${
                    isAvailableAsMentor ? 'translate-x-5' : 'translate-x-0'
                  }`}></span>
                </button>
              </div>
            </div>

            {/* Account Security */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-sm text-[var(--color-royal-heath-900)] border-b border-[var(--color-royal-heath-100)] pb-2 flex items-center gap-1.5">
                <Shield className="w-4.5 h-4.5 text-[var(--color-royal-heath-500)]" />
                Account Authorization & Support
              </h3>
              
              <div className="p-4 border border-[var(--color-royal-heath-200)] rounded-xl space-y-2">
                <p className="text-[11px] text-[var(--color-royal-heath-850)] font-semibold">
                  Authentication and user data are managed securely via Supabase. If you wish to change your registered account email, password, or delete your credentials, please reach out to standard system administrators at <a href="mailto:support@aadhyashakti.org" className="text-[var(--color-royal-heath-600)] hover:underline font-bold">support@aadhyashakti.org</a>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
