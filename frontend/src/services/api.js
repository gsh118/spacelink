import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// 요청 인터셉터 (필요시 토큰 추가 등)
api.interceptors.request.use(
  (config) => {
    // 향후 인증 토큰 추가 가능
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 핸들링)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Place API
export const placeAPI = {
  // 모든 장소 조회
  getAll: () => api.get('/places'),

  // 특정 장소 조회
  getById: (id) => api.get(`/places/${id}`),

  // 장소 생성 (관리자용)
  create: (data) => api.post('/places', data),

  // 장소 삭제 (관리자용)
  delete: (id) => api.delete(`/places/${id}`),
};

// Room API
export const roomAPI = {
  // 모든 회의실 조회
  getAll: () => api.get('/rooms'),

  // 특정 장소의 회의실 조회
  getByPlaceId: (placeId) => api.get('/rooms', { params: { placeId } }),

  // 특정 회의실 조회
  getById: (id) => api.get(`/rooms/${id}`),

  // 회의실 생성 (관리자용)
  create: (data) => api.post('/rooms', data),

  // 회의실 삭제 (관리자용)
  delete: (id) => api.delete(`/rooms/${id}`),
};

// Booking API (향후 확장용)
export const bookingAPI = {
  // 예약 조회
  getAll: () => api.get('/bookings'),

  // 내 예약 조회
  getMyBookings: (userId) => api.get('/bookings', { params: { userId } }),

  // 예약 생성
  create: (data) => api.post('/bookings', data),

  // 예약 취소
  cancel: (id) => api.post(`/bookings/${id}/cancel`),
};

export default api;
