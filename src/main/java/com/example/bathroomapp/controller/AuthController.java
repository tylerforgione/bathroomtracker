package com.example.bathroomapp.controller;

import com.example.bathroomapp.dto.RegisterUserRequest;
import com.example.bathroomapp.dto.UserResponseDTO;
import com.example.bathroomapp.model.User;
import com.example.bathroomapp.dto.LoginRequest;
import com.example.bathroomapp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponseDTO register(@RequestBody RegisterUserRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public UserResponseDTO login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}