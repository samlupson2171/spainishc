import Image from 'next/image';
import Link from 'next/link';
import LeadWizard from '@/components/LeadWizard';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center" style={{ backgroundImage: 'url(/images/lawyers-office-hero-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="bg-overlay" />
        <div className="r-container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <p className="text-[#c9a227] font-medium mb-4">Specialists in Property Conveyancing</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Partnering With a Select Portfolio of Experienced, <span className="text-[#c9a227]">Multi-lingual Law Firms</span>
              </h1>
              <p className="text-xl text-gray-200">
                We collaborate with Estate Agents/Autonomos across Spain, where we pay a referral fee for your clients you placed with one of our partner law firms
              </p>
            </div>
            <div>
              <LeadWizard />
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="section bg-gray-50">
        <div className="r-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/realestate-agent.jpg"
                alt="Real estate agent"
                width={600}
                height={700}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#c9a227]">
                About Us
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We are a Spain wide team, based on the Costa Del Sol, connecting one of our Abogados, as the best fit (eg language, source market/culture) for managing the legal elements of your client&apos;s property.
                </p>
                <p>
                  Spanish Conveyancing is a trading brand of Fountain Finances Ltd.
                </p>
                <p>
                  Fountain Finances are a 10 years old, UK FCA Registered Claims Management Company that also set up &apos;Claim in Spain&apos; (2024) to process 10&apos;s of thousands of Mis-sold Spanish Mortgages by Spanish Banks from 2000 to 2019 – specifically for expat Brits and other Europeans.
                </p>
                <p>
                  For the past 2 years, during our Spain wide expansion of the Claim in Spain business, we quickly qualified &amp; selected the best, to establish our portfolio of &apos;Spanish Conveyancing&apos; Lawyers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Do Our Portfolio of Lawyers Provide */}
      <section className="section bg-white">
        <div className="r-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">
              What Do Our Portfolio of <span className="text-[#c9a227]">Lawyers Provide?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4a] p-8 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-[#c9a227] rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Property Verification</h3>
              <p className="text-gray-300">Verification &amp; transfer of property ownership - check for outstanding mortgages or debts, planning permissions in order, ensure property is legally registered</p>
            </div>
            <div className="bg-gradient-to-br from-[#c9a227] to-[#d4af37] p-8 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={28} className="text-[#c9a227]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Contract Management</h3>
              <p className="text-white/90">Draft and review reservation &amp; private purchase contracts, ensuring terms are fair and protected</p>
            </div>
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4a] p-8 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-[#c9a227] rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Tax &amp; Registration</h3>
              <p className="text-gray-300">Obtain necessary NIE for foreign buyers, calculate, file, and pay relevant taxes, and handle the registration of title deeds</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's in it for Agents */}
      <section className="section bg-gray-50">
        <div className="r-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a2e]">
                What&apos;s in it for <span className="text-[#c9a227]">Agents?</span>
              </h2>
              <p className="text-gray-700 text-xl mb-8">
                Referral Fee = <span className="text-[#c9a227] font-bold">25%</span> of Lawyer&apos;s Conveyancing Fee (1%)
              </p>
              <p className="text-gray-600">
                Partner with us and earn commission on every successful referral. No upfront costs, no hidden fees - just straightforward earnings from your client introductions.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#c9a227]">
              <p className="text-[#c9a227] font-semibold text-sm uppercase tracking-wide mb-6">Example Calculation</p>
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Sale Value</span>
                  <span className="text-2xl font-bold text-[#1a1a2e]">€500k</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Conveyancing Fee (1%)</span>
                  <span className="text-2xl font-bold text-[#1a1a2e]">€5k</span>
                </div>
                <div className="flex justify-between items-center bg-[#c9a227]/10 -mx-8 px-8 py-6 rounded-b-xl">
                  <span className="text-[#1a1a2e] font-semibold">Your Referral Fee (25%)</span>
                  <span className="text-3xl font-bold text-[#c9a227]">€1,250</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Partner CTA Section */}
      <section className="relative py-32" style={{ backgroundImage: 'url(/images/real-estate-neighborhood-community-homes-2026-01-08-07-43-05-utc.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="absolute inset-0 bg-[#1a1a2e]/80" />
        <div className="r-container relative z-10 text-center">
          <p className="text-[#c9a227] font-medium mb-4">Ready to Partner?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto">
            Start Earning <span className="text-[#c9a227]">Commission</span> on Every Referral
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Join hundreds of Costa del Sol agents already partnering with us. First 50 get priority lawyer intros.
          </p>
          <Link href="/contact" className="btn-accent inline-flex items-center gap-2">
            Contact Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Bottom CTA with Form */}
      <section className="section bg-white">
        <div className="r-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a2e]">
                Get in <span className="text-[#c9a227]">Touch</span>
              </h2>
              <p className="text-gray-600 mb-6">
                Ready to start earning referral fees? Submit the form and we&apos;ll reach out to discuss how we can work together.
              </p>
            </div>
            <LeadWizard />
          </div>
        </div>
      </section>
    </>
  );
}
