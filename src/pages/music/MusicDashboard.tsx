
import React, { useState } from 'react';
import { useMusic } from '../../contexts/MusicContext';
import { Track } from '../../types/music';
import { Plus, Music, User, Album, Clock } from 'lucide-react';
import { formatDuration } from '../../utils/formatters';

const MusicDashboard: React.FC = () => {
  const { queue, playTrack, addToQueue } = useMusic();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTrack, setNewTrack] = useState({
    title: '',
    artist: '',
    album: '',
    duration: 0,
    coverArt: '',
    audioSrc: ''
  });

  const handleAddTrack = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTrack.title || !newTrack.artist || !newTrack.audioSrc) {
      alert('Please fill in all required fields');
      return;
    }

    const track: Track = {
      id: `track-${Date.now()}`,
      title: newTrack.title,
      artist: newTrack.artist,
      artistId: `artist-${Date.now()}`,
      album: newTrack.album || 'Unknown Album',
      duration: newTrack.duration || 180,
      coverArt: newTrack.coverArt || '/assets/images/covers/default.jpg',
      audioSrc: newTrack.audioSrc
    };

    addToQueue(track);
    setNewTrack({
      title: '',
      artist: '',
      album: '',
      duration: 0,
      coverArt: '',
      audioSrc: ''
    });
    setShowAddForm(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Music Dashboard</h1>
        <p className="text-gray-400">Manage and add songs to your library</p>
      </div>

      {/* Add New Track Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add New Song
        </button>
      </div>

      {/* Add Track Form */}
      {showAddForm && (
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Add New Track</h2>
          <form onSubmit={handleAddTrack} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Song Title *</label>
                <input
                  type="text"
                  value={newTrack.title}
                  onChange={(e) => setNewTrack({...newTrack, title: e.target.value})}
                  className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  placeholder="Enter song title"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Artist Name *</label>
                <input
                  type="text"
                  value={newTrack.artist}
                  onChange={(e) => setNewTrack({...newTrack, artist: e.target.value})}
                  className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  placeholder="Enter artist name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Album</label>
                <input
                  type="text"
                  value={newTrack.album}
                  onChange={(e) => setNewTrack({...newTrack, album: e.target.value})}
                  className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  placeholder="Enter album name"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Duration (seconds)</label>
                <input
                  type="number"
                  value={newTrack.duration}
                  onChange={(e) => setNewTrack({...newTrack, duration: parseInt(e.target.value) || 0})}
                  className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  placeholder="180"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Cover Art URL</label>
                <input
                  type="url"
                  value={newTrack.coverArt}
                  onChange={(e) => setNewTrack({...newTrack, coverArt: e.target.value})}
                  className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  placeholder="https://example.com/cover.jpg"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Audio File URL *</label>
                <input
                  type="url"
                  value={newTrack.audioSrc}
                  onChange={(e) => setNewTrack({...newTrack, audioSrc: e.target.value})}
                  className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  placeholder="https://example.com/song.mp3"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition-colors"
              >
                Add Track
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Music Library */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Your Music Library</h2>
        
        {queue.length === 0 ? (
          <div className="text-center py-8">
            <Music size={64} className="text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No songs in your library yet</p>
            <p className="text-gray-500">Add some songs to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-300 pb-3">#</th>
                  <th className="text-left text-gray-300 pb-3">Title</th>
                  <th className="text-left text-gray-300 pb-3">Artist</th>
                  <th className="text-left text-gray-300 pb-3">Album</th>
                  <th className="text-left text-gray-300 pb-3">Duration</th>
                  <th className="text-left text-gray-300 pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((track, index) => (
                  <tr 
                    key={track.id} 
                    className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-3 text-gray-400">{index + 1}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={track.coverArt} 
                          alt={track.title}
                          className="w-12 h-12 rounded object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/images/covers/default.jpg';
                          }}
                        />
                        <span className="text-white font-medium">{track.title}</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-300">{track.artist}</td>
                    <td className="py-3 text-gray-300">{track.album}</td>
                    <td className="py-3 text-gray-300">{formatDuration(track.duration)}</td>
                    <td className="py-3">
                      <button
                        onClick={() => playTrack(track)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition-colors"
                      >
                        Play
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <Music size={24} className="text-green-500" />
            <div>
              <h3 className="text-white font-medium">Total Songs</h3>
              <p className="text-2xl font-bold text-green-500">{queue.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <User size={24} className="text-blue-500" />
            <div>
              <h3 className="text-white font-medium">Artists</h3>
              <p className="text-2xl font-bold text-blue-500">
                {new Set(queue.map(track => track.artist)).size}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <Album size={24} className="text-purple-500" />
            <div>
              <h3 className="text-white font-medium">Albums</h3>
              <p className="text-2xl font-bold text-purple-500">
                {new Set(queue.map(track => track.album)).size}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicDashboard;
