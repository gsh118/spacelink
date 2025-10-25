package com.gsh118.spacelink.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaceCreateRequest {

    @NotBlank(message = "Name is required")
    private String name;

    private String description;

    private Double latitude;

    private Double longitude;
}
