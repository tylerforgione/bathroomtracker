package com.example.bathroomapp.model;

import java.util.List;

public class Bathroom {
    private Long id;

    private String building;
    private int floor;

    private double lat;
    private double lon;

    private int numStalls;
    private int numUrinals;
    private char gender;
    private boolean outOfOrder;

    private double averageRating;
    private double averageCleanliness;
    private double averageSmell;

    private List<Review> reviews;

    public Bathroom() {

    }

    public void calcAverageRating() {
        if (reviews == null || reviews.isEmpty()) {
            this.averageRating = 0.0;
            this.averageCleanliness = 0.0;
            this.averageSmell = 0.0;
            return;
        }

        double length = reviews.size();
        double rating = 0.0;
        double clean = 0.0;
        double smell = 0.0;
        for (Review r : reviews) {
            rating += r.getRating();
            clean += r.getCleanliness();
            smell += r.getSmell();
        }
        this.averageRating = rating / length;
        this.averageCleanliness = clean / length;
        this.averageSmell = smell / length;
    }
}
