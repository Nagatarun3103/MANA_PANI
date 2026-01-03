package com.mana_pani.controller;

import com.mana_pani.model.Suggestion;
import com.mana_pani.model.User;
import com.mana_pani.repository.SuggestionRepository;
import com.mana_pani.repository.UserRepository;
import com.mana_pani.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/suggestions")
public class SuggestionController {

    @Autowired
    private SuggestionRepository suggestionRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addSuggestion(@RequestBody Map<String, String> payload) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Suggestion suggestion = new Suggestion(payload.get("content"), user);
        suggestionRepository.save(suggestion);

        return ResponseEntity.ok("Suggestion submitted successfully!");
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Suggestion>> getAllSuggestions() {
        List<Suggestion> suggestions = suggestionRepository.findAll();
        return ResponseEntity.ok(suggestions);
    }
}
