
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Student Database Management. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-1">Powered by React & Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default Footer;
