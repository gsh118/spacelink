package com.gsh118.spacelink.dto.response;

import com.gsh118.spacelink.entity.Location;
import com.gsh118.spacelink.entity.Place;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceResponse {
    private Long id;
    private String name;
    private String description;
    private Double latitude;
    private Double longitude;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PlaceResponse from(Place place) {
        Location location = place.getLocation();
        return PlaceResponse.builder()
            .id(place.getId())
            .name(place.getName())
            .description(place.getDescription())
            .latitude(location != null ? location.getLatitude() : null)
            .longitude(location != null ? location.getLongitude() : null)
            .createdAt(place.getCreatedAt())
            .updatedAt(place.getUpdatedAt())
            .build();
    }
}
