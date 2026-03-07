import Image from 'next/image';
import Link from 'next/link';
import LeadWizard from '@/components/LeadWizard';
import { FileCheck, Scale, Users, Building, FileText, Landmark, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Services | Spanish Conveyancing',
  description: 'Streamlined Spanish conveyancing for estate agents. Standard 1% fee, 20-25% agent commission. NIE verification, due diligence, notary prep, and more.',
};

const services = [
  { icon: FileCheck, title: 'NIE Verification & Bank Setup', desc: 'Complete NIE processing and Spanish bank account setup for your clients.' },
  { icon: Scale, title: 'Due Diligence', desc: 'Comprehensive title checks, debt verification, and planning compliance.' },
  { icon: Building, title: 'Valuation & Financing', desc: 'Property valuation support and financing approval assistance.' },
  { icon: FileText, title: 'Contract Preparation', desc: 'Private sales agreements and all legal documentation.' },
  { icon: Landmark, title: 'Notary & Signing', desc: 'Full notary preparation and signing coordination.' },
  { icon: Users, title: 'Tax Clearance', desc: 'Plusvalía, ITP, and all tax-related processing.' },
];

const processSteps = [
  { num: '01', title: 'NIE Verification & Bank Setup', desc: 'If needed, we handle all NIE and banking requirements.' },
  { num: '02', title: 'Due Diligence', desc: 'Title checks, debts, planning verification—all covered.' },
  { num: '03', title: 'Valuation & Financing', desc: 'Property valuation and financing approval support.' },
  { num: '04', title: 'Contracts', desc: 'Private sales agreement preparation and review.' },
  { num: '05', title: 'Notary Prep & Signing', desc: 'Complete notary coordination and signing.' },
  { num: '06', title: 'Tax Clearance', desc: 'Plusvalía, ITP, and all tax processing.' },
  { num: '07', title: 'Key Handover & Registration', desc: 'Final handover and property registration.' },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[50vh] flex items-center" style={{ backgroundImage: 'url(/images/female-lawyer-stamping-document-2026-01-09-06-26-15-utc.JPG)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="bg-overlay" />
        <div className="r-container relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
          <nav className="text-white/80">
            <Link href="/" className="hover:text-[#c9a227]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#c9a227]">Services</span>
          </nav>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="r-container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#c9a227] font-medium mb-2">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a2e]">
              Streamlined Spanish <span className="text-[#c9a227]">Conveyancing</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Standard 1% fee on sale price (negotiable to 0.85% with NIE/bank account; lower for high-value properties). Our vetted lawyers handle everything—your 20-25% commission post-notary.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section pt-0">
        <div className="r-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="card-service p-8 relative pt-16">
                <div className="icon-box absolute -top-6 left-8">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#c9a227] mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7-Step Process */}
      <section className="relative py-20" style={{ backgroundImage: 'url(/images/businesswoman-person-s-hand-stamping-with-approved-2026-01-09-07-21-48-utc.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="bg-overlay-2" />
        <div className="r-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="text-white">
              <p className="text-[#c9a227] font-medium mb-2">Our Process</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                7-Step <span className="text-[#c9a227]">Conveyancing</span> Process
              </h2>
              <p className="text-gray-300 mb-8">
                From initial verification to key handover, we manage every step of the Spanish property transaction.
              </p>

              <div className="space-y-6">
                {processSteps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 border-2 border-[#c9a227] flex items-center justify-center">
                        <span className="text-[#c9a227] font-bold">{step.num}</span>
                      </div>
                      {i < processSteps.length - 1 && (
                        <div className="w-0.5 h-8 bg-[#c9a227] mx-auto mt-2" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{step.title}</h4>
                      <p className="text-gray-400 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <Image
                src="/images/social-worker-approving-agreement-for-client-2026-01-07-07-09-13-utc.jpg"
                alt="Legal process"
                width={600}
                height={800}
                className="rounded-lg"
              />
              <div className="absolute bottom-8 right-8 bg-white p-6 rounded-lg max-w-xs">
                <p className="text-gray-600 italic">
                  &quot;Our lawyers ensure every document is executed properly and ethically.&quot;
                </p>
                <p className="text-[#c9a227] font-medium mt-2">— Spanish Conveyancing Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lawyer Portfolio */}
      <section className="section">
        <div className="r-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[#c9a227] font-medium mb-2">Our Network</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1a1a2e]">
              Vetted <span className="text-[#c9a227]">Lawyer</span> Portfolio
            </h2>
            <p className="text-gray-600">
              All lawyers agree to 50/50 fee split with us (your share from our cut).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#c9a227] text-white p-8 rounded-lg">
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded">Primary Partner</span>
              <h3 className="text-2xl font-bold mt-4 mb-2">Lawbird</h3>
              <p className="font-medium mb-4">Antonio Flores</p>
              <p className="text-white/90">
                Costa del Sol specialist, English-raised Spanish team covering all languages. 15-strong multilingual team. Introduced via industry contacts.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Fairway Lawyers', person: 'Diego Echavarria', area: 'Marbella focus' },
                { name: 'Costa Luz Lawyers', person: 'Maria de Castro', area: 'Algeciras backup' },
                { name: 'Granada Legal', person: 'Jose Castillo', area: 'Andalusia extension' },
              ].map((lawyer, i) => (
                <div key={i} className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="font-bold text-[#1a1a2e]">{lawyer.name}</h4>
                  <p className="text-[#c9a227]">{lawyer.person}</p>
                  <p className="text-gray-600 text-sm">{lawyer.area}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agent Benefits */}
      <section className="section bg-gray-50">
        <div className="r-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#c9a227] font-medium mb-2">For Agents</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a2e]">
                Agent <span className="text-[#c9a227]">Benefits</span>
              </h2>
              <ul className="space-y-4">
                {[
                  'Exclusive access to vetted lawyers',
                  'Priority handling for your clients',
                  'Flexible commission tiers',
                  'No upfront costs—pay from closings',
                  'Multi-listing loyalty bonuses',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-[#c9a227] flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link href="/agents" className="btn-accent inline-flex items-center gap-2 mt-8">
                Learn More <ArrowRight size={18} />
              </Link>
            </div>
            <LeadWizard />
          </div>
        </div>
      </section>
    </>
  );
}
