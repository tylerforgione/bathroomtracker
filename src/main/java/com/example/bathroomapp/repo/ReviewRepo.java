package com.example.bathroomapp.repo;

import com.example.bathroomapp.model.Review;
import org.springframework.data.jpa.repository.*;

import java.util.*;

public interface ReviewRepo extends JpaRepository<Review, Long> {
    List<Review> findByBathroomId(Long bathroomId);
}
