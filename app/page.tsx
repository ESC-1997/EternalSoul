'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false); // Close mobile menu after clicking
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Content */}
      <div className="relative z-20 flex flex-col flex-1">
        {/* Header */}
        <header className="p-0 fixed w-full top-0 bg-black/20 backdrop-blur-sm z-20">
          <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
            <div className="w-[120px] md:w-[150px] -ml-6 md:-ml-12">
              <button 
                onClick={() => scrollToSection('home')}
                className="cursor-pointer"
                suppressHydrationWarning
              >
                <Image
                  src="/images/logo.png"
                  alt="Eternal Soul Logo"
                  width={150}
                  height={50}
                  className="invert transform -translate-y-1 hover:invert-0 transition-all duration-300"
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
            <nav className="hidden md:block mr-12">
              <ul className="flex gap-12 text-white">
                <li>
                  <button 
                    onClick={() => scrollToSection('about')} 
                    className="hover:text-purple-300 transition-colors text-lg font-medium"
                    suppressHydrationWarning
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')} 
                    className="hover:text-purple-300 transition-colors text-lg font-medium"
                    suppressHydrationWarning
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
          <section id="home" className="min-h-screen flex flex-col justify-center items-center relative pt-16 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full"
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  objectFit: 'cover'
                }}
              >
                <source src="/background_official.mp4" type="video/mp4" />
                <p>Your browser does not support the video tag.</p>
              </video>
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#6B21A8]/50 from-40% via-70% to-[#6B21A8]"></div>

            <div className="relative z-20 max-w-6xl mx-auto p-6 h-screen flex items-center justify-center">
              <div className="text-center -mt-32">
                <Image
                  src="/Eternal Soul Elegant.png"
                  alt="Eternal Soul"
                  width={800}
                  height={400}
                  className="mx-auto w-full max-w-3xl drop-shadow-[0_0_25px_rgba(0,0,0,0.5)] [text-shadow:_0_0_25px_rgba(0,0,0,0.5)] opacity-100"
                  priority
                />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="min-h-screen bg-[#6B21A8] relative -mt-[1px] flex items-center">
            <div className="max-w-4xl mx-auto p-4 md:p-6 py-24 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">About The Brand</h2>
              <p className="text-white text-lg md:text-xl italic font-bold leading-relaxed md:leading-[3] text-center">
                Eternal Soul Clothing is more than just a fashion label—it's a tribute to the enduring energy within each of us. Rooted in the belief that the soul is eternal and ever-transforming, our brand stands as a reminder that even in moments of darkness, there is light that never fades. Every design is crafted to reflect themes of personal growth, healing, and the invisible strength that carries us forward. Eternal Soul is for those who feel deeply, think boldly, and believe that identity is not fixed—but a continuous journey of becoming. Through quality pieces and meaningful art, we aim to spark connection, conversation, and self-expression in the most authentic form.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="min-h-screen bg-black relative -mt-[1px] flex items-center">
            <div className="w-full max-w-4xl mx-auto p-4 md:p-6 py-24">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">Contact Us</h2>
              <form className="space-y-6 max-w-2xl mx-auto">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                    suppressHydrationWarning
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
                  suppressHydrationWarning
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

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-[#6B21A8] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-purple-700 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* Coming Soon Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={() => setShowModal(false)}
          ></div>
          
          <div className="relative overflow-hidden rounded-lg w-full max-w-2xl bg-transparent">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12">
              <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 text-center font-serif [text-shadow:_0_0_15px_rgb(107_33_168_/_100%)]">
                Coming Soon
              </h2>
              <p className="text-white text-xl md:text-2xl lg:text-2xl text-center max-w-md font-sans font-bold [text-shadow:_0_0_10px_rgb(107_33_168_/_100%)]">
                We're crafting something special for you. In the meantime, feel free to explore our site and learn more about Eternal Soul Clothing.
              </p>
            </div>

            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-white hover:text-white transition-all bg-black/60 hover:bg-[#6B21A8] p-1.5 md:p-2 rounded-lg shadow-lg border-2 border-white/50 hover:border-white"
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
