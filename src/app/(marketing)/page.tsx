import Image from 'next/image';
import Link from 'next/link';
import LeadWizard from '@/components/LeadWizard';
import EditableText from '@/components/content/EditableText';
import { ArrowRight, FileCheck2, Globe2, Handshake, House, Languages, Mail, MapPin, Percent, Phone, ShieldCheck, UsersRound } from 'lucide-react';

const bespokePoints = [
  { icon: Globe2, title: 'Nationality & language', copy: 'We cover most European countries, plus Arabic, so important details never get lost in translation.' },
  { icon: MapPin, title: 'Location', copy: 'Local legal knowledge matched to the area where you are buying.' },
  { icon: House, title: 'Domicile', copy: 'Advice shaped around where you live and how you plan to use the property.' },
  { icon: Percent, title: 'Tax status', copy: 'The right expertise for your residency and tax position.' },
];

const services = [
  ['Legal searches', 'Thorough checks on the property, seller, debts and planning position before you commit.'],
  ['Contract negotiation', 'Clear, protective terms negotiated in line with Spanish property law.'],
  ['Document preparation', 'Every document prepared and coordinated with the Notary for a smooth completion.'],
  ['Mortgage assistance', 'Practical support through the Spanish mortgage process when finance is required.'],
  ['NIE application', 'Help securing the identification number every foreign property buyer needs.'],
  ['Property clearance', 'Confirmation that the property is free of occupants, encumbrances and unpaid taxes.'],
];

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="r-container home-hero__grid">
          <div className="home-hero__copy">
            <EditableText as="p" className="eyebrow" contentKey="home.hero.eyebrow" defaultValue="Bespoke property lawyers in Spain" />
            <EditableText as="h1" className="display-title mt-5" contentKey="home.hero.title" defaultValue={'Your Property.\nOur Expertise.\nTotal Peace of Mind.'}>Your Property.<br />Our Expertise.<br /><span>Total Peace of Mind.</span></EditableText>
            <span className="bronze-rule" />
            <EditableText as="p" className="home-hero__intro" contentKey="home.hero.intro" defaultValue="Buying in Spain should feel exciting, not overwhelming. We connect you with the right lawyer and guide your purchase from first checks to final registration." />
            <div className="home-hero__actions">
              <Link href="#contact" className="btn-accent">Free consultation <ArrowRight size={17} /></Link>
              <Link href="/services" className="btn-white-accent">Explore our services</Link>
            </div>
          </div>
          <div className="home-hero__visual" aria-label="Buying a home in Spain">
            <div className="home-hero__orbit" />
            <div className="home-hero__frame">
              <Image src="/images/smiling-man-extending-key-set-at-modern-property-s-2026-01-05-00-11-01-utc.jpg" alt="Property professional handing over the keys to a Spanish home" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <div className="home-hero__note"><EditableText as="strong" contentKey="home.hero.note" defaultValue="A confident purchase, from offer to keys." /><EditableText as="span" contentKey="home.hero.note-label" defaultValue="Spain-wide support" /></div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="r-container trust-strip__inner">
          <span className="trust-strip__icon"><ShieldCheck size={31} strokeWidth={1.5} /></span>
          <EditableText as="p" className="trust-strip__copy" contentKey="home.trust.copy" defaultValue="Your trusted legal partner for buying property in Spain." />
          <div className="trust-strip__proof"><span>Independent advice</span><span>Multi-lingual</span><span>Spain-wide</span></div>
        </div>
      </section>

      <section className="section bespoke-section">
        <div className="r-container">
          <div className="bespoke-heading">
            <EditableText as="p" className="eyebrow" contentKey="home.bespoke.eyebrow" defaultValue="The right expertise, for you" />
            <EditableText as="h2" className="section-title mt-5" contentKey="home.bespoke.title" defaultValue="Our unique, bespoke service connects you with the right lawyer, tailored to your needs.">Our unique, bespoke service connects you with the right lawyer, <span>tailored to your needs.</span></EditableText>
            <span className="bronze-rule" />
          </div>
          <div className="bespoke-grid">
            <div>
              <Image src="/images/woman-holding-house-keys-with-cityscape-background-2026-01-06-10-40-39-utc.jpg" alt="New homeowner holding the keys to her property" width={6720} height={4480} className="aspect-[4/5] w-full rounded-t-[10rem] object-cover" sizes="(max-width: 900px) 100vw, 42vw" />
              <div className="personal-card"><span className="line-icon"><UsersRound size={29} strokeWidth={1.45} /></span><EditableText as="p" contentKey="home.bespoke.personal" defaultValue="A truly personalised approach for a smooth and secure property purchase." /></div>
            </div>
            <div className="bespoke-list">
              {bespokePoints.map(({ icon: Icon, title, copy }, index) => (
                <article className="bespoke-item" key={title}><span className="line-icon"><Icon size={28} strokeWidth={1.4} /></span><div><EditableText as="h3" contentKey={`home.bespoke.${index}.title`} defaultValue={title} /><EditableText as="p" contentKey={`home.bespoke.${index}.copy`} defaultValue={copy} /></div></article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="r-container">
          <div className="services-head">
            <div><EditableText as="p" className="eyebrow" contentKey="home.services.eyebrow" defaultValue="Every step covered" /><EditableText as="h2" className="section-title mt-5" contentKey="home.services.title" defaultValue={'Property law,\nmade clear.'}>Property law,<br /><span>made clear.</span></EditableText></div>
            <EditableText as="p" contentKey="home.services.intro" defaultValue="Based on the Costa del Sol and working across Spain, we provide the legal services you need to protect your investment and keep your purchase moving." />
          </div>
          <div className="service-grid">
            {services.map(([title, copy], index) => <article className="service-card" key={title}><span className="service-card__number">0{index + 1}</span><EditableText as="h3" contentKey={`home.services.${index}.title`} defaultValue={title} /><EditableText as="p" contentKey={`home.services.${index}.copy`} defaultValue={copy} /></article>)}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
            <EditableText as="p" className="text-sm text-[#536066]" contentKey="home.services.fee" defaultValue="Standard conveyancing fee: 1% of the sale price, negotiable on high-value purchases." />
            <Link href="/services" className="btn-white-accent">View all services <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section reassurance">
        <div className="r-container reassurance__grid">
          <div className="reassurance__medallion"><ShieldCheck size={118} strokeWidth={1} /></div>
          <div className="reassurance__copy">
            <EditableText as="p" className="eyebrow" contentKey="home.reassurance.eyebrow" defaultValue="Clarity at every stage" />
            <EditableText as="h2" className="section-title mt-5" contentKey="home.reassurance.title" defaultValue="Buying abroad can feel confusing. The right lawyer changes everything.">Buying abroad can feel confusing. <span>The right lawyer changes everything.</span></EditableText>
            <span className="bronze-rule" />
            <EditableText as="p" contentKey="home.reassurance.copy" defaultValue="We remove uncertainty, explain the process in plain language and put the right protections in place—giving you security and peace of mind from the first conversation to completion." />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-sm"><Languages size={19} className="accent-color" /> Your language</div>
              <div className="flex items-center gap-2 text-sm"><FileCheck2 size={19} className="accent-color" /> Due diligence</div>
              <div className="flex items-center gap-2 text-sm"><Handshake size={19} className="accent-color" /> Personal service</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-panel" id="contact">
        <div className="r-container contact-panel__grid">
          <div>
            <EditableText as="p" className="eyebrow" contentKey="home.contact.eyebrow" defaultValue="Let's talk" />
            <EditableText as="h2" className="section-title mt-5" contentKey="home.contact.title" defaultValue="Contact us today for a free consultation.">Contact us today for a <span>free consultation.</span></EditableText>
            <span className="bronze-rule" />
            <EditableText as="p" className="mt-7 max-w-lg leading-7 text-[#526067]" contentKey="home.contact.copy" defaultValue="Tell us a little about your plans and we'll call you to discuss the right legal support for your purchase." />
            <div className="contact-direct"><a href="mailto:info@spanishconveyancing.es"><Mail size={21} /> info@spanishconveyancing.es</a><a href="tel:+34693777466"><Phone size={21} /> +34 693 777 466</a></div>
          </div>
          <LeadWizard />
        </div>
      </section>
    </>
  );
}
