package com.mana_pani.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class ScheduleRequest {
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String description;
}
