package com.klef.soa.docker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BakeryResponse {
    private Long id;
    private String bakeryName;
    private String specialty;
    private Integer dailyCapacity;
    private Boolean customCakes;
}