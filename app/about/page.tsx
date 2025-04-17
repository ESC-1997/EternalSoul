'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left Navigation Menu */}
      <div className={`fixed left-0 top-0 h-screen bg-black/50 backdrop-blur-sm transition-all duration-300 ${isMenuOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex flex-col h-full p-4">
          {/* Minimize Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-1 hover:bg-white/10 rounded-lg transition-colors mb-4 self-end"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            )}
          </button>

          {/* Logo */}
          <div className={`mb-8 ${isMenuOpen ? 'flex items-center justify-center' : ''}`}>
            <Link href="/" className="block">
              <Image
                src="/images/logo.png"
                alt="Eternal Soul Logo"
                width={isMenuOpen ? 120 : 40}
                height={isMenuOpen ? 40 : 40}
                className="invert transform hover:invert-0 transition-all duration-300"
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-6 mt-4">
            <Link 
              href="/about"
              className="flex items-center gap-3 text-white p-3 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Image
                src="/images/Glasses.png"
                alt="About"
                width={24}
                height={24}
                className="invert brightness-0"
              />
              {isMenuOpen && <span>About</span>}
            </Link>

            <Link 
              href="/contact"
              className="flex items-center gap-3 text-white p-3 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Image
                src="/images/Email.png"
                alt="Contact"
                width={24}
                height={24}
                className="invert brightness-0"
              />
              {isMenuOpen && <span>Contact Us</span>}
            </Link>

            <Link 
              href="/collections"
              className="flex items-center gap-3 text-white p-3 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Image
                src="/images/T_Shirt.png"
                alt="Collections"
                width={24}
                height={24}
                className="invert brightness-0"
              />
              {isMenuOpen && <span>Collections</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isMenuOpen ? 'ml-64' : 'ml-20'}`}>
        <section className="min-h-screen bg-[#6B21A8] relative flex items-center">
          <div className="max-w-4xl mx-auto p-4 md:p-6 py-24 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">About The Brand</h2>
            <p className="text-white text-lg md:text-xl italic font-bold leading-relaxed md:leading-[3] text-center">
              Eternal Soul Clothing is more than just a fashion label—it's a tribute to the enduring energy within each of us. Rooted in the belief that the soul is eternal and ever-transforming, our brand stands as a reminder that even in moments of darkness, there is light that never fades. Every design is crafted to reflect themes of personal growth, healing, and the invisible strength that carries us forward. Eternal Soul is for those who feel deeply, think boldly, and believe that identity is not fixed—but a continuous journey of becoming. Through quality pieces and meaningful art, we aim to spark connection, conversation, and self-expression in the most authentic form.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
} 
