import Image from 'next/image';
import Link from 'next/link';
import LeadWizard from '@/components/LeadWizard';
import { CheckCircle, ArrowRight, DollarSign, Users, Instagram, Building, Award } from 'lucide-react';

export const metadata = {
  title: 'For Agents | Spanish Conveyancing',
  description: 'Estate agents: earn 20-25% commission on conveyancing referrals. Target 3,500+ Costa del Sol agents. No upfront costs.',
};

export default function AgentsPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[50vh] flex items-center" style={{ backgroundImage: 'url(/images/portrait-of-handsome-young-businessman-standing-2026-01-08-06-03-31-utc.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="bg-overlay" />
        <div className="r-container relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">For Agents</h1>
          <nav className="text-white/80">
            <Link href="/" className="hover:text-[#c9a227]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#c9a227]">For Agents</span>
          </nav>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="r-container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#c9a227] font-medium mb-2">Autonomos & Agencies</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a2e]">
              Stop Chasing <span className="text-[#c9a227]">Lawyers</span>
            </h2>
            <p className="text-gray-600 text-lg">
              We deliver vetted pros + your commission cut. Target: 3,500+ Costa agents/influencers.
            </p>
          </div>
        </div>
      </section>

      {/* Commission Model */}
      <section className="bg-[#1a1a2e] py-16">
        <div className="r-container">
          <div className="text-center mb-12">
            <p className="text-[#c9a227] font-medium mb-2">Your Earnings</p>
            <h3 className="text-3xl font-bold text-white">Commission Model</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 p-8 rounded-lg text-center">
              <DollarSign className="text-[#c9a227] mx-auto mb-4" size={40} />
              <p className="text-4xl font-bold text-[#c9a227] mb-2">20%</p>
              <p className="text-white font-medium mb-2">Standard Commission</p>
              <p className="text-gray-400 text-sm">Of 1% fee on sale price</p>
              <p className="text-[#c9a227] mt-4">€3,500 on €350k sale</p>
            </div>

            <div className="bg-[#c9a227] p-8 rounded-lg text-center transform scale-105">
              <Award className="text-white mx-auto mb-4" size={40} />
              <p className="text-4xl font-bold text-white mb-2">25%</p>
              <p className="text-white font-medium mb-2">Premium Tier</p>
              <p className="text-white/80 text-sm">For €1m+ properties</p>
              <p className="text-white mt-4">Higher effective share</p>
            </div>

            <div className="bg-white/10 p-8 rounded-lg text-center">
              <Users className="text-[#c9a227] mx-auto mb-4" size={40} />
              <p className="text-4xl font-bold text-[#c9a227] mb-2">Flexible</p>
              <p className="text-white font-medium mb-2">Multi-Listing</p>
              <p className="text-gray-400 text-sm">Loyalty bonuses available</p>
              <p className="text-[#c9a227] mt-4">Paid post-notary</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Outreach */}
      <section className="section">
        <div className="r-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#c9a227] font-medium mb-2">How We Find Partners</p>
              <h3 className="text-2xl font-bold mb-6 text-[#1a1a2e]">
                Our <span className="text-[#c9a227]">Outreach</span> Strategy
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#c9a227] rounded-full flex items-center justify-center">
                      <Instagram className="text-white" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Instagram @spanishconveyancing</h4>
                    <p className="text-gray-600">DMing hundreds—dozens re-following, calls booked.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#c9a227] rounded-full flex items-center justify-center">
                      <Building className="text-white" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Property Portals</h4>
                    <p className="text-gray-600">Kyero, Properstar—50+ initial contacts.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#c9a227] rounded-full flex items-center justify-center">
                      <Users className="text-white" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Face-to-Face</h4>
                    <p className="text-gray-600">Marbella, Fuengirola, Estepona, Mijas—ongoing meets.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/multiracial-group-of-business-people-having-a-brea-2026-01-08-05-40-35-utc.JPG"
                alt="Business meeting"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sweet Spot Partners */}
      <section className="section bg-gray-50">
        <div className="r-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[#c9a227] font-medium mb-2">Ideal Partners</p>
            <h3 className="text-2xl font-bold text-[#1a1a2e]">
              Sweet Spot <span className="text-[#c9a227]">Partners</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-[#c9a227]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="text-[#c9a227]" size={28} />
              </div>
              <h4 className="font-bold mb-2">Engel & Völkers Autonomos</h4>
              <p className="text-gray-600 text-sm">Independent agents within premium networks</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-[#c9a227]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-[#c9a227]" size={28} />
              </div>
              <h4 className="font-bold mb-2">Mid-Tier Shops</h4>
              <p className="text-gray-600 text-sm">2-3 location agencies looking to scale</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-[#c9a227]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-[#c9a227]" size={28} />
              </div>
              <h4 className="font-bold mb-2">Independents</h4>
              <p className="text-gray-600 text-sm">Reselling multi-agency listings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="r-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#c9a227] font-medium mb-2">Why Partner With Us</p>
              <h3 className="text-2xl font-bold mb-6 text-[#1a1a2e]">
                Agent <span className="text-[#c9a227]">Benefits</span>
              </h3>

              <ul className="space-y-4">
                {[
                  'Exclusive access to vetted lawyers',
                  'Priority handling for your clients',
                  'Flexible commission tiers',
                  'No upfront costs—pay from closings',
                  'Multi-listing loyalty bonuses',
                  'Fast closings, professional service',
                  'Multilingual support team',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-[#c9a227] flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#1a1a2e] p-8 rounded-lg text-white">
              <h4 className="text-xl font-bold mb-4">Get Started Today</h4>
              <p className="text-gray-300 mb-6">
                Call us or submit the form. First 50 get priority intros.
              </p>
              <div className="space-y-4">
                <a href="tel:+34693777466" className="block bg-[#c9a227] text-white text-center py-3 rounded font-medium hover:bg-[#b8921f] transition-colors">
                  Call Now: +34 693 777 466
                </a>
                <Link href="/contact" className="block border border-[#c9a227] text-[#c9a227] text-center py-3 rounded font-medium hover:bg-[#c9a227] hover:text-white transition-colors">
                  Contact Form
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA with Form */}
      <section className="section bg-gray-50">
        <div className="r-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#c9a227] font-medium mb-2">Ready to Earn?</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a2e]">
                Request a <span className="text-[#c9a227]">Callback</span>
              </h2>
              <p className="text-gray-600 mb-6">
                Join hundreds of Costa del Sol agents already partnering with us. Submit your details and we&apos;ll call you back.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <CheckCircle className="text-green-500" size={20} />
                <span>First 50 agents get priority lawyer intros</span>
              </div>
            </div>
            <LeadWizard />
          </div>
        </div>
      </section>
    </>
  );
}
