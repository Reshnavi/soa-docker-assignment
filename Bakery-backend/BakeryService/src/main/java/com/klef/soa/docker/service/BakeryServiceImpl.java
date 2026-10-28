package com.klef.soa.docker.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import com.klef.soa.docker.dto.BakeryRequest;
import com.klef.soa.docker.dto.BakeryResponse;
import com.klef.soa.docker.entity.Bakery;
import com.klef.soa.docker.repository.BakeryRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;

@Service
public class BakeryServiceImpl implements BakeryService {

    @Autowired
    private BakeryRepository bakeryRepository;

    @Override
    public BakeryResponse addBakery(BakeryRequest request) {
        Bakery bakery = new Bakery(
                request.getBakeryName(),
                request.getSpecialty(),
                request.getDailyCapacity(),
                request.getCustomCakes()
        );
        Bakery saved = bakeryRepository.save(bakery);
        return mapToResponse(saved);
    }

    @Override
    public List<BakeryResponse> getAllBakeries() {
        return bakeryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteBakery(Long id) {
        if (!bakeryRepository.existsById(id)) {
            throw new RuntimeException("Bakery not found with id: " + id);
        }
        bakeryRepository.deleteById(id);
    }

    private BakeryResponse mapToResponse(Bakery bakery) {
        return new BakeryResponse(
                bakery.getId(),
                bakery.getBakeryName(),
                bakery.getSpecialty(),
                bakery.getDailyCapacity(),
                bakery.getCustomCakes()
        );
    }
    @Override
    public BakeryResponse updateBakery(Long id, BakeryRequest request) {
        // Find existing bakery
        Bakery existingBakery = bakeryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bakery not found with id: " + id));

        // Update fields
        existingBakery.setBakeryName(request.getBakeryName());
        existingBakery.setSpecialty(request.getSpecialty());
        existingBakery.setDailyCapacity(request.getDailyCapacity());
        existingBakery.setCustomCakes(request.getCustomCakes());

        // Save and return
        Bakery updated = bakeryRepository.save(existingBakery);
        return mapToResponse(updated);
    }
}