import Link from 'next/link';
import EditableText from '@/components/content/EditableText';

export const metadata = {
  title: 'Privacy Policy | Spanish Conveyancing',
  description: 'Privacy policy for Spanish Conveyancing. GDPR compliant.',
};

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[40vh] flex items-center bg-[#18262d]">
        <div className="r-container">
          <EditableText as="h1" className="text-4xl md:text-5xl font-bold text-white mb-4" contentKey="privacy.title" defaultValue="Privacy Policy" />
          <nav className="text-white/80">
            <Link href="/" className="hover:text-[#b48655]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#b48655]">Privacy Policy</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="r-container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <EditableText as="p" className="text-gray-500" contentKey="privacy.updated" defaultValue="Last Updated: March 2026" />
            <EditableText as="p" contentKey="privacy.intro" defaultValue="Compliant with GDPR (EU 2016/679). Data controller: Spanish Conveyancing SL, Spain." />

            <EditableText as="h2" className="text-[#18262d]" contentKey="privacy.section-1.title" defaultValue="1. Data We Collect" />
            <ul>
              <li>Forms: Name, email, phone, agency, callback preferences.</li>
              <li>Cookies: Analytics (Google Analytics, opt-out available). No tracking pixels.</li>
              <li>No payment data stored.</li>
            </ul>

            <EditableText as="h2" className="text-[#18262d]" contentKey="privacy.section-2.title" defaultValue="2. How We Use It" />
            <ul>
              <li>Match leads to lawyers (e.g., Lawbird team).</li>
              <li>Agent marketing (Instagram/calls).</li>
              <li>Site improvements. No selling to third parties.</li>
            </ul>

            <EditableText as="h2" className="text-[#18262d]" contentKey="privacy.section-3.title" defaultValue="3. Storage & Security" />
            <ul>
              <li>MongoDB Atlas (EU servers, encrypted).</li>
              <li>Retention: 2 years or until deletion request.</li>
            </ul>

            <EditableText as="h2" className="text-[#18262d]" contentKey="privacy.section-4.title" defaultValue="4. Your Rights" />
            <ul>
              <li>Access, correct, delete via email (info@spanishconveyancing.es).</li>
              <li>Withdraw consent anytime.</li>
              <li>Complaints: AEPD (Spanish DPA).</li>
            </ul>

            <EditableText as="h2" className="text-[#18262d]" contentKey="privacy.section-5.title" defaultValue="5. Third Parties" />
            <ul>
              <li>Lawyers receive minimal lead data only.</li>
              <li>Hosting (Vercel): Standard logs. No ad networks.</li>
            </ul>

            <EditableText as="h2" className="text-[#18262d]" contentKey="privacy.section-6.title" defaultValue="6. Children" />
            <EditableText as="p" contentKey="privacy.section-6.copy" defaultValue="No under-16s. Questions? Contact us at info@spanishconveyancing.es. Changes posted here." />
          </div>
        </div>
      </section>
    </>
  );
}
