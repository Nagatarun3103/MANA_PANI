package com.mana_pani.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class GoalDto {
    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private boolean completed;
}
