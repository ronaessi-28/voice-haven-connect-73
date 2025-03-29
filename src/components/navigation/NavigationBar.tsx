
import React from 'react';
import { ChevronLeft, ChevronRight, Search, Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavigationBarProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  canGoBack,
  canGoForward,
  onBack,
  onForward
}) => {
  return (
    <div className="flex justify-between items-center py-4 px-6 bg-gray-900 sticky top-0 z-10">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className={`rounded-full p-1 bg-black ${
            canGoBack ? 'hover:bg-gray-800 cursor-pointer' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <ChevronLeft />
        </button>
        <button
          onClick={onForward}
          disabled={!canGoForward}
          className={`rounded-full p-1 bg-black ${
            canGoForward ? 'hover:bg-gray-800 cursor-pointer' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <ChevronRight />
        </button>
        <div className="relative ml-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full w-80 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/settings" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
          <Bell size={20} />
        </Link>
        <Link to="/profile" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
          <User size={20} />
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
