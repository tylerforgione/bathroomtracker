package com.example.bathroomapp.service;

import com.example.bathroomapp.dto.BathroomResponseDTO;
import com.example.bathroomapp.dto.CreateBathroomRequest;
import com.example.bathroomapp.model.Bathroom;
import com.example.bathroomapp.model.User;
import com.example.bathroomapp.repo.BathroomRepo;
import com.example.bathroomapp.repo.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BathroomService {
    private final BathroomRepo bathroomRepo;
    private final UserRepo userRepo;

    public BathroomService(BathroomRepo br, UserRepo ur) {
        this.bathroomRepo = br;
        this.userRepo = ur;
    }

    public BathroomResponseDTO createBathroom(CreateBathroomRequest req) {
        User creator = userRepo.findById(req.createdByUserId).orElseThrow(() -> new RuntimeException("User not found"));

        Bathroom b = new Bathroom();
        b.setBuilding(req.building);
        b.setFloor(req.floor);
        b.setGender(req.gender);
        b.setLat(req.lat);
        b.setLon(req.lng);
        b.setNumStalls(req.numStalls);
        b.setNumUrinals(req.numUrinals);
        b.setOutOfOrder(false);

        bathroomRepo.save(b);

        return toDTO(b);
    }

    public BathroomResponseDTO getBathroomByID(Long id) {
        Bathroom b = bathroomRepo.findById(id).orElseThrow(() -> new RuntimeException("Bathroom not found"));

        return toDTO(b);
    }

    public List<BathroomResponseDTO> getAllBathrooms() {
        return bathroomRepo.findAll().stream().map(this::toDTO).toList();
    }

    private double distanceKm(double lat1, double lon1, double lat2, double lon2) {
        double R = 6371;
        double dlat = Math.toRadians(lat2 - lat1);
        double dlon = Math.toRadians(lon2 - lon1);

        lat1 = Math.toRadians(lat1);
        lat2 = Math.toRadians(lat2);

        double a = Math.sin(dlat / 2) * Math.sin(dlat / 2)
                + Math.sin(dlon / 2) * Math.sin(dlon / 2) * Math.cos(lat1) * Math.cos(lat2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    public List<BathroomResponseDTO> getBathroomsNear(double lat, double lng, double radius) {
        List<Bathroom> all = bathroomRepo.findAll();
        return all.stream().filter(b -> distanceKm(lat, lng, b.getLat(), b.getLon()) <= radius).map(this::toDTO).toList();
    }

    private BathroomResponseDTO toDTO(Bathroom b) {
        BathroomResponseDTO dto = new BathroomResponseDTO();
        dto.id = b.getId();
        dto.building = b.getBuilding();
        dto.floor = b.getFloor();
        dto.lat = b.getLat();
        dto.lng = b.getLon();
        dto.numStalls = b.getNumStalls();
        dto.numUrinals = b.getNumUrinals();
        dto.gender = b.getGender();
        dto.outOfOrder = b.isOutOfOrder();

        // computed via @Transient on entity
        dto.averageRating = b.getAverageRating();
        dto.averageCleanliness = b.getAverageCleanliness();
        dto.averageSmell = b.getAverageSmell();

        return dto;
    }
}
