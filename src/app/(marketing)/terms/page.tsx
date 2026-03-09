import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | Spanish Conveyancing',
  description: 'Terms and conditions for Spanish Conveyancing services.',
};

export default function TermsPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[40vh] flex items-center bg-[#1a1a2e]">
        <div className="r-container">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms & Conditions</h1>
          <nav className="text-white/80">
            <Link href="/" className="hover:text-[#c9a227]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#c9a227]">Terms & Conditions</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="r-container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-gray-500">Last Updated: March 2026</p>

            <h2 className="text-[#1a1a2e]">1. Introduction</h2>
            <p>
              Welcome to SpanishConveyancing.es (the &quot;Site&quot;), operated by Spanish Conveyancing SL. We connect estate agents to vetted Spanish lawyers for property conveyancing referrals. These Terms govern your use. No direct legal advice provided—lawyers are independent.
            </p>

            <h2 className="text-[#1a1a2e]">2. Services</h2>
            <ul>
              <li>Referrals to lawyers (e.g., Lawbird, Fairway) for conveyancing.</li>
              <li>Agents may earn commissions (20-25% of fee share, as agreed).</li>
              <li>Fees: Benchmark 1% of sale price; tiered discounts apply. Payments post-notary handover.</li>
            </ul>

            <h2 className="text-[#1a1a2e]">3. User Eligibility</h2>
            <p>
              Must be 18+, Spanish/EU resident or authorized agent. No spam/scams tolerated.
            </p>

            <h2 className="text-[#1a1a2e]">4. Commissions & Payments</h2>
            <ul>
              <li>Earned post-successful closing.</li>
              <li>We facilitate lawyer intros; no closing guarantees.</li>
              <li>Disputes: Spanish law, Malaga arbitration.</li>
            </ul>

            <h2 className="text-[#1a1a2e]">5. Liabilities</h2>
            <p>
              We disclaim warranties. Lawyers handle due diligence/taxes. Use at own risk.
            </p>

            <h2 className="text-[#1a1a2e]">6. Termination</h2>
            <p>
              30 days notice. Abuse leads to immediate ban.
            </p>

            <h2 className="text-[#1a1a2e]">7. Governing Law</h2>
            <p>
              Spanish (Andalusia jurisdiction). Changes reserved. Contact for questions at info@spanishconveyancing.es.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
