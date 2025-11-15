package com.example.bathroomapp.repo;

import com.example.bathroomapp.model.Review;
import org.springframework.data.jpa.repository.*;

public interface ReviewRepo extends JpaRepository<Review, Long> {
}
