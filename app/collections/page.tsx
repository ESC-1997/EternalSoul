'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CollectionsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Modal is always shown and can't be closed
  const showModal = true;

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
        <div className="min-h-screen relative">
          <Image
            src="/images/ES Slash BG Grey.png"
            alt="Collections Background"
            fill
            className="object-cover blur-sm"
            priority
          />
          
          {/* Non-closeable Modal */}
          {showModal && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative overflow-hidden rounded-lg w-full max-w-2xl bg-transparent">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12">
                  <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 text-center font-serif [text-shadow:_0_0_15px_rgb(107_33_168_/_100%)]">
                    Coming Soon
                  </h2>
                  <p className="text-white text-xl md:text-2xl lg:text-2xl text-center max-w-md font-sans font-bold [text-shadow:_0_0_10px_rgb(107_33_168_/_100%)]">
                    Our collection is being prepared with care. Stay tuned for the launch of our exclusive designs.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
