
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, Plus, Heart, Music, Settings } from 'lucide-react';
import { useMusic } from '../../contexts/MusicContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { createPlaylist, playlists } = useMusic();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleCreatePlaylist = () => {
    const name = prompt('Enter playlist name:');
    if (name) {
      createPlaylist(name);
    }
  };

  return (
    <div className="w-64 bg-black text-white flex flex-col h-full">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">TuneTalk</h1>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-6">
        <div className="space-y-4">
          <Link
            to="/"
            className={`flex items-center space-x-3 text-gray-300 hover:text-white transition-colors ${
              isActive('/') ? 'text-white' : ''
            }`}
          >
            <Home size={24} />
            <span>Home</span>
          </Link>
          
          <Link
            to="/search"
            className={`flex items-center space-x-3 text-gray-300 hover:text-white transition-colors ${
              isActive('/search') ? 'text-white' : ''
            }`}
          >
            <Search size={24} />
            <span>Search</span>
          </Link>
          
          <Link
            to="/library"
            className={`flex items-center space-x-3 text-gray-300 hover:text-white transition-colors ${
              isActive('/library') ? 'text-white' : ''
            }`}
          >
            <Library size={24} />
            <span>Your Library</span>
          </Link>

          <Link
            to="/dashboard"
            className={`flex items-center space-x-3 text-gray-300 hover:text-white transition-colors ${
              isActive('/dashboard') ? 'text-white' : ''
            }`}
          >
            <Music size={24} />
            <span>Music Dashboard</span>
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Library Section */}
        <div className="space-y-4">
          <button
            onClick={handleCreatePlaylist}
            className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors w-full text-left"
          >
            <Plus size={24} />
            <span>Create Playlist</span>
          </button>
          
          <Link
            to="/liked-songs"
            className={`flex items-center space-x-3 text-gray-300 hover:text-white transition-colors ${
              isActive('/liked-songs') ? 'text-white' : ''
            }`}
          >
            <Heart size={24} />
            <span>Liked Songs</span>
          </Link>
        </div>

        {/* Playlists */}
        {playlists.length > 0 && (
          <div className="mt-6">
            <h3 className="text-gray-400 text-sm font-semibold mb-3">PLAYLISTS</h3>
            <div className="space-y-2">
              {playlists.map((playlist) => (
                <Link
                  key={playlist.id}
                  to={`/playlist/${playlist.id}`}
                  className="block text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {playlist.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Settings */}
      <div className="p-6 border-t border-gray-800">
        <Link
          to="/settings"
          className={`flex items-center space-x-3 text-gray-300 hover:text-white transition-colors ${
            isActive('/settings') ? 'text-white' : ''
          }`}
        >
          <Settings size={24} />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
