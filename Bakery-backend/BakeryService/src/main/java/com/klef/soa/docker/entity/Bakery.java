package com.klef.soa.docker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bakery")
@Data
@NoArgsConstructor
public class Bakery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bakery_name", nullable = false, length = 100)
    private String bakeryName;

    @Column(name = "specialty", nullable = false, length = 100)
    private String specialty;

    @Column(name = "daily_capacity", nullable = false)
    private Integer dailyCapacity;

    @Column(name = "custom_cakes", nullable = false)
    private Boolean customCakes;

    public Bakery(String bakeryName, String specialty, Integer dailyCapacity, Boolean customCakes) {
        this.bakeryName = bakeryName;
        this.specialty = specialty;
        this.dailyCapacity = dailyCapacity;
        this.customCakes = customCakes;
    }
}