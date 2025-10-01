package com.mana_pani.controller;

import com.mana_pani.model.User;
import com.mana_pani.model.HealthRecord;
import com.mana_pani.dto.HealthRecordDto;
import com.mana_pani.repository.HealthRecordRepository;
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
@RequestMapping("/api/health")
public class HealthController {

    @Autowired
    private HealthRecordRepository healthRecordRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<HealthRecordDto>> getUserHealthRecords() {
        User user = getCurrentUser();
        List<HealthRecord> records = healthRecordRepository.findByUser(user);
        List<HealthRecordDto> recordDtos = records.stream().map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok(recordDtos);
    }

    @PostMapping
    public ResponseEntity<HealthRecordDto> createHealthRecord(@RequestBody HealthRecordDto recordDto) {
        User user = getCurrentUser();
        HealthRecord record = convertToEntity(recordDto);
        record.setUser(user);
        HealthRecord savedRecord = healthRecordRepository.save(record);
        return new ResponseEntity<>(convertToDto(savedRecord), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HealthRecordDto> updateHealthRecord(@PathVariable Long id, @RequestBody HealthRecordDto recordDto) {
        User user = getCurrentUser();
        return healthRecordRepository.findById(id)
                .filter(record -> record.getUser().getId().equals(user.getId()))
                .map(record -> {
                    record.setCategory(recordDto.getCategory());
                    record.setTitle(recordDto.getTitle());
                    record.setContent(recordDto.getContent());
                    HealthRecord updatedRecord = healthRecordRepository.save(record);
                    return ResponseEntity.ok(convertToDto(updatedRecord));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteHealth(@PathVariable Long id) {
        return healthRecordRepository.findById(id)
            .map(record -> {
                healthRecordRepository.delete(record);
                // Explicitly tell Java this is ResponseEntity<Void>
                return ResponseEntity.<Void>noContent().build();
            })
            .orElse(ResponseEntity.<Void>notFound().build()); // Also explicit here
    }



    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private HealthRecordDto convertToDto(HealthRecord record) {
        HealthRecordDto dto = new HealthRecordDto();
        dto.setId(record.getId());
        dto.setCategory(record.getCategory());
        dto.setTitle(record.getTitle());
        dto.setContent(record.getContent());
        return dto;
    }

    private HealthRecord convertToEntity(HealthRecordDto dto) {
        HealthRecord record = new HealthRecord();
        record.setCategory(dto.getCategory());
        record.setTitle(dto.getTitle());
        record.setContent(dto.getContent());
        return record;
    }
}
