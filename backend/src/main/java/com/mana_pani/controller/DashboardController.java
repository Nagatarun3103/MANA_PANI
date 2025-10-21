package com.mana_pani.controller;

import com.mana_pani.model.User;
import com.mana_pani.repository.GoalRepository;
import com.mana_pani.repository.UserRepository;
import com.mana_pani.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("User not found."));
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        User currentUser = getCurrentUser();
        long activeGoals = goalRepository.findByUser(currentUser).stream()
                .filter(goal -> "To Finish".equalsIgnoreCase(goal.getStatus()))
                .count();

        // For now, healthScore and streakDays are hardcoded for simplicity for existing users.
        // A new user will have 0 active goals.
        // We can build more complex logic for these later.
        Map<String, Object> stats = new HashMap<>();
        stats.put("activeGoals", activeGoals);
        stats.put("activeGoalsChange", 1); // Placeholder
        stats.put("healthScore", activeGoals > 0 ? 92 : 0); // Placeholder
        stats.put("healthScoreChange", activeGoals > 0 ? -3 : 0); // Placeholder
        stats.put("streakDays", activeGoals > 0 ? 14 : 0); // Placeholder
        stats.put("streakDaysChange", activeGoals > 0 ? 1 : 0); // Placeholder

        return ResponseEntity.ok(stats);
    }
}
