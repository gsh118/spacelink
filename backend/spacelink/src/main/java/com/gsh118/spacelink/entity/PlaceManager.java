package com.gsh118.spacelink.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PlaceManager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private Long placeId;
    private Long managerId;

    public PlaceManager(Long placeId, Long managerId) {
        this.placeId = placeId;
        this.managerId = managerId;
    }

}
