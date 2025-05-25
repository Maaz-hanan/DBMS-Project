
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary-dark shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              Student Management System
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
