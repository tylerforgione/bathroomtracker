package com.example.bathroomapp.controller;

import com.example.bathroomapp.dto.CreateReviewRequest;
import com.example.bathroomapp.dto.ReviewResponseDTO;
import com.example.bathroomapp.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {
    public final ReviewService reviewService;

    public ReviewController (ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ReviewResponseDTO createReview(@RequestBody CreateReviewRequest req) {
        return this.reviewService.addReview(req);
    }

    @GetMapping("/bathroom/{bathroomId}")
    public List<ReviewResponseDTO> getReviews(@PathVariable Long bathroomId) {
        return this.reviewService.getBathroomReviews(bathroomId);
    }
}
