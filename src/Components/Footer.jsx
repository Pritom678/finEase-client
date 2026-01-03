import React from "react";
import financeImg from "../assets/Business-and-financial-logo-design-template-isolated-on-transparent-background-PNG-removebg-preview.png";
import {
  HiOutlineXMark,          // Not needed, but example
  HiOutlineGlobeAlt,       // Placeholder if no exact match
} from "react-icons/hi2";
// Note: Heroicons v2 outline does NOT have direct social icons like Twitter/X, Facebook, GitHub, or YouTube.
// We'll use close alternatives or keep solid for social if preferred.
// For true outline social icons, you could use lucide-react or other sets, but to stay consistent:
// Using solid versions from hi2 (they look great and match style)

import {
  HiOutlineGlobeAlt as HiOutlineTwitter,   // No exact X
  HiOutlineGlobeAlt as HiOutlineFacebook,
  HiOutlineGlobeAlt as HiOutlineGithub,
  HiOutlineGlobeAlt as HiOutlineYoutube,
} from "react-icons/hi2";

// Better alternative: Use Font Awesome outline from react-icons/fa6 (has exact X, Facebook, GitHub, Youtube outline)
import {
  FaXTwitter,
  FaFacebookF,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-[#0f172a] border-t border-slate-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Logo & Description */}
          <aside className="space-y-5">
            <div className="flex items-center gap-4">
              <img src={financeImg} alt="FinEase logo" className="w-16" />
              <h1 className="text-2xl font-bold">
                <span className="text-teal-600 dark:text-teal-400">FinEase</span> Industries Ltd.
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs">
              Providing reliable financial guidance and tools to help you achieve financial freedom since 2025.
            </p>
          </aside>

          {/* Company Links */}
          <nav className="space-y-4">
            <h6 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Company
            </h6>
            <ul className="space-y-3">
              <li>
                <a className="link link-hover text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a className="link link-hover text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a className="link link-hover text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a className="link link-hover text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </nav>

          {/* Social Links */}
          <nav className="space-y-4">
            <h6 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Follow Us
            </h6>
            <div className="flex gap-5">
              <a
                href="#"
                className="group p-3 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-600 dark:hover:bg-teal-700 hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="group p-3 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-600 dark:hover:bg-teal-700 hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="group p-3 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-600 dark:hover:bg-teal-700 hover:text-white transition-all duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="group p-3 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-600 dark:hover:bg-teal-700 hover:text-white transition-all duration-300"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </nav>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2026 FinEase Industries Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;