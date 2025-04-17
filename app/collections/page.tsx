'use client';

import Image from "next/image";
import Link from "next/link";

export default function CollectionsPage() {
  // Modal is always shown and can't be closed
  const showModal = true;

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
        <div className="min-h-screen relative">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/ES Slash BG Grey.png"
              alt="Collections Background"
              fill
              className="object-cover blur-sm"
              priority
            />
          </div>
          
          {/* Non-closeable Modal */}
          {showModal && (
            <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
              <div className="relative overflow-hidden rounded-lg w-full max-w-2xl bg-transparent">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 md:mb-8 text-center font-serif [text-shadow:_0_0_15px_rgb(107_33_168_/_100%)]">
                    Coming Soon
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-md font-sans font-bold [text-shadow:_0_0_10px_rgb(107_33_168_/_100%)]">
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
