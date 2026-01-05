import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">
            MyEcommerce
          </h3>
          <p className="text-sm text-gray-400">
            Your trusted store for best products.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Support
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Need help? Reach out to our support team for fast and reliable
            assistance with your orders and account.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700">
        <p className="text-center text-sm text-gray-400 py-4">
          © {new Date().getFullYear()} MyEcommerce. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
