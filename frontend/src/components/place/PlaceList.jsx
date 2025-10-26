import { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { Business as BusinessIcon } from '@mui/icons-material';
import PlaceCard from './PlaceCard';
import { placeAPI } from '../../services/api';

function PlaceList() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await placeAPI.getAll();
      setPlaces(response.data);
    } catch (err) {
      console.error('Failed to fetch places:', err);
      setError('장소 목록을 불러오는데 실패했습니다. 서버를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="body1" sx={{ mt: 2 }} color="text.secondary">
          장소 목록을 불러오는 중...
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
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <BusinessIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1.5 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            회의 공간을 찾아보세요
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          전문적인 비즈니스 미팅부터 소규모 스터디까지,
          <br />
          다양한 용도의 회의실을 한 곳에서 예약하세요.
        </Typography>
      </Box>

      {/* Place Cards Grid */}
      {places.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            등록된 장소가 없습니다.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {places.map((place) => (
            <Grid item xs={12} sm={6} md={4} key={place.id}>
              <PlaceCard place={place} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default PlaceList;
