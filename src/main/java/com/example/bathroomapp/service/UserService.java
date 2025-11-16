package com.example.bathroomapp.service;

import com.example.bathroomapp.dto.LoginRequest;
import com.example.bathroomapp.dto.RegisterUserRequest;
import com.example.bathroomapp.dto.UserResponseDTO;
import com.example.bathroomapp.model.User;
import com.example.bathroomapp.repo.UserRepo;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }
    // Register
    public UserResponseDTO register(RegisterUserRequest req) {

        // Optional: prevent duplicates
        if (userRepo.findByEmail(req.email).isPresent()) {
            throw new RuntimeException("Email already in use");
        }
        if (userRepo.findByUsername(req.username).isPresent()) {
            throw new RuntimeException("Username already in use");
        }

        // Hash the password
        String hashed = passwordEncoder.encode(req.password);

        // Create entity
        User user = new User(req.email, req.username, hashed);

        // Persist user into DB
        User saved = userRepo.save(user);

        // Convert to DTO
        UserResponseDTO dto = new UserResponseDTO();
        dto.id = saved.getId();
        dto.email = saved.getEmail();
        dto.username = saved.getUsername();

        return dto;
    }

    // Login
    public UserResponseDTO login(LoginRequest req) {

        // Try username first, then email
        Optional<User> userOpt =
                userRepo.findByUsername(req.usernameOrEmail)
                        .or(() -> userRepo.findByEmail(req.usernameOrEmail));

        if (userOpt.isEmpty()) {
            throw new RuntimeException("Invalid username/email or password");
        }

        User user = userOpt.get();

        // Check password
        if (!passwordEncoder.matches(req.password, user.getPasswordHash())) {
            throw new RuntimeException("Invalid username/email or password");
        }

        // Convert entity → DTO
        UserResponseDTO dto = new UserResponseDTO();
        dto.id = user.getId();
        dto.email = user.getEmail();
        dto.username = user.getUsername();

        return dto;
    }


    public UserResponseDTO toDTO(User u) {
        UserResponseDTO udto = new UserResponseDTO();
        udto.id = u.getId();
        udto.email = u.getEmail();
        udto.username = u.getUsername();
        return udto;
    }
}