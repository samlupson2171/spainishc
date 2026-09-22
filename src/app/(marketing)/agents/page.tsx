import AgentLeadWizard from '@/components/AgentLeadWizard';
import PageHero from '@/components/PageHero';
import EditableText from '@/components/content/EditableText';
import { BadgeEuro, Handshake, UsersRound } from 'lucide-react';

export const metadata = {
  title: 'For Agents | Spanish Conveyancing',
  description: 'Estate agents: earn 25% commission on conveyancing referrals. Partner with us for your property sales.',
};

export default function AgentsPage() {
  return (
    <>
      <PageHero contentKey="agents.hero.title" title="A better legal partner for you and your clients." label="For Agents" image="/images/portrait-of-handsome-young-businessman-standing-2026-01-08-06-03-31-utc.jpg" imagePosition="center 30%" />

      <section className="section bg-[#fffdf9]">
        <div className="r-container grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <EditableText as="p" className="eyebrow" contentKey="agents.intro.eyebrow" defaultValue="For estate agents" />
            <EditableText as="h2" className="section-title mt-5" contentKey="agents.intro.title" defaultValue="A partnership built around great client care.">A partnership built around <span>great client care.</span></EditableText>
            <span className="bronze-rule" />
            <EditableText as="p" className="mt-7 max-w-2xl text-lg leading-8 text-[#45545a]" contentKey="agents.intro.copy-1" defaultValue="Whether you are an agency or an independent agent, your clients need a legal team that communicates clearly, moves decisively and reflects well on your service." />
            <EditableText as="p" className="mt-5 max-w-2xl leading-7 text-[#657075]" contentKey="agents.intro.copy-2" defaultValue="Many of our clients reach us through property professionals. We pay a referral fee of 25% of the conveyancing fee and keep both you and your client informed throughout the transaction." />
          </div>
          <aside className="rounded-2xl border border-[#d9d0c3] bg-[#f7f3ec] p-8 shadow-[0_20px_60px_rgba(24,38,45,.10)]">
            <p className="eyebrow">Example referral</p>
            <div className="mt-7 grid gap-5">
              <div className="flex items-end justify-between border-b border-[#d9d0c3] pb-5"><span className="text-sm text-[#657075]">Property sale</span><strong className="font-display text-3xl font-medium">€500,000</strong></div>
              <div className="flex items-end justify-between border-b border-[#d9d0c3] pb-5"><span className="text-sm text-[#657075]">Conveyancing fee</span><strong className="font-display text-3xl font-medium">€5,000</strong></div>
              <div className="flex items-end justify-between pt-2"><span className="text-sm font-semibold">Your 25% referral</span><strong className="font-display text-4xl font-medium text-[#b48655]">€1,250</strong></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-[#f7f3ec]">
        <div className="r-container grid gap-px overflow-hidden rounded-2xl border border-[#d9d0c3] bg-[#d9d0c3] md:grid-cols-3">
          {[
            [Handshake, 'A dependable handover', 'A simple referral process and a responsive legal team your clients can trust.'],
            [UsersRound, 'Clients feel looked after', 'Personal, multilingual support shaped around each buyer and transaction.'],
            [BadgeEuro, 'Reward for every referral', 'A clear 25% referral fee on completed conveyancing instructions.'],
          ].map(([Icon, title, copy], index) => {
            const FeatureIcon = Icon as typeof Handshake;
            return <article className="bg-[#fffdf9] p-8" key={title as string}><FeatureIcon size={34} strokeWidth={1.25} className="text-[#b48655]" /><EditableText as="h3" className="mt-8 font-display text-3xl font-medium" contentKey={`agents.benefits.${index}.title`} defaultValue={title as string} /><EditableText as="p" className="mt-3 text-sm leading-6 text-[#657075]" contentKey={`agents.benefits.${index}.copy`} defaultValue={copy as string} /></article>;
          })}
        </div>
      </section>

      <section className="section contact-panel">
        <div className="r-container contact-panel__grid">
          <div><EditableText as="p" className="eyebrow" contentKey="agents.contact.eyebrow" defaultValue="Become a referral partner" /><EditableText as="h2" className="section-title mt-5" contentKey="agents.contact.title" defaultValue="Let's build a partnership that works for everyone.">Let&apos;s build a partnership that <span>works for everyone.</span></EditableText><span className="bronze-rule" /><EditableText as="p" className="mt-7 max-w-lg leading-7 text-[#526067]" contentKey="agents.contact.copy" defaultValue="Leave your details and we'll call to explain how the referral process works." /></div>
          <AgentLeadWizard />
        </div>
      </section>
    </>
  );
}
