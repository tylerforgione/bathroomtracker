package com.example.bathroomapp.service;

import com.example.bathroomapp.dto.BathroomResponseDTO;
import com.example.bathroomapp.dto.CreateBathroomRequest;
import com.example.bathroomapp.model.User;
import com.example.bathroomapp.repo.BathroomRepo;
import com.example.bathroomapp.repo.UserRepo;

public class BathroomService {
    private final BathroomRepo bathroomRepo;
    private final UserRepo userRepo;

    public BathroomService(BathroomRepo br, UserRepo ur) {
        this.bathroomRepo = br;
        this.userRepo = ur;
    }

    public BathroomResponseDTO createBathroom(CreateBathroomRequest req) {
        return null;
    }
}
