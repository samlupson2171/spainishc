import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white">
      <div className="section pb-8">
        <div className="r-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/20">
            {/* Logo & About */}
            <div className="lg:col-span-1">
              <Image src="/images/image001.png" alt="Spanish Conveyancing" width={180} height={45} className="mb-4" />
              <p className="text-gray-300 text-sm">
                Connecting Costa del Sol estate agents with vetted Spanish conveyancing lawyers. Earn 20-25% commission on referrals.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-lg font-semibold mb-4 text-[#c9a227]">Quick Links</h5>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-[#c9a227] transition-colors">Home</Link></li>
                <li><Link href="/services" className="text-gray-300 hover:text-[#c9a227] transition-colors">Services</Link></li>
                <li><Link href="/market" className="text-gray-300 hover:text-[#c9a227] transition-colors">Market Insights</Link></li>
                <li><Link href="/agents" className="text-gray-300 hover:text-[#c9a227] transition-colors">For Agents</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-[#c9a227] transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h5 className="text-lg font-semibold mb-4 text-[#c9a227]">Legal</h5>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-300 hover:text-[#c9a227] transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="text-gray-300 hover:text-[#c9a227] transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="text-lg font-semibold mb-4 text-[#c9a227]">Contact Us</h5>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-[#c9a227]" />
                  <a href="tel:+34600000000" className="text-gray-300 hover:text-[#c9a227]">+34 600 000 000</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-[#c9a227]" />
                  <a href="mailto:hello@spanishconveyancing.es" className="text-gray-300 hover:text-[#c9a227]">hello@spanishconveyancing.es</a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-[#c9a227]" />
                  <span className="text-gray-300">Costa del Sol, Spain</span>
                </li>
                <li className="flex items-center gap-3">
                  <Instagram size={18} className="text-[#c9a227]" />
                  <a href="https://instagram.com/spanishconveyancing" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#c9a227]">@spanishconveyancing</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Spanish Conveyancing. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
