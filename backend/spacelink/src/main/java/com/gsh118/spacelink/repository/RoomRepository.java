package com.gsh118.spacelink.repository;

import com.gsh118.spacelink.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByPlaceId(Long placeId);
    List<Room> findByCapacityGreaterThanEqual(Integer capacity);
}
