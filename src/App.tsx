
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MusicProvider } from './contexts/MusicContext';
import { AuthProvider } from './contexts/AuthContext';
import { RoomProvider } from './contexts/RoomContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Library from './pages/Library';
import Search from './pages/Search';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import LikedSongs from './pages/music/LikedSongs';
import MusicDashboard from './pages/music/MusicDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MusicProvider>
          <RoomProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="library" element={<Library />} />
                <Route path="search" element={<Search />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="liked-songs" element={<LikedSongs />} />
                <Route path="dashboard" element={<MusicDashboard />} />
              </Route>
            </Routes>
          </RoomProvider>
        </MusicProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
