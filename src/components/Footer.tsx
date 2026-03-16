import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-[#1a1a2e] border-t border-gray-200">
      <div className="section pb-8">
        <div className="r-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-200">
            {/* Logo & About */}
            <div>
              <Image src="/images/image001.png" alt="Spanish Conveyancing" width={180} height={45} className="mb-4" />
              <p className="text-gray-600 text-sm">
                Spanish property lawyers providing comprehensive conveyancing services for a smooth and secure property transaction.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-lg font-semibold mb-4 text-[#c9a227]">Quick Links</h5>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-600 hover:text-[#c9a227] transition-colors">Home</Link></li>
                <li><Link href="/services" className="text-gray-600 hover:text-[#c9a227] transition-colors">Services</Link></li>
                <li><Link href="/agents" className="text-gray-600 hover:text-[#c9a227] transition-colors">For Agents</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-[#c9a227] transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="text-lg font-semibold mb-4 text-[#c9a227]">Contact Us</h5>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-[#c9a227]" />
                  <a href="tel:+34693777466" className="text-gray-600 hover:text-[#c9a227]">+34 693 777 466</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-[#c9a227]" />
                  <a href="mailto:info@spanishconveyancing.es" className="text-gray-600 hover:text-[#c9a227]">info@spanishconveyancing.es</a>
                </li>
                <li className="flex items-center gap-3">
                  <Instagram size={18} className="text-[#c9a227]" />
                  <a href="https://instagram.com/spanishconveyancing" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#c9a227]">@spanishconveyancing</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="py-6 border-b border-gray-200">
            <p className="text-gray-500 text-sm leading-relaxed">
              Spanish Conveyancing is a trading style of Fountain Finances Limited. This site is owned and operated by Fountain Finances Limited which is registered in England and Wales. Financial Conduct Authority (FCA) registered number: 08069774. Registered office: 1D MacLaren House, Talbot Road, Old Trafford, Manchester, M32 0FP. Information Commissioners Office registration number ZA465505. VAT No. 250 2839 19
            </p>
          </div>

          {/* Copyright */}
          <div className="pt-6 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Spanish Conveyancing. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
