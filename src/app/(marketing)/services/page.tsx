import Link from 'next/link';
import LeadWizard from '@/components/LeadWizard';
import PageHero from '@/components/PageHero';
import EditableText from '@/components/content/EditableText';
import { ArrowRight, Languages, Scale, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Services | Spanish Conveyancing',
  description: 'Full suite of Spanish property conveyancing services - legal searches, contract negotiation, document preparation, mortgage assistance, NIE application, and property clearance.',
};

const services = [
  ['Legal searches', 'We investigate the property, the seller, title, debts, planning status and any potential issues before you commit.'],
  ['Contract negotiation', 'We review and negotiate reservation and purchase contracts, ensuring the terms protect you and comply with Spanish law.'],
  ['Document preparation', 'We prepare the legal documents and coordinate every detail with the Notary through to completion.'],
  ['Mortgage assistance', 'If finance is part of your purchase, we help you understand and navigate the Spanish mortgage process.'],
  ['NIE application', 'We help foreign buyers secure their essential Número de Identificación de Extranjero.'],
  ['Property clearance', 'We confirm that the property is free of occupants, encumbrances, unpaid taxes and unexpected liabilities.'],
];

export default function ServicesPage() {
  return (
    <>
      <PageHero contentKey="services.hero.title" title="Legal support, tailored to your purchase." label="Services" image="/images/female-lawyer-stamping-document-2026-01-09-06-26-15-utc.JPG" />

      <section className="section services-section">
        <div className="r-container">
          <div className="services-head">
            <div><EditableText as="p" className="eyebrow" contentKey="services.intro.eyebrow" defaultValue="Complete conveyancing support" /><EditableText as="h2" className="section-title mt-5" contentKey="services.intro.title" defaultValue={'Every detail handled.\nEvery risk considered.'}>Every detail handled.<br /><span>Every risk considered.</span></EditableText></div>
            <EditableText as="p" contentKey="services.intro.copy" defaultValue="Based on the Costa del Sol and working across Spain, we bring the right legal expertise together around your purchase—from the first property checks to the moment the title is registered." />
          </div>
          <div className="service-grid">
            {services.map(([title, copy], index) => <article className="service-card" key={title}><span className="service-card__number">0{index + 1}</span><EditableText as="h3" contentKey={`services.items.${index}.title`} defaultValue={title} /><EditableText as="p" contentKey={`services.items.${index}.copy`} defaultValue={copy} /></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#18262d] py-16 text-[#fffaf2]">
        <div className="r-container grid gap-8 md:grid-cols-3">
          <div className="flex gap-4"><ShieldCheck className="shrink-0 text-[#b48655]" size={32} strokeWidth={1.35} /><div><EditableText as="h3" className="font-display text-2xl" contentKey="services.proof.0.title" defaultValue="Protection first" /><EditableText as="p" className="mt-2 text-sm leading-6 text-[#bfc7c9]" contentKey="services.proof.0.copy" defaultValue="Independent legal checks designed to safeguard your investment." /></div></div>
          <div className="flex gap-4"><Languages className="shrink-0 text-[#b48655]" size={32} strokeWidth={1.35} /><div><EditableText as="h3" className="font-display text-2xl" contentKey="services.proof.1.title" defaultValue="Your language" /><EditableText as="p" className="mt-2 text-sm leading-6 text-[#bfc7c9]" contentKey="services.proof.1.copy" defaultValue="English, French, Dutch, Swedish, Polish, Russian and Arabic support." /></div></div>
          <div className="flex gap-4"><Scale className="shrink-0 text-[#b48655]" size={32} strokeWidth={1.35} /><div><EditableText as="h3" className="font-display text-2xl" contentKey="services.proof.2.title" defaultValue="Clear fees" /><EditableText as="p" className="mt-2 text-sm leading-6 text-[#bfc7c9]" contentKey="services.proof.2.copy" defaultValue="Standard fee of 1%, negotiable for high-value property purchases." /></div></div>
        </div>
      </section>

      <section id="contact" className="section contact-panel">
        <div className="r-container contact-panel__grid">
          <div>
            <EditableText as="p" className="eyebrow" contentKey="services.contact.eyebrow" defaultValue="Talk to a specialist" />
            <EditableText as="h2" className="section-title mt-5" contentKey="services.contact.title" defaultValue="Ready to make your Spanish purchase feel simple?">Ready to make your Spanish purchase <span>feel simple?</span></EditableText>
            <span className="bronze-rule" />
            <EditableText as="p" className="mt-7 max-w-lg leading-7 text-[#526067]" contentKey="services.contact.copy" defaultValue="Tell us where you are in the process and we'll explain the right next step." />
            <Link href="/contact" className="btn-white-accent mt-7">Contact details <ArrowRight size={16} /></Link>
          </div>
          <LeadWizard />
        </div>
      </section>
    </>
  );
}
