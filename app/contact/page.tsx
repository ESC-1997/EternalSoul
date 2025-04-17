'use client';

import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Navigation Menu */}
      <div className="fixed left-0 top-0 h-screen w-20 bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="mb-2 flex flex-col items-center justify-center">
            <Link href="/" className="block">
              <Image
                src="/images/logo.png"
                alt="Eternal Soul Logo"
                width={60}
                height={60}
                className="invert transform hover:invert-0 transition-all duration-300"
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
            <span className="text-xs text-white mt-2">Home</span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4 mt-4">
            <Link 
              href="/about"
              className="flex flex-col items-center gap-1 text-white p-3 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Image
                src="/images/Glasses.png"
                alt="About"
                width={24}
                height={24}
                className="invert brightness-0"
              />
              <span className="text-xs">About</span>
            </Link>

            <Link 
              href="/contact"
              className="flex flex-col items-center gap-1 text-white p-3 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Image
                src="/images/Email.png"
                alt="Contact"
                width={24}
                height={24}
                className="invert brightness-0"
              />
              <span className="text-xs">Contact</span>
            </Link>

            <Link 
              href="/collections"
              className="flex flex-col items-center gap-1 text-white p-3 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Image
                src="/images/T_Shirt.png"
                alt="Collections"
                width={24}
                height={24}
                className="invert brightness-0"
              />
              <span className="text-xs">Collections</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-20">
        <section className="min-h-screen bg-[#1A191A] relative flex items-center">
          <div className="w-full max-w-4xl mx-auto p-4 md:p-6 py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">Contact Us</h2>
            <form className="space-y-6 max-w-2xl mx-auto">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 rounded-lg bg-black/70 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                  suppressHydrationWarning
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-lg bg-black/70 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                  suppressHydrationWarning
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows={6}
                  className="w-full p-3 rounded-lg bg-black/70 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-[#6B21A8] text-white font-semibold hover:bg-[#6B21A8]/90 transition-colors"
                suppressHydrationWarning
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
} 
