"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-200 px-6 py-8 dark:bg-slate-900 mt-auto">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center sm:text-left">
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center space-y-4">
          <Link href="/" className="text-xl font-semibold text-gray-900 dark:text-white">
            Work Manager
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Copyright &copy; {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>

        {/* About Section */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About</h3>
          <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            About Us
          </Link>
          <Link href="/about/team" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            Our Team
          </Link>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            123 Main Street, New York, NY 10001
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <Link href="mailto:info@workmanager.com" className="hover:text-gray-900 dark:hover:text-white">
              info@workmanager.com
            </Link>
          </p>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Follow Us</h3>
          <div className="flex justify-center space-x-6">
            {/* Twitter Icon */}
            <Link href="https://twitter.com/workmanager" aria-label="Twitter" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </Link>
            
            {/* GitHub Icon */}
            <Link href="https://github.com/workmanager" aria-label="GitHub" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 01-2-2z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

