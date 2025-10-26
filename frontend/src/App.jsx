import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import AppBar from './components/layout/AppBar';
import PlaceList from './components/place/PlaceList';
import RoomList from './components/room/RoomList';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppBar />
      <Routes>
        <Route path="/" element={<Navigate to="/places" replace />} />
        <Route path="/places" element={<PlaceList />} />
        <Route path="/places/:placeId/rooms" element={<RoomList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
