import { Card, CardContent, Typography, Box, Chip, Button, Divider } from '@mui/material';
import {
  People as PeopleIcon,
  Wifi as WifiIcon,
  Computer as ComputerIcon,
  Videocam as VideocamIcon,
  Speaker as SpeakerIcon,
  LocalCafe as CoffeeIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

function RoomCard({ room }) {
  // 시설 아이콘 매핑
  const amenityIcons = {
    WIFI: <WifiIcon fontSize="small" />,
    WHITEBOARD: <ComputerIcon fontSize="small" />,
    MONITOR: <ComputerIcon fontSize="small" />,
    DUAL_MONITOR: <ComputerIcon fontSize="small" />,
    PROJECTOR: <VideocamIcon fontSize="small" />,
    VIDEO_CONFERENCE: <VideocamIcon fontSize="small" />,
    SOUND_SYSTEM: <SpeakerIcon fontSize="small" />,
    COFFEE: <CoffeeIcon fontSize="small" />,
    SNACKS: <CoffeeIcon fontSize="small" />,
  };

  // amenities 문자열을 배열로 변환
  const amenitiesList = room.amenities ? room.amenities.split(',').map((a) => a.trim()) : [];

  // 가격 포맷팅
  const formattedPrice = new Intl.NumberFormat('ko-KR').format(room.pricePerHour);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        borderLeft: 4,
        borderColor: 'primary.main',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent sx={{ flex: 1, py: 3 }}>
        {/* 회의실 이름 & 가격 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flex: 1 }}>
            {room.name}
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            sx={{
              fontWeight: 700,
              ml: 2,
              whiteSpace: 'nowrap',
            }}
          >
            {formattedPrice}원
            <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              /시간
            </Typography>
          </Typography>
        </Box>

        {/* 기본 정보 */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PeopleIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {room.capacity}인
            </Typography>
          </Box>
          {amenitiesList.includes('WIFI') && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <WifiIcon sx={{ fontSize: 18, color: 'success.main' }} />
              <Typography variant="body2" color="success.main">
                WiFi
              </Typography>
            </Box>
          )}
        </Box>

        {/* 설명 */}
        {room.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
            {room.description}
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        {/* 시설 목록 */}
        {amenitiesList.length > 0 && (
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              시설
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {amenitiesList.map((amenity) => (
                <Chip
                  key={amenity}
                  label={amenity}
                  size="small"
                  icon={amenityIcons[amenity]}
                  sx={{
                    backgroundColor: 'background.default',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>

      {/* 예약 버튼 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderTop: { xs: '1px solid', sm: 'none' },
          borderLeft: { xs: 'none', sm: '1px solid' },
          borderColor: 'divider',
        }}
      >
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          disabled
          sx={{
            minWidth: { xs: '100%', sm: 140 },
            py: 1.5,
            fontWeight: 600,
          }}
        >
          예약하기
        </Button>
      </Box>
    </Card>
  );
}

export default RoomCard;
