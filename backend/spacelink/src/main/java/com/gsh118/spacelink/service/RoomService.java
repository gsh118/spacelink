package com.gsh118.spacelink.service;

import com.gsh118.spacelink.dto.request.RoomCreateRequest;
import com.gsh118.spacelink.dto.response.RoomResponse;
import com.gsh118.spacelink.entity.Place;
import com.gsh118.spacelink.entity.Room;
import com.gsh118.spacelink.repository.PlaceRepository;
import com.gsh118.spacelink.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoomService {

    private final RoomRepository roomRepository;
    private final PlaceRepository placeRepository;

    public List<RoomResponse> getAllRooms() {
        return roomRepository.findAll().stream()
            .map(RoomResponse::from)
            .collect(Collectors.toList());
    }

    public RoomResponse getRoomById(Long id) {
        Room room = roomRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
        return RoomResponse.from(room);
    }

    public List<RoomResponse> getRoomsByPlaceId(Long placeId) {
        return roomRepository.findByPlaceId(placeId).stream()
            .map(RoomResponse::from)
            .collect(Collectors.toList());
    }

    @Transactional
    public RoomResponse createRoom(RoomCreateRequest request) {
        Place place = placeRepository.findById(request.getPlaceId())
            .orElseThrow(() -> new RuntimeException("Place not found with id: " + request.getPlaceId()));

        Room room = Room.builder()
            .place(place)
            .name(request.getName())
            .capacity(request.getCapacity())
            .pricePerHour(request.getPricePerHour())
            .description(request.getDescription())
            .amenities(request.getAmenities())
            .build();

        Room savedRoom = roomRepository.save(room);
        return RoomResponse.from(savedRoom);
    }

    @Transactional
    public void deleteRoom(Long id) {
        if (!roomRepository.existsById(id)) {
            throw new RuntimeException("Room not found with id: " + id);
        }
        roomRepository.deleteById(id);
    }
}
