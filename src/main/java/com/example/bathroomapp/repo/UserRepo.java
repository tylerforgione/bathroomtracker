package com.example.bathroomapp.repo;

import com.example.bathroomapp.model.User;
import org.springframework.data.jpa.repository.*;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    public Optional<User> findByUsername(String userOrEmail);

    public Optional<User> findByEmail(String userOrEmail);

    public Optional<User> findById(Long id);
}
