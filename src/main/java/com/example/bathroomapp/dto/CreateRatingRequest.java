package com.example.bathroomapp.dto;

public class CreateRatingRequest {
    public Long bathroomId;
    public Long userId;

    public int cleanliness;
    public int smell;
    public int rating;

    public String comment;
}
