package com.mana_pani.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping("/stats")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        // In a real application, you would fetch this data from a service or database
        Map<String, Object> stats = new HashMap<>();
        stats.put("activeGoals", 5); // Example data
        stats.put("activeGoalsChange", 1);
        stats.put("healthScore", 92);
        stats.put("healthScoreChange", -3);
        stats.put("streakDays", 14);
        stats.put("streakDaysChange", 1);

        return ResponseEntity.ok(stats);
    }
}
