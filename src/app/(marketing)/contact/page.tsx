import Link from 'next/link';
import LeadWizard from '@/components/LeadWizard';
import { Phone, Mail, Instagram } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Spanish Conveyancing',
  description: 'Get in touch with Spanish Conveyancing for Costa del Sol lawyer referrals.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[50vh] flex items-center" style={{ backgroundImage: 'url(/images/smiling-man-extending-key-set-at-modern-property-s-2026-01-05-00-11-01-utc.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="bg-overlay" />
        <div className="r-container relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <nav className="text-white/80">
            <Link href="/" className="hover:text-[#c9a227]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#c9a227]">Contact</span>
          </nav>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="r-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <p className="text-[#c9a227] font-medium mb-2">Get in Touch</p>
              <h2 className="text-3xl font-bold mb-6 text-[#1a1a2e]">
                Ready for Your <span className="text-[#c9a227]">Commission</span> Share?
              </h2>
              <p className="text-gray-600 mb-8">
                Call us or submit the form below and we&apos;ll reach out to discuss how we can help grow your business.
              </p>
              <LeadWizard />
            </div>

            {/* Contact Info */}
            <div>
              <p className="text-[#c9a227] font-medium mb-2">Contact Information</p>
              <h3 className="text-2xl font-bold mb-6 text-[#1a1a2e]">
                Get In <span className="text-[#c9a227]">Touch</span>
              </h3>
              <p className="text-gray-600 mb-8">
                We&apos;re here to help you connect with vetted Spanish conveyancing lawyers and start earning commission on referrals.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#c9a227]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[#c9a227]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Phone</h4>
                    <a href="tel:+34693777466" className="text-gray-600 hover:text-[#c9a227]">
                      +34 693 777 466
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#c9a227]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#c9a227]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <a href="mailto:info@spanishconveyancing.es" className="text-gray-600 hover:text-[#c9a227]">
                      info@spanishconveyancing.es
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#c9a227]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Instagram className="text-[#c9a227]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Instagram</h4>
                    <a href="https://instagram.com/spanishconveyancing" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#c9a227]">
                      @spanishconveyancing
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
