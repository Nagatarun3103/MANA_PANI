package com.mana_pani.controller;

import com.mana_pani.dto.ScheduleRequest;
import com.mana_pani.model.Schedule;
import com.mana_pani.model.User;
import com.mana_pani.repository.ScheduleRepository;
import com.mana_pani.repository.UserRepository;
import com.mana_pani.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/week")
    public ResponseEntity<List<Schedule>> getWeeklySchedule() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(DayOfWeek.MONDAY);
        LocalDate endOfWeek = today.with(DayOfWeek.SUNDAY);

        List<Schedule> weeklySchedule = scheduleRepository.findByUserAndDateBetween(user, startOfWeek, endOfWeek);
        return ResponseEntity.ok(weeklySchedule);
    }

    @PostMapping("/add")
    public ResponseEntity<Schedule> addSchedule(@RequestBody ScheduleRequest scheduleRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("User not found"));

        Schedule newSchedule = new Schedule();
        newSchedule.setUser(user);
        newSchedule.setDate(scheduleRequest.getDate());
        newSchedule.setStartTime(scheduleRequest.getStartTime());
        newSchedule.setEndTime(scheduleRequest.getEndTime());
        newSchedule.setDescription(scheduleRequest.getDescription());

        Schedule savedSchedule = scheduleRepository.save(newSchedule);
        return ResponseEntity.ok(savedSchedule);
    }
}
