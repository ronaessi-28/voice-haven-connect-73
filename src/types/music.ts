
export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  duration: number;
  coverArt: string; // Make sure we use coverArt consistently
  audioSrc: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  tracks: Track[];
  owner: string;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  genres: string[];
  monthlyListeners: number;
}
