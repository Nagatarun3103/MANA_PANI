package com.mana_pani.controller;

import com.mana_pani.dto.GoalDto;
import com.mana_pani.model.Goal;
import com.mana_pani.model.User;
import com.mana_pani.repository.GoalRepository;
import com.mana_pani.repository.UserRepository;
import com.mana_pani.security.services.UserDetailsImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<GoalDto>> getUserGoals() {
        User user = getCurrentUser();
        List<Goal> goals = goalRepository.findByUser(user);
        List<GoalDto> goalDtos = goals.stream().map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok(goalDtos);
    }

    @PostMapping
    public ResponseEntity<GoalDto> createGoal(@RequestBody GoalDto goalDto) {
        User user = getCurrentUser();
        Goal goal = convertToEntity(goalDto);
        goal.setUser(user);
        Goal savedGoal = goalRepository.save(goal);
        return new ResponseEntity<>(convertToDto(savedGoal), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GoalDto> updateGoal(@PathVariable Long id, @RequestBody GoalDto goalDto) {
        User user = getCurrentUser();
        return goalRepository.findById(id)
                .filter(goal -> goal.getUser().getId().equals(user.getId()))
                .map(goal -> {
                    goal.setTitle(goalDto.getTitle());
                    goal.setDescription(goalDto.getDescription());
                    goal.setDueDate(goalDto.getDueDate());
                    goal.setCompleted(goalDto.isCompleted());
                    Goal updatedGoal = goalRepository.save(goal);
                    return ResponseEntity.ok(convertToDto(updatedGoal));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteGoal(@PathVariable Long id) {
        return goalRepository.findById(id)
            .map(goal -> {
                goalRepository.delete(goal);
                return ResponseEntity.noContent().build(); // 204 No Content
            })
            .orElse(ResponseEntity.<Void>notFound().build()); // 👈 generic type hint
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private GoalDto convertToDto(Goal goal) {
        GoalDto goalDto = new GoalDto();
        goalDto.setId(goal.getId());
        goalDto.setTitle(goal.getTitle());
        goalDto.setDescription(goal.getDescription());
        goalDto.setDueDate(goal.getDueDate());
        goalDto.setCompleted(goal.isCompleted());
        return goalDto;
    }

    private Goal convertToEntity(GoalDto goalDto) {
        Goal goal = new Goal();
        goal.setTitle(goalDto.getTitle());
        goal.setDescription(goalDto.getDescription());
        goal.setDueDate(goalDto.getDueDate());
        goal.setCompleted(goalDto.isCompleted());
        return goal;
    }
}
