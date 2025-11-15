package com.example.bathroomapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Bathroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String building;
    private int floor;

    private double lat;
    private double lon;

    private int numStalls;
    private int numUrinals;

    @Enumerated(EnumType.STRING)
    private Gender gender;
    private boolean outOfOrder;

    @JsonIgnore
    @OneToMany(mappedBy = "bathroom", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    public Bathroom() {
    }

    @Transient
    public double getAverageRating() {
        if (reviews == null || reviews.isEmpty()) return 0;
        return reviews.stream().mapToInt(Review::getRating).average().orElse(0);
    }

    @Transient
    public double getAverageSmell() {
        if (reviews == null || reviews.isEmpty()) return 0;
        return reviews.stream().mapToInt(Review::getSmell).average().orElse(0);
    }

    @Transient
    public double getAverageCleanliness() {
        if (reviews == null || reviews.isEmpty()) return 0;
        return reviews.stream().mapToInt(Review::getCleanliness).average().orElse(0);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public int getFloor() {
        return floor;
    }

    public void setFloor(int floor) {
        this.floor = floor;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    public int getNumStalls() {
        return numStalls;
    }

    public void setNumStalls(int numStalls) {
        this.numStalls = numStalls;
    }

    public int getNumUrinals() {
        return numUrinals;
    }

    public void setNumUrinals(int numUrinals) {
        this.numUrinals = numUrinals;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public boolean isOutOfOrder() {
        return outOfOrder;
    }

    public void setOutOfOrder(boolean outOfOrder) {
        this.outOfOrder = outOfOrder;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
}
