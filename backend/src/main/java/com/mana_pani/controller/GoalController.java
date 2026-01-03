package com.mana_pani.controller;

import com.mana_pani.model.Goal;
import com.mana_pani.model.User;
import com.mana_pani.repository.GoalRepository;
import com.mana_pani.repository.UserRepository;
import com.mana_pani.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    @Autowired
    GoalRepository goalRepository;

    @Autowired
    UserRepository userRepository;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("User not found."));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Goal> createGoal(@RequestBody Goal goal) {
        try {
            User currentUser = getCurrentUser();
            goal.setUser(currentUser);
            Goal _goal = goalRepository.save(goal);
            return new ResponseEntity<>(_goal, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Goal>> getAllGoals() {
        try {
            User currentUser = getCurrentUser();
            List<Goal> goals = goalRepository.findByUser(currentUser);
            return new ResponseEntity<>(goals, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Goal> updateGoal(@PathVariable("id") long id, @RequestBody Goal goal) {
        User currentUser = getCurrentUser();
        Optional<Goal> goalData = goalRepository.findById(id);

        if (goalData.isPresent()) {
            Goal _goal = goalData.get();
            if (!_goal.getUser().getId().equals(currentUser.getId())) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN); // User can only update their own goals
            }
            _goal.setGoalName(goal.getGoalName());
            _goal.setDescription(goal.getDescription());
            _goal.setDeadline(goal.getDeadline());
            _goal.setType(goal.getType());
            _goal.setStatus(goal.getStatus());
            return new ResponseEntity<>(goalRepository.save(_goal), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteGoal(@PathVariable("id") long id) {
        try {
            User currentUser = getCurrentUser();
            Optional<Goal> goalData = goalRepository.findById(id);

            if (goalData.isPresent()) {
                Goal _goal = goalData.get();
                if (!_goal.getUser().getId().equals(currentUser.getId())) {
                    return new ResponseEntity<>(HttpStatus.FORBIDDEN); // User can only delete their own goals
                }
                goalRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}