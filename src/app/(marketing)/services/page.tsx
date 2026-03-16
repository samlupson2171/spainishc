import Link from 'next/link';
import LeadWizard from '@/components/LeadWizard';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Services | Spanish Conveyancing',
  description: 'Full suite of Spanish property conveyancing services - legal searches, contract negotiation, document preparation, mortgage assistance, NIE application, and property clearance.',
};

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

      {/* Services Section */}
      <section className="section bg-gray-50">
        <div className="r-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-6">
              Our <span className="text-[#c9a227]">Services</span>
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Based on the Costa del Sol, but offering Spain wide services, Spanish Conveyancing provides a full suite of legal services for your Spanish property investment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#c9a227]">
              <div className="w-14 h-14 bg-[#c9a227] rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1a1a2e]">Legal Searches</h3>
              <p className="text-gray-600">Conducting thorough legal searches on the property and the seller to identify any potential issues.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#c9a227]">
              <div className="w-14 h-14 bg-[#c9a227] rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1a1a2e]">Contract Negotiation</h3>
              <p className="text-gray-600">Negotiating terms and conditions of the purchase to ensure compliance with Spanish laws.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#c9a227]">
              <div className="w-14 h-14 bg-[#c9a227] rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1a1a2e]">Document Preparation</h3>
              <p className="text-gray-600">Preparing all necessary documents and coordinating with the Notary Public for a seamless completion process.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#c9a227]">
              <div className="w-14 h-14 bg-[#c9a227] rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1a1a2e]">Mortgage Assistance</h3>
              <p className="text-gray-600">Assisting in obtaining a mortgage loan if needed.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#c9a227]">
              <div className="w-14 h-14 bg-[#c9a227] rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1a1a2e]">NIE Application</h3>
              <p className="text-gray-600">Securing your NIE (Número de Identificación de Extranjeros) for foreign buyers.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#c9a227]">
              <div className="w-14 h-14 bg-[#c9a227] rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1a1a2e]">Property Clearance</h3>
              <p className="text-gray-600">Ensuring the property is free of encumbrances, occupants, and outstanding taxes.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4a] rounded-2xl p-8 md:p-12 text-center">
            <p className="text-white text-xl mb-4">
              We speak your language. Multiple nationalities supported, to reflect Spain&apos;s international clientele, including English, French, Dutch, Swedish, Polish, Russian, Arabic.
            </p>
            <div className="border-t border-white/20 pt-8 mt-8">
              <p className="text-[#c9a227] text-2xl font-bold mb-2">Conveyancing Fee</p>
              <p className="text-white text-lg mb-6">Standard conveyancing fee is 1% of the sale price (negotiable on high value sales)</p>
              <Link href="#contact" className="btn-accent inline-flex items-center gap-2">
                Contact us now for a consultation <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section bg-white">
        <div className="r-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a2e]">
                <span className="text-[#c9a227]">Contact</span> Us
              </h2>
              <p className="text-gray-600 mb-6">
                Ready to get started? Submit the form and we&apos;ll reach out to discuss how we can help with your Spanish property transaction.
              </p>
            </div>
            <LeadWizard />
          </div>
        </div>
      </section>
    </>
  );
}
