import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Stack,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Paper,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  LocationOn as LocationIcon,
  MeetingRoom as MeetingRoomIcon,
} from '@mui/icons-material';
import RoomCard from './RoomCard';
import { placeAPI, roomAPI } from '../../services/api';

function RoomList() {
  const { placeId } = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [placeId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 장소 정보와 회의실 목록을 동시에 가져오기
      const [placeResponse, roomsResponse] = await Promise.all([
        placeAPI.getById(placeId),
        roomAPI.getByPlaceId(placeId),
      ]);

      setPlace(placeResponse.data);
      setRooms(roomsResponse.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError('데이터를 불러오는데 실패했습니다. 서버를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="body1" sx={{ mt: 2 }} color="text.secondary">
          회의실 목록을 불러오는 중...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto' }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate('/places')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
            textDecoration: 'none',
            '&:hover': { color: 'primary.main' },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16, mr: 0.5 }} />
          장소 목록으로
        </Link>
        <Typography variant="body2" color="text.primary">
          {place?.name}
        </Typography>
      </Breadcrumbs>

      {/* Place Header */}
      {place && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <MeetingRoomIcon sx={{ fontSize: 32, mr: 1.5 }} />
            <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
              {place.name}
            </Typography>
          </Box>
          {place.description && (
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              {place.description}
            </Typography>
          )}
          {(place.latitude || place.longitude) && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0.9 }}>
              <LocationIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption">
                {place.latitude?.toFixed(4)}, {place.longitude?.toFixed(4)}
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      {/* Room Cards */}
      {rooms.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <MeetingRoomIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            이 장소에 등록된 회의실이 없습니다.
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            회의실 목록 ({rooms.length}개)
          </Typography>
          <Stack spacing={3}>
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </Stack>
        </>
      )}
    </Container>
  );
}

export default RoomList;
