package com.example.bathroomapp.dto;
import com.example.bathroomapp.model.Gender;

public class CreateBathroomRequest {
    public String building;
    public int floor;
    public double lat;
    public double lng;
    public int numStalls;
    public int numUrinals;
    public Gender gender;
    public Long createdByUserId;
}
