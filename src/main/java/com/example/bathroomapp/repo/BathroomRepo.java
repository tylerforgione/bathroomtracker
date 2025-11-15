package com.example.bathroomapp.repo;

import com.example.bathroomapp.model.Bathroom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BathroomRepo extends JpaRepository<Bathroom, Long> {
}
