import Image from 'next/image';
import Link from 'next/link';
import LeadWizard from '@/components/LeadWizard';
import { FileCheck, Scale, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center" style={{ backgroundImage: 'url(/images/golden-hour-in-tenerife-nominated-2026-01-05-04-55-15-utc.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="bg-overlay" />
        <div className="r-container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <p className="text-[#c9a227] font-medium mb-4">Costa del Sol Property Experts</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Partner with Vetted Spanish <span className="text-[#c9a227]">Conveyancing Lawyers</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Earn 20-25% of the standard 1% fee. 36,806 properties sold in Malaga province in 2025—a 4.27% rise. Join 6,000+ agents capitalizing on booming foreign demand.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/services" className="btn-accent inline-flex items-center gap-2">
                  Our Services <ArrowRight size={18} />
                </Link>
                <Link href="/agents" className="btn-white-accent inline-flex items-center gap-2">
                  For Agents
                </Link>
              </div>
            </div>
            <div>
              <LeadWizard variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-[#1a1a2e] py-12">
        <div className="r-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[#c9a227]">36,806</p>
              <p className="text-white mt-2">Malaga Sales 2025</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#c9a227]">6,000+</p>
              <p className="text-white mt-2">Active Agents</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#c9a227]">20-25%</p>
              <p className="text-white mt-2">Your Commission</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#c9a227]">15%</p>
              <p className="text-white mt-2">British Buyers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-gray-50">
        <div className="r-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/portrait-of-happy-real-estate-agent-with-documents-2026-01-09-06-55-19-utc.jpg"
                alt="Real estate agent"
                width={600}
                height={700}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute bottom-6 left-6 bg-[#c9a227] text-white p-6 rounded-lg">
                <p className="font-semibold">Get Free Consultation</p>
                <p className="text-2xl font-bold">+34 600 000 000</p>
              </div>
            </div>
            <div>
              <p className="text-[#c9a227] font-medium mb-2">About Us</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a2e]">
                Your Gateway to <span className="text-[#c9a227]">Trusted</span> Legal Partners
              </h2>
              <p className="text-gray-600 mb-6">
                We represent top lawyers like Lawbird (Antonio Flores, 15-strong multilingual team) across Costa del Sol, Alicante, and Andalusia. Fast closings, 1% fee (tiered 0.8-0.5% for €1m+ properties). Agents get instant intros—no delays.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-[#c9a227] mt-1 flex-shrink-0" />
                  <span>46% of Malaga&apos;s autonomo agents are foreign-born</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-[#c9a227] mt-1 flex-shrink-0" />
                  <span>Golden Triangle: 6,175 sales Q1-Q3 2025</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-[#c9a227] mt-1 flex-shrink-0" />
                  <span>British buyers lead at 15%, followed by Poles and Ukrainians</span>
                </li>
              </ul>
              <Link href="/services" className="btn-accent inline-flex items-center gap-2">
                Learn More <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section">
        <div className="r-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[#c9a227] font-medium mb-2">Services</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1a1a2e]">
              Streamlined <span className="text-[#c9a227]">Conveyancing</span> Solutions
            </h2>
            <p className="text-gray-600">
              Standard 1% fee on sale price. Our vetted lawyers handle everything—your 20-25% commission post-notary.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: FileCheck, title: 'Due Diligence', desc: 'Title checks, debts, planning verification' },
              { icon: Scale, title: 'Legal Processing', desc: 'Contracts, notary prep, tax clearance' },
              { icon: Users, title: 'Agent Support', desc: 'Priority handling, flexible commission tiers' },
            ].map((service, i) => (
              <div key={i} className="card-service p-8 relative pt-16">
                <div className="icon-box absolute -top-6 left-8">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#c9a227] mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <Link href="/services" className="text-[#c9a227] font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
                  Read More <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="btn-accent inline-flex items-center gap-2">
              All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Lawyers Section */}
      <section className="section">
        <div className="r-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[#c9a227] font-medium mb-2">Our Network</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1a1a2e]">
              Vetted <span className="text-[#c9a227]">Lawyer</span> Partners
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Lawbird', person: 'Antonio Flores', role: 'Costa del Sol Specialist', primary: true },
              { name: 'Fairway Lawyers', person: 'Diego Echavarria', role: 'Marbella Focus' },
              { name: 'Costa Luz Lawyers', person: 'Maria de Castro', role: 'Algeciras Region' },
              { name: 'Granada Legal', person: 'Jose Castillo', role: 'Andalusia Extension' },
            ].map((lawyer, i) => (
              <div key={i} className={`p-6 rounded-lg ${lawyer.primary ? 'bg-[#c9a227] text-white' : 'bg-gray-100'}`}>
                <h4 className={`font-bold text-lg mb-1 ${lawyer.primary ? 'text-white' : 'text-[#1a1a2e]'}`}>{lawyer.name}</h4>
                <p className={`font-medium ${lawyer.primary ? 'text-white/90' : 'text-[#c9a227]'}`}>{lawyer.person}</p>
                <p className={`text-sm mt-2 ${lawyer.primary ? 'text-white/80' : 'text-gray-600'}`}>{lawyer.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA with Form */}
      <section className="section bg-gray-50">
        <div className="r-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#c9a227] font-medium mb-2">Get Started</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a2e]">
                Request a <span className="text-[#c9a227]">Callback</span> Today
              </h2>
              <p className="text-gray-600 mb-6">
                Ready for your commission share? Call Damian or David, or submit the form and we&apos;ll reach out.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Award className="text-[#c9a227]" size={24} />
                  <span>Exclusive access to vetted lawyers</span>
                </div>
                <div className="flex items-center gap-4">
                  <Award className="text-[#c9a227]" size={24} />
                  <span>Priority handling for your clients</span>
                </div>
                <div className="flex items-center gap-4">
                  <Award className="text-[#c9a227]" size={24} />
                  <span>No upfront costs—pay from closings</span>
                </div>
              </div>
            </div>
            <LeadWizard />
          </div>
        </div>
      </section>
    </>
  );
}
