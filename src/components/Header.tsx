'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 bg-white z-50 shadow-sm">
        <div className="r-container">
          <nav className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center">
              <Image src="/images/image001.png" alt="Spanish Conveyancing" width={200} height={50} className="h-12 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[#1a1a2e] hover:text-[#c9a227] transition-colors font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-[#1a1a2e] p-2"
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
                      className="text-[#1a1a2e] hover:text-[#c9a227] transition-colors block py-2"
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
