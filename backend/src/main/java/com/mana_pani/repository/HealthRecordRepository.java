package com.mana_pani.repository;

import com.mana_pani.model.HealthRecord;
import com.mana_pani.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long> {
    List<HealthRecord> findByUser(User user);
}
