package com.example.bathroomapp.model;

public class Review {
    private int cleanliness;
    private int smell;
    private int rating;
    private long userID;

    private String comment;

    public int getRating() {
        return rating;
    }

    public int getCleanliness() {
        return cleanliness;
    }

    public int getSmell() {
        return smell;
    }
}
