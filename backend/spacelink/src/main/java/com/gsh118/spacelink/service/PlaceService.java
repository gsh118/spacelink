package com.gsh118.spacelink.service;

import com.gsh118.spacelink.dto.request.PlaceCreateRequest;
import com.gsh118.spacelink.dto.response.PlaceResponse;
import com.gsh118.spacelink.entity.Location;
import com.gsh118.spacelink.entity.Place;
import com.gsh118.spacelink.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlaceService {

    private final PlaceRepository placeRepository;

    public List<PlaceResponse> getAllPlaces() {
        return placeRepository.findAll().stream()
            .map(PlaceResponse::from)
            .collect(Collectors.toList());
    }

    public PlaceResponse getPlaceById(Long id) {
        Place place = placeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Place not found with id: " + id));
        return PlaceResponse.from(place);
    }

    @Transactional
    public PlaceResponse createPlace(PlaceCreateRequest request) {
        Location location = null;
        if (request.getLatitude() != null && request.getLongitude() != null) {
            location = new Location(request.getLatitude(), request.getLongitude());
        }

        Place place = Place.builder()
            .name(request.getName())
            .description(request.getDescription())
            .location(location)
            .build();

        Place savedPlace = placeRepository.save(place);
        return PlaceResponse.from(savedPlace);
    }

    @Transactional
    public void deletePlace(Long id) {
        if (!placeRepository.existsById(id)) {
            throw new RuntimeException("Place not found with id: " + id);
        }
        placeRepository.deleteById(id);
    }
}
