package com.example.bathroomapp.service;

import com.example.bathroomapp.dto.CreateReviewRequest;
import com.example.bathroomapp.dto.ReviewResponseDTO;
import com.example.bathroomapp.model.Bathroom;
import com.example.bathroomapp.model.Review;
import com.example.bathroomapp.model.User;
import com.example.bathroomapp.repo.BathroomRepo;
import com.example.bathroomapp.repo.ReviewRepo;
import com.example.bathroomapp.repo.UserRepo;
import org.springframework.stereotype.*;
import java.util.*;

@Service
public class ReviewService {
    private final BathroomRepo bathroomRepo;
    private final UserRepo userRepo;
    private final ReviewRepo reviewRepo;

    public ReviewService (BathroomRepo br, UserRepo ur, ReviewRepo rr) {
        this.reviewRepo = rr;
        this.bathroomRepo = br;
        this.userRepo = ur;
    }

    public ReviewResponseDTO addReview(CreateReviewRequest req) {

        Bathroom bathroom = bathroomRepo.findById(req.bathroomId)
                .orElseThrow(() -> new RuntimeException("Bathroom not found"));

        User user = userRepo.findById(req.userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Review r = new Review();
        r.setBathroom(bathroom);
        r.setUser(user);
        r.setRating(req.rating);
        r.setCleanliness(req.cleanliness);
        r.setSmell(req.smell);
        r.setComment(req.comment);

        reviewRepo.save(r);

        return toDTO(r);
    }

    public List<ReviewResponseDTO> getBathroomReviews(Long id) {
        List<Review> reviews = reviewRepo.findByBathroomId(id);

        return reviews.stream().map(this::toDTO).toList();
    }

    private ReviewResponseDTO toDTO(Review r) {
        ReviewResponseDTO dto = new ReviewResponseDTO();
        dto.cleanliness = r.getCleanliness();
        dto.id = r.getId();
        dto.comment = r.getComment();
        dto.rating = r.getRating();
        dto.smell = r.getSmell();
        dto.username = r.getUser().getUsername();

        return dto;
    }
}
