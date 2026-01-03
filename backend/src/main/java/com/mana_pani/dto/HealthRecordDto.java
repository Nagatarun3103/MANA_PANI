package com.mana_pani.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HealthRecordDto {
    private Long id;
    private String category;
    private String title;
    private String content;
    private String imageUrl;
    private String diseaseAssociation;
}
