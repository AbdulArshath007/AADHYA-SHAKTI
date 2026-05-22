import React from 'react';
import { createClient } from '@/lib/server';
import { SidebarNav } from '@/components/dashboard/SidebarNav';
import { SchemesClient } from '@/components/dashboard/SchemesClient';

// Pre-seeded high-fidelity government schemes for the initial load
const INITIAL_SCHEMES = [
  {
    id: "scheme-mudra",
    name: "Pradhan Mantri Mudra Yojana (PMMY) - Mahila Udyami Scheme",
    level: "Central" as const,
    category: "Business Loan",
    agency: "Ministry of Finance",
    benefits: "Collateral-free business loans up to ₹10 Lakhs with special interest concessions for women entrepreneurs.",
    eligibility: "Any woman entrepreneur who is a partner/proprietor in a micro/small business enterprise.",
    documents: "Identity Proof, Address Proof, Business License, 2-Year Balance Sheet, Project Report.",
    officialUrl: "https://www.mudra.org.in/",
    scrapedFrom: "india.gov.in (Cached)",
    deadline: "Dec 31, 2026",
  },
  {
    id: "scheme-standup",
    name: "Stand-Up India Scheme for Women Entrepreneurs",
    level: "Central" as const,
    category: "Entrepreneurship",
    agency: "Ministry of Finance",
    benefits: "Bank loans between ₹10 Lakhs and ₹1 Crore for setting up greenfield enterprises.",
    eligibility: "SC/ST and/or women entrepreneurs above 18 years of age. Company must have 51% female ownership.",
    documents: "Incorporation documents, project details, caste certificate (if applicable), KYC records.",
    officialUrl: "https://www.standupmitra.in/",
    scrapedFrom: "myscheme.gov.in (Cached)",
    deadline: "Open",
  },
  {
    id: "scheme-tread",
    name: "Trade Related Entrepreneurship Assistance and Development (TREAD)",
    level: "Central" as const,
    category: "Training & Subsidy",
    agency: "Ministry of Micro, Small and Medium Enterprises (MSME)",
    benefits: "Govt grant up to 30% of project cost, remaining 70% as loan from partner banks; includes capacity building.",
    eligibility: "Groups of women entrepreneurs organized through NGOs or SHGs.",
    documents: "NGO registration, proposed project profile, bank tie-up letters.",
    officialUrl: "https://msme.gov.in/",
    scrapedFrom: "india.gov.in (Cached)",
    deadline: "Oct 31, 2026",
  }
];

export default async function SchemesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative w-full">
      {/* LEFT COLUMN: Sidebar Navigation */}
      <aside className="hidden lg:block lg:col-span-3">
        <SidebarNav user={user || undefined} />
      </aside>

      {/* CENTER COLUMN: Schemes Portal (Takes remaining 9 columns since no right sidebar widget is needed) */}
      <main className="col-span-1 lg:col-span-9">
        <SchemesClient initialSchemes={INITIAL_SCHEMES} />
      </main>
    </div>
  );
}
