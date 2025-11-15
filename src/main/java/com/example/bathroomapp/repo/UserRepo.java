package com.example.bathroomapp.repo;

import com.example.bathroomapp.model.User;
import org.springframework.data.jpa.repository.*;

public interface UserRepo extends JpaRepository<User, Long> {

}
