package com.gsh118.spacelink.dto.response;

import com.gsh118.spacelink.entity.Room;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomResponse {
    private Long id;
    private Long placeId;
    private String placeName;
    private String name;
    private Integer capacity;
    private BigDecimal pricePerHour;
    private String description;
    private String amenities;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static RoomResponse from(Room room) {
        return RoomResponse.builder()
            .id(room.getId())
            .placeId(room.getPlace().getId())
            .placeName(room.getPlace().getName())
            .name(room.getName())
            .capacity(room.getCapacity())
            .pricePerHour(room.getPricePerHour())
            .description(room.getDescription())
            .amenities(room.getAmenities())
            .createdAt(room.getCreatedAt())
            .updatedAt(room.getUpdatedAt())
            .build();
    }
}
