
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="bg-primary text-white font-bold text-xl p-2 rounded-lg">X</div>
      <div className="text-xl font-bold ml-1">
        <span className="text-primary">pense</span>
        <span className="text-primary-700">S</span>
      </div>
    </Link>
  );
};

export default Logo;
