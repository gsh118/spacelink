package com.gsh118.spacelink.service;

import com.gsh118.spacelink.dto.request.BookingCreateRequest;
import com.gsh118.spacelink.dto.response.BookingResponse;
import com.gsh118.spacelink.entity.Booking;
import com.gsh118.spacelink.entity.Room;
import com.gsh118.spacelink.entity.User;
import com.gsh118.spacelink.repository.BookingRepository;
import com.gsh118.spacelink.repository.RoomRepository;
import com.gsh118.spacelink.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream()
            .map(BookingResponse::from)
            .collect(Collectors.toList());
    }

    public BookingResponse getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        return BookingResponse.from(booking);
    }

    public List<BookingResponse> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId).stream()
            .map(BookingResponse::from)
            .collect(Collectors.toList());
    }

    public List<BookingResponse> getBookingsByRoomId(Long roomId) {
        return bookingRepository.findByRoomId(roomId).stream()
            .map(BookingResponse::from)
            .collect(Collectors.toList());
    }

    @Transactional
    public BookingResponse createBooking(BookingCreateRequest request) {
        // Validate user and room
        User user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found with id: " + request.getUserId()));

        Room room = roomRepository.findById(request.getRoomId())
            .orElseThrow(() -> new RuntimeException("Room not found with id: " + request.getRoomId()));

        // Check for conflicts
        List<Booking> conflicts = bookingRepository.findConflictingBookings(
            request.getRoomId(),
            request.getStartTime(),
            request.getEndTime()
        );

        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Room is already booked for the selected time");
        }

        // Calculate total price
        long hours = Duration.between(request.getStartTime(), request.getEndTime()).toHours();
        BigDecimal totalPrice = room.getPricePerHour().multiply(BigDecimal.valueOf(hours));

        Booking booking = Booking.builder()
            .user(user)
            .room(room)
            .startTime(request.getStartTime())
            .endTime(request.getEndTime())
            .status("CONFIRMED")
            .totalPrice(totalPrice)
            .build();

        Booking savedBooking = bookingRepository.save(booking);
        return BookingResponse.from(savedBooking);
    }

    @Transactional
    public void cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));

        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
    }

    @Transactional
    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new RuntimeException("Booking not found with id: " + id);
        }
        bookingRepository.deleteById(id);
    }
}
