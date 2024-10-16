import React from 'react';

const Header: React.FC = () => (
  <header className="bg-white border-b border-gray-200">
    <div className="container mx-auto px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <img src="/logo.svg" alt="Trumarket Logo" className="h-5" />
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-gray-700 hover:text-gray-900">
                Deals
              </a>
            </li>
            {/* <li className="flex items-center">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Manage
              </a>
              <ChevronDown size={16} className="ml-1" />
            </li> */}
          </ul>
        </nav>
      </div>
      {/* <div className="flex items-center space-x-4">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm">
          Connect Wallet
        </button>
        <Menu size={24} className="text-gray-700" />
      </div> */}
    </div>
  </header>
);

const Footer: React.FC = () => (
  <footer className="bg-white border-t border-gray-200">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src="/logo.svg" alt="Trumarket Logo" className="h-5" />
        <a target="_blank" href="https://trumarket.tech">
          <span className="text-sm text-gray-600">©️ 2024 Trumarket</span>
        </a>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a
              target="_blank"
              href="https://trumarket.tech/privacy-policy"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://trumarket.tech/terms-and-conditions"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://trumarket.tech/contactus"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

// Preview component
const Scaffold: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Scaffold;
