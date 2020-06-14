package com.example.demo.querys;

import com.example.demo.entity.Locations;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public class SudentQuery {
    @Query("SELECT id, latitude, longitude FROM locations WHERE user_id = ?1")
    List<Locations> findAllMyLocations(Integer userId) {
        return null;
    }
}
