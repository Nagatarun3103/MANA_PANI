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
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<HealthRecordDto>> getAllHealthRecords() {
        List<HealthRecord> records = healthRecordRepository.findAll();
        List<HealthRecordDto> recordDtos = records.stream().map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok(recordDtos);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HealthRecordDto> createHealthRecord(@RequestBody HealthRecordDto recordDto) {
        User user = getCurrentUser(); // The record will be associated with the admin who created it.
        HealthRecord record = convertToEntity(recordDto);
        record.setUser(user);
        HealthRecord savedRecord = healthRecordRepository.save(record);
        return new ResponseEntity<>(convertToDto(savedRecord), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HealthRecordDto> updateHealthRecord(@PathVariable Long id, @RequestBody HealthRecordDto recordDto) {
        return healthRecordRepository.findById(id)
                .map(record -> {
                    record.setCategory(recordDto.getCategory());
                    record.setTitle(recordDto.getTitle());
                    record.setContent(recordDto.getContent());
                    record.setImageUrl(recordDto.getImageUrl());
                    record.setDiseaseAssociation(recordDto.getDiseaseAssociation());
                    HealthRecord updatedRecord = healthRecordRepository.save(record);
                    return ResponseEntity.ok(convertToDto(updatedRecord));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> deleteHealth(@PathVariable Long id) {
        return healthRecordRepository.findById(id)
            .map(record -> {
                healthRecordRepository.delete(record);
                return ResponseEntity.<Void>noContent().build();
            })
            .orElse(ResponseEntity.<Void>notFound().build());
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
        dto.setImageUrl(record.getImageUrl());
        dto.setDiseaseAssociation(record.getDiseaseAssociation());
        return dto;
    }

    private HealthRecord convertToEntity(HealthRecordDto dto) {
        HealthRecord record = new HealthRecord();
        record.setCategory(dto.getCategory());
        record.setTitle(dto.getTitle());
        record.setContent(dto.getContent());
        record.setImageUrl(dto.getImageUrl());
        record.setDiseaseAssociation(dto.getDiseaseAssociation());
        return record;
    }
}