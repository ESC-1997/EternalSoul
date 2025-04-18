'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState('name');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [modalPage, setModalPage] = useState(1);
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);
  const sections = useRef<{ [key: string]: IntersectionObserverEntry }>({});

  // Track shipping address input
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  // Track payment card input
  const [hasPaymentCard, setHasPaymentCard] = useState(false);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const numbers = value.replace(/\D/g, '');
    
    // Format the number based on length
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 3)})${numbers.slice(3)}`;
    } else {
      return `(${numbers.slice(0, 3)})${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedNumber);
    // Check if the number is complete (10 digits)
    const numbers = formattedNumber.replace(/\D/g, '');
    setIsPhoneValid(numbers.length === 10);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sections.current[entry.target.id] = entry;
        });

        // Find the section that's most visible
        let mostVisibleSection = null;
        let highestRatio = 0;

        Object.entries(sections.current).forEach(([id, entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            mostVisibleSection = id;
          }
        });

        if (mostVisibleSection) {
          setActiveSection(mostVisibleSection);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-20% 0px -50% 0px'
      }
    );

    // Observe all sections
    const sectionElements = document.querySelectorAll('section[id]');
    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    // Check if any profile completion criteria are met
    const isProfileComplete = 
      email !== '' || 
      phoneNumber !== '' || 
      Object.values(shippingAddress).some(value => value !== '') ||
      hasPaymentCard;

    if (isProfileComplete) {
      setHasCompletedProfile(true);
      setShowModal(false);
    }
  }, [email, phoneNumber, shippingAddress, hasPaymentCard]);

  // Update shipping address handler
  const handleShippingAddressChange = (field: string, value: string) => {
    setShippingAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Update payment card handler
  const handlePaymentCardAdded = () => {
    setHasPaymentCard(true);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

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

            <Link 
              href="/profile"
              className="flex flex-col items-center gap-1 text-white p-3 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Image
                src="/images/Profile.png"
                alt="Profile"
                width={24}
                height={24}
                className="invert brightness-0"
              />
              <span className="text-xs">Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-20">
        <div className={`min-h-screen bg-white ${showModal ? 'blur-sm' : ''}`}>
          {/* Sub Navigation */}
          <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
            <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
              <div className="flex gap-2 sm:gap-4 overflow-x-auto">
                <button
                  onClick={() => scrollToSection('name')}
                  className={`px-2 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    activeSection === 'name' ? 'bg-black text-white' : 'text-black hover:bg-gray-100'
                  }`}
                  suppressHydrationWarning
                >
                  Name
                </button>
                <button
                  onClick={() => scrollToSection('preferences')}
                  className={`px-2 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    activeSection === 'preferences' ? 'bg-black text-white' : 'text-black hover:bg-gray-100'
                  }`}
                  suppressHydrationWarning
                >
                  Preferences
                </button>
                <button
                  onClick={() => scrollToSection('shipping')}
                  className={`px-2 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    activeSection === 'shipping' ? 'bg-black text-white' : 'text-black hover:bg-gray-100'
                  }`}
                  suppressHydrationWarning
                >
                  Shipping
                </button>
                <button
                  onClick={() => scrollToSection('payment')}
                  className={`px-2 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    activeSection === 'payment' ? 'bg-black text-white' : 'text-black hover:bg-gray-100'
                  }`}
                  suppressHydrationWarning
                >
                  Payment
                </button>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
            {/* Name Section */}
            <section id="name" className="mb-8 sm:mb-16">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-black">Name</h2>
                <Image
                  src="/images/ID.png"
                  alt="ID"
                  width={24}
                  height={24}
                  className=""
                  priority
                />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors text-sm sm:text-base"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors text-sm sm:text-base"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            </section>

            {/* Preferences Section */}
            <section id="preferences" className="mb-8 sm:mb-16">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-black">Preferences</h2>
                <Image
                  src="/images/Preferences.png"
                  alt="Preferences"
                  width={24}
                  height={24}
                  className=""
                  priority
                />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-100 rounded-lg">
                  <span className="text-sm sm:text-base text-black">Email Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      suppressHydrationWarning 
                    />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
                {emailNotifications && (
                  <div className="pl-4">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={handleEmailChange}
                          className={`w-full p-2 sm:p-3 rounded-lg border text-black transition-all duration-300 text-sm sm:text-base ${
                            isEmailValid 
                              ? 'bg-white border-green-500 focus:border-green-500 shadow-[0_0_0_1px_rgba(34,197,94,0.2)]' 
                              : 'bg-gray-100 border-gray-200 focus:border-black'
                          }`}
                          suppressHydrationWarning
                        />
                        {isEmailValid && (
                          <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-green-500 animate-fade-in">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {isEmailValid && (
                        <button 
                          onClick={() => {
                            setEmail('');
                            setIsEmailValid(false);
                          }}
                          className="text-red-500 hover:text-red-600 transition-colors p-1.5 sm:p-2 hover:bg-red-50 rounded-lg"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {email && !isEmailValid && (
                      <p className="text-xs sm:text-sm text-red-500 mt-1">Please enter a valid email address</p>
                    )}
                  </div>
                )}
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-100 rounded-lg">
                  <span className="text-sm sm:text-base text-black">SMS Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={smsNotifications}
                      onChange={(e) => setSmsNotifications(e.target.checked)}
                      suppressHydrationWarning 
                    />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
                {smsNotifications && (
                  <div className="pl-4">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          type="tel"
                          placeholder="(000)000-0000"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                          maxLength={14}
                          pattern="\(\d{3}\)\d{3}-\d{4}"
                          className={`w-full p-2 sm:p-3 rounded-lg border text-black transition-all duration-300 text-sm sm:text-base ${
                            isPhoneValid 
                              ? 'bg-white border-green-500 focus:border-green-500 shadow-[0_0_0_1px_rgba(34,197,94,0.2)]' 
                              : 'bg-gray-100 border-gray-200 focus:border-black'
                          }`}
                          suppressHydrationWarning
                        />
                        {isPhoneValid && (
                          <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-green-500 animate-fade-in">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {isPhoneValid && (
                        <button 
                          onClick={() => {
                            setPhoneNumber('');
                            setIsPhoneValid(false);
                          }}
                          className="text-red-500 hover:text-red-600 transition-colors p-1.5 sm:p-2 hover:bg-red-50 rounded-lg"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {phoneNumber && !isPhoneValid && (
                      <p className="text-xs sm:text-sm text-red-500 mt-1">Please enter a complete phone number</p>
                    )}
                  </div>
                )}
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-100 rounded-lg">
                  <span className="text-sm sm:text-base text-black">Shirt Size</span>
                  <select className="bg-white border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-black focus:outline-none focus:border-black text-sm sm:text-base" suppressHydrationWarning>
                    <option value="xs">XS</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                    <option value="2xl">2XL</option>
                    <option value="3xl">3XL</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Shipping Address Section */}
            <section id="shipping" className="mb-8 sm:mb-16">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-black">Shipping Address</h2>
                <Image
                  src="/images/Shipping.png"
                  alt="Shipping"
                  width={24}
                  height={24}
                  className=""
                  priority
                />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Street Address"
                    className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors text-sm sm:text-base"
                    value={shippingAddress.street}
                    onChange={(e) => handleShippingAddressChange('street', e.target.value)}
                    suppressHydrationWarning
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors text-sm sm:text-base"
                    value={shippingAddress.city}
                    onChange={(e) => handleShippingAddressChange('city', e.target.value)}
                    suppressHydrationWarning
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors text-sm sm:text-base"
                    value={shippingAddress.state}
                    onChange={(e) => handleShippingAddressChange('state', e.target.value)}
                    suppressHydrationWarning
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors text-sm sm:text-base"
                    value={shippingAddress.zip}
                    onChange={(e) => handleShippingAddressChange('zip', e.target.value)}
                    suppressHydrationWarning
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors text-sm sm:text-base"
                    value={shippingAddress.country}
                    onChange={(e) => handleShippingAddressChange('country', e.target.value)}
                    suppressHydrationWarning
                  />
                </div>
              </div>
            </section>

            {/* Payment Methods Section */}
            <section id="payment" className="mb-8 sm:mb-16">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-black">Payment Methods</h2>
                <Image
                  src="/images/Credit_Card.png"
                  alt="Credit Card"
                  width={24}
                  height={24}
                  className=""
                  priority
                />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-sm sm:text-base text-black font-medium">Credit Card</span>
                    <button className="text-sm sm:text-base text-black hover:text-gray-600" suppressHydrationWarning>Edit</button>
                  </div>
                  <div className="text-sm sm:text-base text-black">•••• •••• •••• 1234</div>
                </div>
                <button 
                  onClick={handlePaymentCardAdded}
                  className="w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base" 
                  suppressHydrationWarning
                >
                  Add Payment Method
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-8">
            <div 
              className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
              onClick={() => setShowModal(false)}
              suppressHydrationWarning
            ></div>
            <div className="relative w-full max-w-5xl bg-white rounded-lg overflow-hidden shadow-xl">
              <div className="relative w-full" style={{ paddingBottom: '50%' }}>
                <img
                  src={modalPage === 1 ? "/images/Preferences_Modal.svg" : "/images/Shipping_Modal.svg"}
                  alt={modalPage === 1 ? "Preferences Modal" : "Shipping Modal"}
                  className="absolute inset-0 w-full h-full"
                  key={modalPage}
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <div 
                      className={`w-2 h-2 rounded-full ${modalPage === 1 ? 'bg-black' : 'bg-gray-300'}`}
                      suppressHydrationWarning
                    ></div>
                    <div 
                      className={`w-2 h-2 rounded-full ${modalPage === 2 ? 'bg-black' : 'bg-gray-300'}`}
                      suppressHydrationWarning
                    ></div>
                  </div>
                  <button
                    onClick={() => {
                      if (modalPage === 1) {
                        setModalPage(2);
                      } else {
                        setShowModal(false);
                      }
                    }}
                    className="px-6 py-3 bg-[#9333EA] text-white rounded-lg font-medium hover:bg-[#6B21A8] transition-colors"
                    suppressHydrationWarning
                  >
                    {modalPage === 1 ? 'Next' : 'Got it'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
