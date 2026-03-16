import Link from 'next/link';
import AgentLeadWizard from '@/components/AgentLeadWizard';

export const metadata = {
  title: 'For Agents | Spanish Conveyancing',
  description: 'Estate agents: earn 25% commission on conveyancing referrals. Partner with us for your property sales.',
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

      {/* For Agents Section */}
      <section className="section bg-white">
        <div className="r-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a2e]">
                For <span className="text-[#c9a227]">Agents</span>
              </h2>
              <p className="text-gray-700 text-xl mb-6">
                Are you a real estate agency or independent agent (autónomo)? We want to collaborate!
              </p>
              <p className="text-gray-600 mb-8">
                Many of our clients come to us as referrals from our partnerships with property professionals like you.
              </p>
              <p className="text-gray-700 text-lg mb-8">
                We pay a referral fee of <span className="text-[#c9a227] font-bold">25%</span> of the conveyancing fee. For example, on a sale of €500,000, the conveyancing fee will be €5,000, and the referral fee would be €1,250.
              </p>
              <p className="text-gray-700 font-semibold mb-6">Call us or submit the form below</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#c9a227]">
              <p className="text-[#c9a227] font-semibold text-sm uppercase tracking-wide mb-6">Example Calculation</p>
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Sale Value</span>
                  <span className="text-2xl font-bold text-[#1a1a2e]">€500,000</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Conveyancing Fee (1%)</span>
                  <span className="text-2xl font-bold text-[#1a1a2e]">€5,000</span>
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

      {/* Contact Section */}
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
            </div>
            <AgentLeadWizard />
          </div>
        </div>
      </section>
    </>
  );
}
