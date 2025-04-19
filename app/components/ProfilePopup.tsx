'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  shirtSize: string;
}

export default function ProfilePopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [activeSection, setActiveSection] = useState('name');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [shirtSize, setShirtSize] = useState('m');
  const [saveStatus, setSaveStatus] = useState<{[key: string]: string}>({});
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginEmailValid, setIsLoginEmailValid] = useState(false);
  const [isLoginPhoneValid, setIsLoginPhoneValid] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
    hasMinLength: false
  });

  // Check for existing login state on mount
  useEffect(() => {
    const authState = localStorage.getItem('authState');
    if (authState) {
      setIsLoggedIn(true);
      loadProfileData();
    }
  }, []);

  // Load saved profile data
  const loadProfileData = () => {
    const loginData = localStorage.getItem('loginData');
    if (loginData) {
      const data = JSON.parse(loginData);
      if (data.profile) {
        setFirstName(data.profile.firstName || '');
        setLastName(data.profile.lastName || '');
        setEmail(data.profile.email || '');
        setPhoneNumber(data.profile.phoneNumber || '');
        setEmailNotifications(data.profile.emailNotifications || false);
        setSmsNotifications(data.profile.smsNotifications || false);
        setShirtSize(data.profile.shirtSize || 'm');
        
        if (data.profile.email) setIsEmailValid(validateEmail(data.profile.email));
        if (data.profile.phoneNumber) setIsPhoneValid(data.profile.phoneNumber.replace(/\D/g, '').length === 10);
      }
    }
  };

  // Handle login
  const handleLogin = () => {
    setShowLoginForm(true);
    setIsSignUp(false);
  };

  // Handle signup
  const handleSignup = () => {
    setShowLoginForm(true);
    setIsSignUp(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authState');
    localStorage.removeItem('loginData');
    setIsLoggedIn(false);
    // Reset all form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setEmailNotifications(false);
    setSmsNotifications(false);
    setShirtSize('m');
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

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)})${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)})${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedNumber);
    const numbers = formattedNumber.replace(/\D/g, '');
    setIsPhoneValid(numbers.length === 10);
  };

  const handleLoginEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setLoginEmail(newEmail);
    setIsLoginEmailValid(validateEmail(newEmail));
  };

  const handleLoginPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setLoginPhone(formattedNumber);
    const numbers = formattedNumber.replace(/\D/g, '');
    setIsLoginPhoneValid(numbers.length === 10);
  };

  const validatePassword = (pass: string) => {
    setPasswordCriteria({
      hasUpperCase: /[A-Z]/.test(pass),
      hasLowerCase: /[a-z]/.test(pass),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      hasMinLength: pass.length >= 6
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const isPasswordValid = () => {
    return Object.values(passwordCriteria).every(criterion => criterion);
  };

  const handleFormSubmit = () => {
    if ((isLoginEmailValid || isLoginPhoneValid) && isPasswordValid()) {
      // In a real app, this would be an API call
      localStorage.setItem('authState', 'true');
      const loginData = {
        email: loginEmail,
        phone: loginPhone,
        password: password, // Note: In a real app, this should be hashed
        profile: {
          firstName: '',
          lastName: '',
          email: loginEmail,
          phoneNumber: loginPhone,
          emailNotifications: false,
          smsNotifications: false,
          shirtSize: 'm'
        }
      };
      localStorage.setItem('loginData', JSON.stringify(loginData));
      setIsLoggedIn(true);
      setShowLoginForm(false);
      setActiveSection('name');
      
      // If user logged in with email, pre-populate email field
      if (isLoginEmailValid) {
        setEmail(loginEmail);
        setIsEmailValid(true);
      }
      
      // If user logged in with phone, pre-populate phone field
      if (isLoginPhoneValid) {
        setPhoneNumber(loginPhone);
        setIsPhoneValid(true);
      }
    }
  };

  // Update the email notifications toggle
  const handleEmailNotificationsToggle = (checked: boolean) => {
    setEmailNotifications(checked);
    if (checked) {
      const loginData = localStorage.getItem('loginData');
      if (loginData) {
        const { email } = JSON.parse(loginData);
        if (email) {
          setEmail(email);
          setIsEmailValid(true);
        }
      }
    }
  };

  // Update the SMS notifications toggle
  const handleSmsNotificationsToggle = (checked: boolean) => {
    setSmsNotifications(checked);
    if (checked) {
      const loginData = localStorage.getItem('loginData');
      if (loginData) {
        const { phone } = JSON.parse(loginData);
        if (phone) {
          setPhoneNumber(phone);
          setIsPhoneValid(true);
        }
      }
    }
  };

  const saveProfile = () => {
    const loginData = localStorage.getItem('loginData');
    if (loginData) {
      const data = JSON.parse(loginData);
      data.profile = {
        firstName,
        lastName,
        email,
        phoneNumber,
        emailNotifications,
        smsNotifications,
        shirtSize
      };
      localStorage.setItem('loginData', JSON.stringify(data));
      
      setSaveStatus(prev => ({
        ...prev,
        profile: 'Saved!'
      }));
      
      setTimeout(() => {
        setSaveStatus(prev => ({
          ...prev,
          profile: ''
        }));
      }, 2000);
    }
  };

  // Update the save buttons to use the new saveProfile function
  const handleSaveName = () => {
    saveProfile();
  };

  const handleSavePreferences = () => {
    saveProfile();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-screen w-full max-w-full sm:max-w-md bg-black/75 shadow-xl overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-end p-4">
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {!isLoggedIn ? (
            <div className="flex-1 px-4 sm:px-6 -mt-4">
              {!showLoginForm ? (
                <>
                  <div className="flex flex-col items-center">
                    <Image
                      src="/images/logo.png"
                      alt="Eternal Soul Logo"
                      width={120}
                      height={120}
                      className="mb-4 sm:mb-6 invert"
                    />
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Inter'] mb-6 sm:mb-8">Eternal Soul Login</h2>
                    <p className="text-white text-center mb-3 sm:mb-4">
                      <span className="font-bold">Your Soul Called—It Wants Early Access.</span>
                    </p>
                    <p className="text-white text-center text-xs sm:text-sm mb-6 sm:mb-8">
                      Sign up or log in to join our exclusive community and be the first to experience Eternal Soul.
                    </p>
                    <div className="flex flex-col items-center space-y-4">
                      <button
                        onClick={handleLogin}
                        className="w-full sm:w-72 px-4 py-2 bg-[#6B21A8] text-white rounded-lg hover:bg-[#581C87] transition-colors font-bold"
                      >
                        Login
                      </button>
                      <button
                        onClick={handleSignup}
                        className="w-full sm:w-72 px-4 py-2 border border-[#6B21A8] bg-black text-white rounded-lg hover:bg-gray-900 transition-colors font-bold"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setShowLoginForm(false)}
                    className="self-start mb-4 text-white hover:text-gray-300 transition-colors z-[60]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Playfair_Display'] mb-6 sm:mb-8">
                    {isSignUp ? 'Create Your Account' : 'Login to Your Account'}
                  </h2>
                  <div className="w-full max-w-sm space-y-4">
                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder="EMAIL ADDRESS"
                        value={loginEmail}
                        onChange={handleLoginEmailChange}
                        className={`w-full p-3 rounded-lg bg-gray-800 border ${
                          loginEmail ? (isLoginEmailValid ? 'border-green-500' : 'border-red-500') : 'border-gray-700'
                        } text-white placeholder-gray-400 uppercase font-['Inter']`}
                      />
                      <p className="text-center text-gray-400 text-sm uppercase font-['Inter']">or</p>
                      <input
                        type="tel"
                        placeholder="PHONE NUMBER"
                        value={loginPhone}
                        onChange={handleLoginPhoneChange}
                        className={`w-full p-3 rounded-lg bg-gray-800 border ${
                          loginPhone ? (isLoginPhoneValid ? 'border-green-500' : 'border-red-500') : 'border-gray-700'
                        } text-white placeholder-gray-400 uppercase font-['Inter']`}
                      />
                    </div>
                    <div className="space-y-2">
                      <input
                        type="password"
                        placeholder="PASSWORD"
                        value={password}
                        onChange={handlePasswordChange}
                        className={`w-full p-3 rounded-lg bg-gray-800 border ${
                          password ? (isPasswordValid() ? 'border-green-500' : 'border-red-500') : 'border-gray-700'
                        } text-white placeholder-gray-400 uppercase font-['Inter']`}
                      />
                      {isSignUp && (
                        <div className="text-xs text-gray-400 space-y-1">
                          <p className={`flex items-center ${passwordCriteria.hasUpperCase ? 'text-green-500' : ''}`}>
                            <span className="mr-2">{passwordCriteria.hasUpperCase ? '✓' : '•'}</span>
                            At least 1 uppercase letter
                          </p>
                          <p className={`flex items-center ${passwordCriteria.hasLowerCase ? 'text-green-500' : ''}`}>
                            <span className="mr-2">{passwordCriteria.hasLowerCase ? '✓' : '•'}</span>
                            At least 1 lowercase letter
                          </p>
                          <p className={`flex items-center ${passwordCriteria.hasSpecialChar ? 'text-green-500' : ''}`}>
                            <span className="mr-2">{passwordCriteria.hasSpecialChar ? '✓' : '•'}</span>
                            At least 1 special character
                          </p>
                          <p className={`flex items-center ${passwordCriteria.hasMinLength ? 'text-green-500' : ''}`}>
                            <span className="mr-2">{passwordCriteria.hasMinLength ? '✓' : '•'}</span>
                            Minimum 6 characters
                          </p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleFormSubmit}
                      disabled={!((isLoginEmailValid || isLoginPhoneValid) && isPasswordValid())}
                      className={`w-full px-4 py-2 rounded-lg ${
                        (isLoginEmailValid || isLoginPhoneValid) && isPasswordValid()
                          ? 'bg-[#6B21A8] text-white hover:bg-[#581C87]'
                          : 'bg-[#6B21A8] text-white opacity-50 cursor-not-allowed'
                      } transition-colors uppercase font-['Inter']`}
                    >
                      {isSignUp ? 'Create Account' : 'Continue'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Profile</h2>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    Logout
                  </button>
                </div>

                {/* Profile Sections */}
                <div className="space-y-8">
                  {/* Name Section */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Name</h3>
                      <button
                        onClick={handleSaveName}
                        className="px-4 py-2 bg-[#6B21A8] text-white rounded-lg hover:bg-[#581C87] transition-colors text-sm"
                      >
                        {saveStatus.profile || 'Save'}
                      </button>
                    </div>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
                      />
                    </div>
                  </section>

                  {/* Preferences Section */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Preferences</h3>
                      <button
                        onClick={handleSavePreferences}
                        className="px-4 py-2 bg-[#6B21A8] text-white rounded-lg hover:bg-[#581C87] transition-colors text-sm"
                      >
                        {saveStatus.profile || 'Save'}
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-white">Email Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={emailNotifications}
                            onChange={(e) => handleEmailNotificationsToggle(e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6B21A8]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6B21A8]"></div>
                        </label>
                      </div>
                      {emailNotifications && (
                        <div className="pl-4">
                          <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={handleEmailChange}
                            className={`w-full p-3 rounded-lg border text-white placeholder-gray-400 ${
                              isEmailValid ? 'border-green-500 bg-gray-800' : 'border-gray-700 bg-gray-800'
                            }`}
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-white">SMS Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={smsNotifications}
                            onChange={(e) => handleSmsNotificationsToggle(e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6B21A8]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6B21A8]"></div>
                        </label>
                      </div>
                      {smsNotifications && (
                        <div className="pl-4">
                          <input
                            type="tel"
                            placeholder="(000)000-0000"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            className={`w-full p-3 rounded-lg border text-white placeholder-gray-400 ${
                              isPhoneValid ? 'border-green-500 bg-gray-800' : 'border-gray-700 bg-gray-800'
                            }`}
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-white">Shirt Size</span>
                        <select 
                          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                          value={shirtSize}
                          onChange={(e) => setShirtSize(e.target.value)}
                        >
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
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
