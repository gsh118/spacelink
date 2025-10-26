import { createTheme } from '@mui/material/styles';

// SpaceLink 비즈니스 프로 테마
// 전문적이고 신뢰감 있는 블루 계열 중심
export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // 신뢰감 있는 블루
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3f51b5', // 인디고 액센트
      light: '#757de8',
      dark: '#002984',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5', // 라이트 그레이
      paper: '#ffffff',
    },
    text: {
      primary: '#212121', // 다크 그레이
      secondary: '#757575', // 미디엄 그레이
    },
    success: {
      main: '#4caf50', // 예약 가능 표시
    },
    warning: {
      main: '#ff9800', // 주의사항
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2.125rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#757575',
    },
  },
  shape: {
    borderRadius: 4, // 정형화된 느낌
  },
  spacing: 8, // 8px 그리드 시스템
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // 대문자 변환 비활성화
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});
