package com.example.bathroomapp.controller;

import com.example.bathroomapp.dto.CreateBathroomRequest;
import com.example.bathroomapp.dto.BathroomResponseDTO;
import com.example.bathroomapp.service.BathroomService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bathrooms")
@CrossOrigin(origins = "*")
public class BathroomController {
    private BathroomService bathroomService;

    public BathroomController(BathroomService bathroomService) {
        this.bathroomService = bathroomService;
    }

    @PostMapping
    public BathroomResponseDTO createBathroom(@RequestBody CreateBathroomRequest req) {
        return bathroomService.createBathroom(req);
    }
}
