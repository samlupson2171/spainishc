'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Phone, MapPin, Instagram } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/market', label: 'Market Insights' },
  { href: '/agents', label: 'For Agents' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#c9a227] py-3">
        <div className="r-container">
          <div className="flex flex-col md:flex-row justify-between items-center text-white gap-3 text-sm">
            <div className="flex flex-col md:flex-row gap-3 md:gap-8 items-center">
              <a href="tel:+34600000000" className="flex items-center gap-2 hover:opacity-80">
                <Phone size={16} />
                +34 600 000 000
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={16} />
                Costa del Sol, Spain
              </span>
            </div>
            <div className="flex gap-4">
              <a href="https://instagram.com/spanishconveyancing" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 bg-[#1a1a2e] z-50">
        <div className="r-container">
          <nav className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center">
              <Image src="/images/image001.png" alt="Spanish Conveyancing" width={200} height={50} className="h-12 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white hover:text-[#c9a227] transition-colors font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4">
              <ul className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white hover:text-[#c9a227] transition-colors block py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
