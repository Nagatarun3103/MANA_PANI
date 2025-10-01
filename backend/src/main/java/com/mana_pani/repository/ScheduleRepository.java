package com.mana_pani.repository;

import com.mana_pani.model.Schedule;
import com.mana_pani.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByUserAndDateBetween(User user, LocalDate startDate, LocalDate endDate);
}
