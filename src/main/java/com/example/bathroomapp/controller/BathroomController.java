package com.example.bathroomapp.controller;

import com.example.bathroomapp.dto.CreateBathroomRequest;
import com.example.bathroomapp.dto.BathroomResponseDTO;
import com.example.bathroomapp.service.BathroomService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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

    @GetMapping("/{id}")
    public BathroomResponseDTO getBathroom(@PathVariable Long id) {
        return bathroomService.getBathroomByID(id);
    }

    @GetMapping
    public List<BathroomResponseDTO> getAllBathrooms(@RequestParam(required = false) Double lat,
                                                     @RequestParam(required = false) Double lng,
                                                     @RequestParam(defaultValue = "1.0") double radiusKm) {
        if (lat != null && lng != null)
            return bathroomService.getBathroomsNear(lat, lng, radiusKm);

        return bathroomService.getAllBathrooms();
    }
}
