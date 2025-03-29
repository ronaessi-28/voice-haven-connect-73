
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Player from '../components/player/Player';
import NavigationBar from '../components/navigation/NavigationBar';
import RoomButton from '../components/room/RoomButton';

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [navHistory, setNavHistory] = useState<string[]>([]);
  const [currentNavIndex, setCurrentNavIndex] = useState(-1);

  // Navigation history management
  const canGoBack = currentNavIndex > 0;
  const canGoForward = currentNavIndex < navHistory.length - 1;

  const handleNavigate = (path: string) => {
    // Remove any forward history if we're navigating from a back state
    const newHistory = navHistory.slice(0, currentNavIndex + 1);
    setNavHistory([...newHistory, path]);
    setCurrentNavIndex(newHistory.length);
    navigate(path);
  };

  const handleBack = () => {
    if (canGoBack) {
      const newIndex = currentNavIndex - 1;
      setCurrentNavIndex(newIndex);
      navigate(navHistory[newIndex]);
    }
  };

  const handleForward = () => {
    if (canGoForward) {
      const newIndex = currentNavIndex + 1;
      setCurrentNavIndex(newIndex);
      navigate(navHistory[newIndex]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <NavigationBar 
            onBack={handleBack}
            onForward={handleForward}
            canGoBack={canGoBack}
            canGoForward={canGoForward}
          />
          <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-900 to-black">
            <Outlet />
          </div>
        </div>
      </div>
      <Player />
      <RoomButton />
    </div>
  );
};

export default MainLayout;
