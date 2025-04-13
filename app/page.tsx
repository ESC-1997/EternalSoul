'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Content */}
      <div className="relative z-20 flex flex-col flex-1">
        {/* Header */}
        <header className="p-0 fixed w-full top-0 bg-black/20 backdrop-blur-sm z-20">
          <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
            <div className="w-[120px] md:w-[150px]">
              <button 
                onClick={() => scrollToSection('home')}
                className="cursor-pointer"
              >
                <Image
                  src="/images/logo.png"
                  alt="Eternal Soul Logo"
                  width={150}
                  height={50}
                  className="invert transform -translate-x-2 md:-translate-x-6 -translate-y-2 hover:invert-0 transition-all duration-300"
                  priority
                  style={{ width: 'auto', height: 'auto' }}
                />
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex gap-6 text-white">
                <li>
                  <button 
                    onClick={() => scrollToSection('about')} 
                    className="hover:text-purple-300 transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')} 
                    className="hover:text-purple-300 transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden bg-black/90 backdrop-blur-sm">
              <ul className="flex flex-col text-white">
                <li>
                  <button 
                    onClick={() => scrollToSection('about')} 
                    className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')} 
                    className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {/* Home Section */}
          <section id="home" className="min-h-screen flex flex-col justify-center items-center relative pt-16">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/ES Slide Purple.png"
                alt="Background"
                fill
                sizes="100vw"
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center',
                  width: '100%',
                  height: '100%',
                  maxHeight: '100vh'
                }}
                className="md:object-cover object-contain"
                priority
              />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#6B21A8]/50 from-40% via-70% to-[#6B7280]"></div>

            <div className="relative z-20 max-w-6xl mx-auto p-6">
              <div className="text-center">
            
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="min-h-screen bg-[#6B7280] relative">
            <div className="max-w-4xl mx-auto p-4 md:p-6 pt-24">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12 text-center">About The Brand</h2>
              <p className="text-black text-lg md:text-xl italic font-bold leading-relaxed md:leading-[3] text-center">
                Eternal Soul Clothing is more than just a fashion label—it's a tribute to the enduring energy within each of us. Rooted in the belief that the soul is eternal and ever-transforming, our brand stands as a reminder that even in moments of darkness, there is light that never fades. Every design is crafted to reflect themes of personal growth, healing, and the invisible strength that carries us forward. Eternal Soul is for those who feel deeply, think boldly, and believe that identity is not fixed—but a continuous journey of becoming. Through quality pieces and meaningful art, we aim to spark connection, conversation, and self-expression in the most authentic form.
              </p>
            </div>
            {/* Gradient transition to contact section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-[#6B7280] to-black"></div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="min-h-screen bg-black">
            <div className="max-w-2xl mx-auto p-4 md:p-6 pt-24">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">Contact Us</h2>
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    rows={6}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="p-6 bg-gray-900">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-purple-200">Eternal Soul Clothing 2024</p>
          </div>
        </footer>
      </div>

      {/* Coming Soon Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          
          <div className="relative overflow-hidden rounded-lg w-full max-w-2xl bg-black">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <Image
                src="/images/ES Logo Slide Teal.png"
                alt="Eternal Soul Modal Background"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                style={{ 
                  objectFit: 'contain',
                }}
                priority
                quality={100}
              />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 bg-black/40">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-center font-serif [text-shadow:_2px_2px_8px_rgb(0_0_0_/_100%)]">
                Coming Soon
              </h2>
              <p className="text-white text-xl md:text-2xl lg:text-3xl text-center max-w-md font-sans font-bold [text-shadow:_1px_1px_4px_rgb(0_0_0_/_100%)]">
                We're crafting something special for you. In the meantime, feel free to explore our site and learn more about Eternal Soul Clothing.
              </p>
            </div>

            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-white hover:text-black transition-all bg-black/60 hover:bg-white p-1.5 md:p-2 rounded-lg shadow-lg border-2 border-white/50 hover:border-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
