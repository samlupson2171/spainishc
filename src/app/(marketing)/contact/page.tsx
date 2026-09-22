import LeadWizard from '@/components/LeadWizard';
import PageHero from '@/components/PageHero';
import EditableText from '@/components/content/EditableText';
import { Instagram, Mail, Phone } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Spanish Conveyancing',
  description: 'Get in touch with Spanish Conveyancing for trusted, bespoke Spanish property legal support.',
};

const contactDetails = [
  { icon: Phone, label: 'Phone', value: '+34 693 777 466', href: 'tel:+34693777466' },
  { icon: Mail, label: 'Email', value: 'info@spanishconveyancing.es', href: 'mailto:info@spanishconveyancing.es' },
  { icon: Instagram, label: 'Instagram', value: '@spanishconveyancing', href: 'https://instagram.com/spanishconveyancing' },
];

export default function ContactPage() {
  return (
    <>
      <PageHero contentKey="contact.hero.title" title="Your property journey starts with a conversation." label="Contact" image="/images/smiling-man-extending-key-set-at-modern-property-s-2026-01-05-00-11-01-utc.jpg" imagePosition="center 35%" />
      <section className="section contact-panel">
        <div className="r-container contact-panel__grid">
          <div>
            <EditableText as="p" className="eyebrow" contentKey="contact.intro.eyebrow" defaultValue="Free consultation" />
            <EditableText as="h2" className="section-title mt-5" contentKey="contact.intro.title" defaultValue="Tell us about the property you have in mind.">Tell us about the property <span>you have in mind.</span></EditableText>
            <span className="bronze-rule" />
            <EditableText as="p" className="mt-7 max-w-lg leading-7 text-[#526067]" contentKey="contact.intro.copy" defaultValue="Call us or request a callback. We'll listen, explain how we can help and connect you with the right legal expertise." />
            <div className="mt-10 grid gap-3">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <a href={href} key={label} target={label === 'Instagram' ? '_blank' : undefined} rel={label === 'Instagram' ? 'noopener noreferrer' : undefined} className="flex items-center gap-5 rounded-xl border border-[#d9d0c3] bg-[#fffdf9] p-4 transition-transform hover:-translate-y-0.5">
                  <span className="line-icon !h-12 !w-12"><Icon size={20} strokeWidth={1.4} /></span>
                  <span><small className="block text-[.65rem] font-bold uppercase tracking-[.16em] text-[#986b3e]">{label}</small><span className="mt-1 block text-sm sm:text-base">{value}</span></span>
                </a>
              ))}
            </div>
          </div>
          <LeadWizard />
        </div>
      </section>
    </>
  );
}
