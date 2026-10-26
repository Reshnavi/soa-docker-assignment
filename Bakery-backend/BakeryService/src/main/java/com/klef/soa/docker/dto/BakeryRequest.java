package com.klef.soa.docker.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class BakeryRequest {

    @NotBlank(message = "Bakery name is required")
    @Size(min = 2, max = 100, message = "Bakery name must be between 2 and 100 characters")
    private String bakeryName;

    @NotBlank(message = "Specialty is required")
    @Size(min = 2, max = 100, message = "Specialty must be between 2 and 100 characters")
    private String specialty;

    @NotNull(message = "Daily capacity is required")
    @Min(value = 1, message = "Daily capacity must be at least 1")
    @Max(value = 10000, message = "Daily capacity cannot exceed 10000")
    private Integer dailyCapacity;

    @NotNull(message = "Custom cakes flag is required")
    private Boolean customCakes;
}