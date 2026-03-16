import Link from 'next/link';
import LeadWizard from '@/components/LeadWizard';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center" style={{ backgroundImage: 'url(/images/lawyers-office-hero-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="bg-overlay" />
        <div className="r-container relative z-10 py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
              Specialists in <span className="text-[#c9a227]">Property Conveyancing</span>
            </h1>
            <p className="text-xl text-gray-200 mb-6">
              Spanish property lawyers - we provide all the legal conveyancing services you need to ensure a smooth and secure property transaction, from initial verification to final registration, safeguarding your investment at every step.
            </p>
            <p className="text-lg text-[#c9a227] mb-8">
              Multiple languages supported: including English, French, Dutch, Swedish, Polish, Russian, Arabic
            </p>
            <Link href="#contact" className="btn-accent inline-flex items-center gap-2">
              Request a Callback <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section bg-gray-50">
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
      <section id="contact" className="section bg-gray-50">
        <div className="r-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a2e]">
                <span className="text-[#c9a227]">Contact</span> Us
              </h2>
              <p className="text-gray-600 mb-6">
                Ready to get started? Submit the form and we&apos;ll reach out to discuss how we can help with your Spanish property transaction or partnership opportunities.
              </p>
            </div>
            <LeadWizard />
          </div>
        </div>
      </section>
    </>
  );
}
