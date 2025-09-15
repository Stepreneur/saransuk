'use client';
import { Globe, ChevronDown } from 'lucide-react';
import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
const Navbar = ({pageName}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('TH');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const languages = [
    { code: 'TH', name: 'ไทย' },
    { code: 'EN', name: 'English' },
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className='bg-transparent fixed pt-3 top-0 left-0 right-0 z-50'>
        <nav className="">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 self-center">
              <Image src="/logo.png" width={200} height={200} className='w-[70px] h-[70px]' />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                
                <div className='flex items-center gap-1 h-max justify-center self-center relative'>
                    
                    {/* Custom Language Dropdown */}
                    <div onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    className="hover:bg-gray-100 rounded-md px-2 py-1 gap-2 focus:outline-none focus:ring-2 focus:ring-green-500 relative flex items-center  h-max justify-center self-center" ref={dropdownRef}>
                        <Globe width={17} height={17} className='text-white' />
                        <button
                            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                            className="flex items-center gap-2  text-white   transition-colors duration-200 "
                        >
                            <span className="text-sm font-medium">{currentLanguage.code}</span>
                            <ChevronDown 
                                width={14} 
                                height={14} 
                                className={`transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isLanguageDropdownOpen && (
                            <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                                {languages.map((language) => (
                                    <button
                                        key={language.code}
                                        onClick={() => {
                                            setSelectedLanguage(language.code);
                                            setIsLanguageDropdownOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                                            selectedLanguage === language.code 
                                                ? 'bg-green-50 text-green-700 border-l-4 border-green-500' 
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        <span className="text-lg">{language.flag}</span>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{language.name}</span>
                                            <span className="text-xs text-gray-500">{language.code}</span>
                                        </div>
                                        {selectedLanguage === language.code && (
                                            <div className="ml-auto">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

              </div>
            </div>

            {/* Hamburger Menu */}
            <div className="md:hidden flex items-center gap-2">
            <div onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    className="hover:bg-gray-100 rounded-md px-2 py-1 gap-2 focus:outline-none focus:ring-2 focus:ring-green-500 relative flex items-center  h-max justify-center self-center" ref={dropdownRef}>
                        <Globe width={17} height={17} className='text-white' />
                        <button
                            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                            className="flex items-center gap-2  text-white   transition-colors duration-200 "
                        >
                            <span className="text-sm font-medium">{currentLanguage.code}</span>
                            <ChevronDown 
                                width={14} 
                                height={14} 
                                className={`transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isLanguageDropdownOpen && (
                            <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                                {languages.map((language) => (
                                    <button
                                        key={language.code}
                                        onClick={() => {
                                            setSelectedLanguage(language.code);
                                            setIsLanguageDropdownOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                                            selectedLanguage === language.code 
                                                ? 'bg-green-50 text-green-700 border-l-4 border-green-500' 
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        <span className="text-lg">{language.flag}</span>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{language.name}</span>
                                            <span className="text-xs text-gray-500">{language.code}</span>
                                        </div>
                                        {selectedLanguage === language.code && (
                                            <div className="ml-auto">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
                <a href="#services" className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium">
                  บริการ
                </a>
                <a href="#testimonials" className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium">
                  รีวิว
                </a>
                <a href="#faq" className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium">
                  คำถาม
                </a>
                <a href="#contact" className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium">
                  ติดต่อ
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar