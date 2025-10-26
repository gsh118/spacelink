import { AppBar as MuiAppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Business as BusinessIcon, MeetingRoom as MeetingRoomIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

function AppBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <MuiAppBar position="sticky" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* 로고 */}
          <BusinessIcon sx={{ mr: 1.5, fontSize: 28 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 0,
              mr: 4,
              fontWeight: 700,
              letterSpacing: '0.5px',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/places')}
          >
            SpaceLink
          </Typography>

          {/* 네비게이션 메뉴 */}
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
            <Button
              color="inherit"
              startIcon={<BusinessIcon />}
              onClick={() => navigate('/places')}
              sx={{
                fontWeight: isActive('/places') ? 600 : 400,
                borderBottom: isActive('/places') ? '2px solid white' : 'none',
                borderRadius: 0,
                px: 2,
              }}
            >
              장소
            </Button>
            <Button
              color="inherit"
              startIcon={<MeetingRoomIcon />}
              sx={{
                fontWeight: 400,
                px: 2,
              }}
              disabled
            >
              내 예약
            </Button>
          </Box>

          {/* 우측 영역 (향후 로그인 버튼 등) */}
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Guest
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
}

export default AppBar;
