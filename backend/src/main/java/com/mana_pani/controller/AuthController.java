package com.mana_pani.controller;

import com.mana_pani.dto.JwtResponse;
import com.mana_pani.dto.LoginRequest;
import com.mana_pani.dto.MessageResponse;
import com.mana_pani.dto.SignupRequest;
import com.mana_pani.model.ERole;
import com.mana_pani.model.Role;
import com.mana_pani.model.User;
import com.mana_pani.repository.RoleRepository;
import com.mana_pani.repository.UserRepository;
import com.mana_pani.security.jwt.JwtUtils;
import com.mana_pani.service.AppEmailService;
import com.mana_pani.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import com.mana_pani.dto.ForgotPasswordRequest;
import com.mana_pani.dto.ResetPasswordRequest;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AppEmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Role validation
        String requestedRole = loginRequest.getUserType().equalsIgnoreCase("admin") ? "ROLE_ADMIN" : "ROLE_USER";
        boolean hasRole = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals(requestedRole));

        if (!hasRole) {
            return ResponseEntity.status(401).body(new MessageResponse("Error: Invalid credentials for the selected role."));
        }

        String jwt = jwtUtils.generateJwtToken(authentication);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        String email = signUpRequest.getEmail().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                email,
                encoder.encode(signUpRequest.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);

        user.setRoles(roles);
        userRepository.save(user);
        // emailService.sendWelcomeEmail(user.getEmail(), user.getUsername());

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody com.mana_pani.dto.ForgotPasswordRequest forgotPasswordRequest) {
        String email = forgotPasswordRequest.getEmail().toLowerCase();
        System.out.println("--- DEBUG: Received forgot password request for email: " + email + " ---");
        java.util.Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: No user found with that email address."));
        }

        User user = userOptional.get();
        String token = java.util.UUID.randomUUID().toString();
        user.setPasswordResetToken(token);
        user.setPasswordResetTokenExpiry(java.time.LocalDateTime.now().plusHours(1)); // Token valid for 1 hour

        userRepository.save(user);

        // emailService.sendPasswordResetEmail(user.getEmail(), user.getUsername(), token);

        return ResponseEntity.ok(new MessageResponse("A password reset link has been sent to your email address."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody com.mana_pani.dto.ResetPasswordRequest resetPasswordRequest) {
        java.util.Optional<User> userOptional = userRepository.findByPasswordResetToken(resetPasswordRequest.getToken());

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid password reset token."));
        }

        User user = userOptional.get();

        if (user.getPasswordResetTokenExpiry().isBefore(java.time.LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Password reset token has expired."));
        }

        user.setPassword(encoder.encode(resetPasswordRequest.getNewPassword()));
        user.setPasswordResetToken(null);
        user.setPasswordResetTokenExpiry(null);

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Password has been reset successfully."));
    }
}