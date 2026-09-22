import Link from 'next/link';
import { Phone, Mail, Instagram } from 'lucide-react';
import BrandLockup from './BrandLockup';
import EditableText from './content/EditableText';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="section pb-8">
        <div className="r-container">
          <div className="site-footer__lead">
            <div className="site-footer__brand">
              <BrandLockup inverted />
              <EditableText as="p" contentKey="global.footer.intro" defaultValue="Spanish property lawyers making every purchase feel clear, secure and personal." />
            </div>
            <div className="site-footer__promise">
              <EditableText as="p" contentKey="global.footer.promise-1" defaultValue="Your Property." />
              <EditableText as="p" contentKey="global.footer.promise-2" defaultValue="Our Expertise." />
              <EditableText as="strong" contentKey="global.footer.promise-3" defaultValue="Total Peace of Mind." />
            </div>
          </div>

          <div className="site-footer__grid">
            <div>
              <p className="site-footer__eyebrow">Explore</p>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/agents">For Agents</Link></li>
                <li><Link href="/market">Market insights</Link></li>
              </ul>
            </div>
            <div>
              <p className="site-footer__eyebrow">Start a conversation</p>
              <ul>
                <li className="flex items-center gap-3">
                  <Phone size={18} />
                  <a href="tel:+34693777466">+34 693 777 466</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} />
                  <a href="mailto:info@spanishconveyancing.es">info@spanishconveyancing.es</a>
                </li>
                <li className="flex items-center gap-3">
                  <Instagram size={18} />
                  <a href="https://instagram.com/spanishconveyancing" target="_blank" rel="noopener noreferrer">@spanishconveyancing</a>
                </li>
              </ul>
            </div>
            <div>
              <p className="site-footer__eyebrow">Ready when you are</p>
              <EditableText as="p" className="site-footer__cta-copy" contentKey="global.footer.cta" defaultValue="Speak with us about your property purchase in Spain." />
              <Link href="/contact" className="btn-accent">Free consultation</Link>
            </div>
          </div>

          <div className="site-footer__legal">
            <EditableText as="p" contentKey="global.footer.legal" defaultValue="Spanish Conveyancing is a trading style of Fountain Finances Limited. This site is owned and operated by Fountain Finances Limited which is registered in England and Wales. Registered office: 1D MacLaren House, Talbot Road, Old Trafford, Manchester, M32 0FP. Information Commissioners Office registration number ZA465505. VAT No. 250 2839 19" />
          </div>

          <div className="site-footer__bottom">
            <p>&copy; {new Date().getFullYear()} Spanish Conveyancing.</p>
            <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
