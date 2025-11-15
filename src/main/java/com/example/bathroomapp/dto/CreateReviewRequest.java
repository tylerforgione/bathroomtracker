package com.example.bathroomapp.dto;

public class CreateReviewRequest {
    public Long bathroomId;
    public Long userId;

    public int cleanliness;
    public int smell;
    public int rating;

    public String comment;
}
