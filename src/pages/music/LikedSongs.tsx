
import React, { useState } from 'react';
import { Heart, Play, Pause } from 'lucide-react';
import { useMusic } from '../../contexts/MusicContext';
import { formatDuration } from '../../utils/formatters';

const LikedSongs: React.FC = () => {
  const { likedSongs, playTrack, currentTrack, isPlaying, pauseTrack, resumeTrack } = useMusic();
  const [isHovering, setIsHovering] = useState<string | null>(null);

  const handlePlayPause = (trackId: string) => {
    const track = likedSongs.find(song => song.id === trackId);
    
    if (!track) return;
    
    if (currentTrack?.id === trackId) {
      isPlaying ? pauseTrack() : resumeTrack();
    } else {
      playTrack(track);
    }
  };

  return (
    <div className="text-white">
      <div className="flex items-end space-x-6 mb-8">
        <div className="w-52 h-52 bg-gradient-to-br from-purple-700 to-blue-300 flex items-center justify-center shadow-lg">
          <Heart size={80} fill="white" stroke="white" />
        </div>
        <div>
          <p className="uppercase text-sm font-bold">Playlist</p>
          <h1 className="text-5xl font-bold mt-2 mb-4">Liked Songs</h1>
          <p className="text-gray-300">
            {likedSongs.length} {likedSongs.length === 1 ? 'song' : 'songs'}
          </p>
        </div>
      </div>

      {likedSongs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400">Songs you like will appear here</p>
          <button className="mt-4 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-opacity-80 transition">
            Find songs
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <div className="grid grid-cols-12 text-gray-400 border-b border-gray-800 pb-2 px-4">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Title</div>
            <div className="col-span-4">Album</div>
            <div className="col-span-2 text-right">Duration</div>
          </div>

          {likedSongs.map((song, index) => (
            <div
              key={song.id}
              className={`grid grid-cols-12 items-center py-2 px-4 rounded ${
                isHovering === song.id ? 'bg-gray-800' : 'hover:bg-gray-800'
              } transition-colors`}
              onMouseEnter={() => setIsHovering(song.id)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div className="col-span-1">
                {isHovering === song.id ? (
                  <button onClick={() => handlePlayPause(song.id)}>
                    {currentTrack?.id === song.id && isPlaying ? (
                      <Pause size={20} />
                    ) : (
                      <Play size={20} fill="white" />
                    )}
                  </button>
                ) : (
                  <span className={`${currentTrack?.id === song.id ? 'text-green-500' : ''}`}>
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="col-span-5 flex items-center">
                <img 
                  src={song.coverArt} 
                  alt={song.title} 
                  className="w-10 h-10 mr-3" 
                />
                <div>
                  <p className={`font-medium ${currentTrack?.id === song.id ? 'text-green-500' : 'text-white'}`}>
                    {song.title}
                  </p>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                </div>
              </div>
              <div className="col-span-4 text-gray-400">{song.album}</div>
              <div className="col-span-2 text-right text-gray-400">
                {formatDuration(song.duration)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedSongs;
