import React, { createContext, useContext, useState, useEffect } from 'react';
import { Track } from '../types/music';

interface MusicContextProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  likedSongs: Track[];
  playlists: { id: string; name: string; tracks: Track[] }[];
  queue: Track[];
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  toggleLike: (track: Track) => void;
  isLiked: (trackId: string) => boolean;
  addToPlaylist: (playlistId: string, track: Track) => void;
  createPlaylist: (name: string) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  addToQueue: (track: Track) => void;
}

const MusicContext = createContext<MusicContextProps | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [likedSongs, setLikedSongs] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<{ id: string; name: string; tracks: Track[] }[]>([]);
  const [queue, setQueue] = useState<Track[]>([]);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Initialize audio element on component mount
  useEffect(() => {
    const audio = new Audio();
    setAudioElement(audio);

    // Sample tracks - these will be replaced with actual tracks
    const sampleTracks: Track[] = [
      {
        id: "1",
        title: "Tum Hi Ho",
        artist: "Arijit Singh",
        artistId: "ar1",
        album: "Aashiqui 2",
        duration: 261,
        coverArt: "/assets/images/covers/tum-hi-ho.jpg",
        audioSrc: "/assets/audio/tum-hi-ho.mp3"
      },
      {
        id: "2",
        title: "Chaiyya Chaiyya",
        artist: "Sukhwinder Singh",
        artistId: "ar2",
        album: "Dil Se",
        duration: 320,
        coverArt: "/assets/images/covers/chaiyya-chaiyya.jpg",
        audioSrc: "/assets/audio/chaiyya-chaiyya.mp3"
      },
      {
        id: "3",
        title: "Amplifier",
        artist: "Imran Khan",
        artistId: "ar3",
        album: "Unforgettable",
        duration: 235,
        coverArt: "/assets/images/covers/amplifier.jpg",
        audioSrc: "/assets/audio/amplifier.mp3"
      }
    ];
    
    setQueue(sampleTracks);

    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  // Update audio element when current track changes
  useEffect(() => {
    if (audioElement && currentTrack) {
      audioElement.src = currentTrack.audioSrc;
      audioElement.volume = volume;
      
      if (isPlaying) {
        audioElement.play().catch(err => console.error("Error playing audio:", err));
      }
    }
  }, [audioElement, currentTrack]);

  // Handle time updates
  useEffect(() => {
    if (!audioElement) return;

    const updateTime = () => {
      setCurrentTime(audioElement.currentTime);
      setDuration(audioElement.duration);
    };

    audioElement.addEventListener('timeupdate', updateTime);
    
    return () => {
      audioElement.removeEventListener('timeupdate', updateTime);
    };
  }, [audioElement]);

  // Handle audio ending
  useEffect(() => {
    if (!audioElement) return;

    const handleEnded = () => {
      nextTrack();
    };

    audioElement.addEventListener('ended', handleEnded);
    
    return () => {
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [audioElement, queue]);

  // Function to play a track
  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  // Function to pause current track
  const pauseTrack = () => {
    if (audioElement) {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  // Function to resume current track
  const resumeTrack = () => {
    if (audioElement) {
      audioElement.play().catch(err => console.error("Error resuming audio:", err));
      setIsPlaying(true);
    }
  };

  // Function to set volume
  const setVolumeLevel = (level: number) => {
    if (audioElement) {
      audioElement.volume = level;
    }
    setVolume(level);
  };

  // Function to seek to a specific time
  const seekTo = (time: number) => {
    if (audioElement) {
      audioElement.currentTime = time;
    }
  };

  // Function to toggle like status of a track
  const toggleLike = (track: Track) => {
    setLikedSongs(prevLikedSongs => {
      const isAlreadyLiked = prevLikedSongs.some(song => song.id === track.id);
      
      if (isAlreadyLiked) {
        return prevLikedSongs.filter(song => song.id !== track.id);
      } else {
        return [...prevLikedSongs, track];
      }
    });
  };

  // Function to check if a track is liked
  const isLiked = (trackId: string) => {
    return likedSongs.some(song => song.id === trackId);
  };

  // Function to add a track to a playlist
  const addToPlaylist = (playlistId: string, track: Track) => {
    setPlaylists(prevPlaylists => {
      return prevPlaylists.map(playlist => {
        if (playlist.id === playlistId) {
          // Avoid adding duplicates
          if (!playlist.tracks.some(t => t.id === track.id)) {
            return {
              ...playlist,
              tracks: [...playlist.tracks, track]
            };
          }
        }
        return playlist;
      });
    });
  };

  // Function to create a new playlist
  const createPlaylist = (name: string) => {
    const newPlaylist = {
      id: `playlist-${Date.now()}`,
      name,
      tracks: []
    };
    
    setPlaylists(prevPlaylists => [...prevPlaylists, newPlaylist]);
  };

  // Function to play next track
  const nextTrack = () => {
    if (queue.length > 0 && currentTrack) {
      const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % queue.length;
      playTrack(queue[nextIndex]);
    }
  };

  // Function to play previous track
  const prevTrack = () => {
    if (queue.length > 0 && currentTrack) {
      const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
      const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
      playTrack(queue[prevIndex]);
    }
  };

  // Function to add a track to the queue
  const addToQueue = (track: Track) => {
    setQueue(prevQueue => {
      // Check if track already exists in queue
      const trackExists = prevQueue.some(existingTrack => existingTrack.id === track.id);
      
      if (!trackExists) {
        return [...prevQueue, track];
      }
      
      return prevQueue;
    });
  };

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        currentTime,
        duration,
        likedSongs,
        playlists,
        queue,
        playTrack,
        pauseTrack,
        resumeTrack,
        setVolume: setVolumeLevel,
        seekTo,
        toggleLike,
        isLiked,
        addToPlaylist,
        createPlaylist,
        nextTrack,
        prevTrack,
        addToQueue
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
