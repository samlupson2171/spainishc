import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Spanish Conveyancing',
  description: 'Privacy policy for Spanish Conveyancing. GDPR compliant.',
};

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[40vh] flex items-center bg-[#1a1a2e]">
        <div className="r-container">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <nav className="text-white/80">
            <Link href="/" className="hover:text-[#c9a227]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#c9a227]">Privacy Policy</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="r-container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-gray-500">Last Updated: March 2026</p>
            <p>Compliant with GDPR (EU 2016/679). Data controller: Spanish Conveyancing SL, Spain.</p>

            <h2 className="text-[#1a1a2e]">1. Data We Collect</h2>
            <ul>
              <li>Forms: Name, email, phone, agency, callback preferences.</li>
              <li>Cookies: Analytics (Google Analytics, opt-out available). No tracking pixels.</li>
              <li>No payment data stored.</li>
            </ul>

            <h2 className="text-[#1a1a2e]">2. How We Use It</h2>
            <ul>
              <li>Match leads to lawyers (e.g., Lawbird team).</li>
              <li>Agent marketing (Instagram/calls).</li>
              <li>Site improvements. No selling to third parties.</li>
            </ul>

            <h2 className="text-[#1a1a2e]">3. Storage & Security</h2>
            <ul>
              <li>MongoDB Atlas (EU servers, encrypted).</li>
              <li>Retention: 2 years or until deletion request.</li>
            </ul>

            <h2 className="text-[#1a1a2e]">4. Your Rights</h2>
            <ul>
              <li>Access, correct, delete via email (info@spanishconveyancing.es).</li>
              <li>Withdraw consent anytime.</li>
              <li>Complaints: AEPD (Spanish DPA).</li>
            </ul>

            <h2 className="text-[#1a1a2e]">5. Third Parties</h2>
            <ul>
              <li>Lawyers receive minimal lead data only.</li>
              <li>Hosting (Vercel): Standard logs. No ad networks.</li>
            </ul>

            <h2 className="text-[#1a1a2e]">6. Children</h2>
            <p>
              No under-16s. Questions? Contact us at info@spanishconveyancing.es. Changes posted here.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
