package com.mana_pani.security;

import com.mana_pani.model.ERole;
import com.mana_pani.model.Role;
import com.mana_pani.model.User;
import com.mana_pani.repository.RoleRepository;
import com.mana_pani.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class AdminUserInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @EventListener
    public void onApplicationReady(ApplicationReadyEvent event) {
        // Create admin role if it doesn't exist
        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseGet(() -> {
                    Role newAdminRole = new Role(ERole.ROLE_ADMIN);
                    return roleRepository.save(newAdminRole);
                });

        // Find or create GRS user and set/reset their details
        User adminUser = userRepository.findByUsername("GRS").orElse(new User());
        adminUser.setUsername("GRS");
        String adminPassword = "testpassword"; // Changed to a generic test password
        adminUser.setPassword(passwordEncoder.encode(adminPassword));
        adminUser.setEmail("grs@example.com"); // Dummy email

        Set<Role> roles = new HashSet<>();
        roles.add(adminRole);
        adminUser.setRoles(roles);

        userRepository.save(adminUser);

        System.out.println("--- Admin User Initialized ---");
        System.out.println("Username: " + adminUser.getUsername());
        System.out.println("Password: " + adminPassword); // Log the plain text password for debugging
        System.out.println("Email: " + adminUser.getEmail());
        System.out.println("Roles: " + adminUser.getRoles());
        System.out.println("------------------------------");
    }
}
