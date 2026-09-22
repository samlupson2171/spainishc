import Link from 'next/link';
import EditableText from '@/components/content/EditableText';

export const metadata = {
  title: 'Terms & Conditions | Spanish Conveyancing',
  description: 'Terms and conditions for Spanish Conveyancing services.',
};

export default function TermsPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[40vh] flex items-center bg-[#18262d]">
        <div className="r-container">
          <EditableText as="h1" className="text-4xl md:text-5xl font-bold text-white mb-4" contentKey="terms.title" defaultValue="Terms & Conditions" />
          <nav className="text-white/80">
            <Link href="/" className="hover:text-[#b48655]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#b48655]">Terms & Conditions</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="r-container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <EditableText as="p" className="text-gray-500" contentKey="terms.updated" defaultValue="Last Updated: March 2026" />

            <EditableText as="h2" className="text-[#18262d]" contentKey="terms.section-1.title" defaultValue="1. Introduction" />
            <EditableText as="p" contentKey="terms.section-1.copy" defaultValue={'Welcome to SpanishConveyancing.es (the "Site"), operated by Spanish Conveyancing SL. We connect estate agents to vetted Spanish lawyers for property conveyancing referrals. These Terms govern your use. No direct legal advice provided—lawyers are independent.'} />

            <EditableText as="h2" className="text-[#18262d]" contentKey="terms.section-2.title" defaultValue="2. Services" />
            <ul>
              <li>Referrals to lawyers (e.g., Lawbird, Fairway) for conveyancing.</li>
              <li>Agents may earn commissions (20-25% of fee share, as agreed).</li>
              <li>Fees: Benchmark 1% of sale price; tiered discounts apply. Payments post-notary handover.</li>
            </ul>

            <EditableText as="h2" className="text-[#18262d]" contentKey="terms.section-3.title" defaultValue="3. User Eligibility" />
            <EditableText as="p" contentKey="terms.section-3.copy" defaultValue="Must be 18+, Spanish/EU resident or authorized agent. No spam/scams tolerated." />

            <EditableText as="h2" className="text-[#18262d]" contentKey="terms.section-4.title" defaultValue="4. Commissions & Payments" />
            <ul>
              <li>Earned post-successful closing.</li>
              <li>We facilitate lawyer intros; no closing guarantees.</li>
              <li>Disputes: Spanish law, Malaga arbitration.</li>
            </ul>

            <EditableText as="h2" className="text-[#18262d]" contentKey="terms.section-5.title" defaultValue="5. Liabilities" />
            <EditableText as="p" contentKey="terms.section-5.copy" defaultValue="We disclaim warranties. Lawyers handle due diligence/taxes. Use at own risk." />

            <EditableText as="h2" className="text-[#18262d]" contentKey="terms.section-6.title" defaultValue="6. Termination" />
            <EditableText as="p" contentKey="terms.section-6.copy" defaultValue="30 days notice. Abuse leads to immediate ban." />

            <EditableText as="h2" className="text-[#18262d]" contentKey="terms.section-7.title" defaultValue="7. Governing Law" />
            <EditableText as="p" contentKey="terms.section-7.copy" defaultValue="Spanish (Andalusia jurisdiction). Changes reserved. Contact for questions at info@spanishconveyancing.es." />
          </div>
        </div>
      </section>
    </>
  );
}
