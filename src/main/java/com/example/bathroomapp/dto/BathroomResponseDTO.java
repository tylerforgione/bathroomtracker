package com.example.bathroomapp.dto;

import com.example.bathroomapp.model.Gender;

public class BathroomResponseDTO {
    public Long id;
    public String building;
    public int floor;
    public double lat;
    public double lng;
    public int numStalls;
    public int numUrinals;
    public Gender gender;
    public boolean outOfOrder;
}
