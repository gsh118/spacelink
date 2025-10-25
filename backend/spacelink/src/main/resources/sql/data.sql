-- SpaceLink Sample Data

-- Sample Users
INSERT INTO users (email, password, name, role) VALUES
('admin@spacelink.com', '$2a$10$dummyHashedPassword1', '관리자', 'ROLE_ADMIN'),
('user1@test.com', '$2a$10$dummyHashedPassword2', '김철수', 'ROLE_USER'),
('user2@test.com', '$2a$10$dummyHashedPassword3', '이영희', 'ROLE_USER');

-- Sample Places
INSERT INTO place (name, description, latitude, longitude) VALUES
('강남 테헤란 지점', '서울 강남구에 위치한 메인 지점입니다.', 37.5012767241426, 127.039600248343),
('서초 센터', '서울 서초구에 위치한 비즈니스 센터입니다.', 37.4830366358305, 127.032469459556),
('종로 본점', '서울 종로구에 위치한 본점입니다.', 37.5720164, 126.9769519),
('마포 지점', '서울 마포구에 위치한 소규모 지점입니다.', 37.5443882, 126.9513254),
('판교 테크센터', '경기 성남시 분당구 판교에 위치한 IT 특화 센터입니다.', 37.3951683, 127.1107129);

-- Sample Rooms
INSERT INTO room (place_id, name, capacity, price_per_hour, description, amenities) VALUES
(1, '스터디룸 A', 4, 15000.00, '조용하고 깨끗한 4인용 스터디룸입니다.', 'WIFI,WHITEBOARD,MONITOR'),
(1, '스터디룸 B', 6, 20000.00, '넓은 6인용 스터디룸으로 팀 프로젝트에 적합합니다.', 'WIFI,WHITEBOARD,PROJECTOR,MONITOR'),
(2, '회의실 C', 8, 30000.00, '전문적인 비즈니스 미팅을 위한 회의실입니다.', 'WIFI,PROJECTOR,MONITOR,WHITEBOARD,COFFEE'),
(2, '소회의실 D', 4, 18000.00, '소규모 미팅에 최적화된 공간입니다.', 'WIFI,MONITOR,WHITEBOARD'),
(3, '대형 스터디룸 E', 10, 35000.00, '대규모 스터디나 세미나에 적합한 공간입니다.', 'WIFI,PROJECTOR,WHITEBOARD,SOUND_SYSTEM'),
(4, '프라이빗 룸 F', 2, 12000.00, '1:1 과외나 개인 스터디에 적합합니다.', 'WIFI,MONITOR'),
(5, '스터디 라운지 G', 6, 22000.00, '편안한 분위기의 스터디 공간입니다.', 'WIFI,WHITEBOARD,COFFEE,SNACKS'),
(5, '테크 회의실 H', 8, 28000.00, 'IT 업계 미팅에 최적화된 회의실입니다.', 'WIFI,DUAL_MONITOR,WHITEBOARD,VIDEO_CONFERENCE');

-- Sample Bookings
INSERT INTO booking (user_id, room_id, start_time, end_time, status, total_price) VALUES
(2, 1, CURRENT_TIMESTAMP + INTERVAL '1' DAY, CURRENT_TIMESTAMP + INTERVAL '1' DAY + INTERVAL '2' HOUR, 'CONFIRMED', 30000.00),
(3, 3, CURRENT_TIMESTAMP + INTERVAL '2' DAY, CURRENT_TIMESTAMP + INTERVAL '2' DAY + INTERVAL '3' HOUR, 'CONFIRMED', 90000.00),
(2, 6, CURRENT_TIMESTAMP + INTERVAL '3' DAY, CURRENT_TIMESTAMP + INTERVAL '3' DAY + INTERVAL '1' HOUR, 'PENDING', 12000.00);
