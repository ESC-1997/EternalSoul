'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Content */}
      <div className="relative z-20 flex flex-col flex-1">
        {/* Header */}
<header className="p-0 fixed w-full top-0 bg-black/20 backdrop-blur-sm z-20">
  <div className="max-w-6xl mx-auto flex justify-between items-center">
    <div className="w-[150px]"> {/* Added container with fixed width */}
      <Image
        src="/images/logo.png"
        alt="Eternal Soul Logo"
        width={150}
        height={50}
        className="invert transform -translate-x-6 -translate-y-2" // Using transform instead of margins
        priority
        style={{ width: 'auto', height: 'auto' }}
      />
    </div>
    <nav>
      <ul className="flex gap-6 text-white">
        <li>
          <button 
            onClick={() => scrollToSection('home')} 
            className="hover:text-purple-300 transition-colors"
          >
            Home
          </button>
        </li>
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
</header>

        {/* Main Content */}
        <main className="flex-1">
          {/* Home Section */}
          <section id="home" className="min-h-screen flex flex-col justify-center items-center relative">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/ES Slide Blue.png"
                alt="Background"
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/10 via-white-900/70 to-black/70 animate-gradient"></div>

            <div className="relative z-20 max-w-6xl mx-auto p-6">
              <div className="text-center">
            
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="min-h-screen bg-gradient-to-b from-transparent via-black to-black relative">
            <div className="max-w-4xl mx-auto p-6 pt-24">
              <h2 className="text-4xl font-bold text-white mb-12 text-center">About The Brand</h2>
              <p className="text-white/90 text-xl italic font-bold leading-[3] text-center">
                Eternal Soul Clothing is more than just a fashion label—it's a tribute to the enduring energy within each of us. Rooted in the belief that the soul is eternal and ever-transforming, our brand stands as a reminder that even in moments of darkness, there is light that never fades. Every design is crafted to reflect themes of personal growth, healing, and the invisible strength that carries us forward. Eternal Soul is for those who feel deeply, think boldly, and believe that identity is not fixed—but a continuous journey of becoming. Through quality pieces and meaningful art, we aim to spark connection, conversation, and self-expression in the most authentic form.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="min-h-screen bg-gradient-to-b from-black to-gray-900">
            <div className="max-w-2xl mx-auto p-6 pt-24">
              <h2 className="text-4xl font-bold text-white mb-12 text-center">Contact Us</h2>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          
          <div className="relative overflow-hidden rounded-lg max-w-2xl mx-4 bg-black">
            <div className="relative" style={{ width: '600px', height: '400px' }}>
              <Image
                src="/images/ES Logo Slide Black.png"
                alt="Eternal Soul Modal Background"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                style={{ 
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%'
                }}
                priority
                quality={100}
              />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 bg-black/40">
              <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Coming Soon
              </h2>
              <p className="text-white/90 text-xl text-center drop-shadow-lg max-w-md">
                We're crafting something special for you. In the meantime, feel free to explore our site and learn more about Eternal Soul Clothing.
              </p>
            </div>

            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors bg-black/40 p-2 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}