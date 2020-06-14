package com.example.demo.repository;

import com.example.demo.entity.Locations;
import com.example.demo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Locations, Integer> {
    List<Locations> findByUserId(int userId);
    List<Locations> findAll();

//    @Query("SELECT id, latitude, longitude FROM locations WHERE user_id = ?1")
//    List<Locations> findAllMyLocations(Integer userId);
}
