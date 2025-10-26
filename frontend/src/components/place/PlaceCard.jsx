import { Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import { LocationOn as LocationIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function PlaceCard({ place }) {
  const navigate = useNavigate();

  // 그라디언트 배경 색상 (장소별로 다른 색상)
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ];

  const gradientIndex = place.id ? (place.id - 1) % gradients.length : 0;
  const gradient = gradients[gradientIndex];

  const handleViewRooms = () => {
    navigate(`/places/${place.id}/rooms`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        },
      }}
    >
      {/* 이미지 영역 (그라디언트) */}
      <Box
        sx={{
          height: 180,
          background: gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '3rem',
          fontWeight: 700,
        }}
      >
        {place.name.charAt(0)}
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* 장소 이름 */}
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          {place.name}
        </Typography>

        {/* 설명 */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
          {place.description || '회의 공간을 제공합니다.'}
        </Typography>

        {/* 위치 정보 */}
        {(place.latitude || place.longitude) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {place.latitude?.toFixed(4)}, {place.longitude?.toFixed(4)}
            </Typography>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleViewRooms}
          sx={{
            py: 1,
            fontWeight: 600,
          }}
        >
          회의실 보기
        </Button>
      </CardActions>
    </Card>
  );
}

export default PlaceCard;
