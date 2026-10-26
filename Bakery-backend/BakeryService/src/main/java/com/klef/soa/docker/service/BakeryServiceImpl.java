package com.klef.soa.docker.service;

import com.klef.soa.docker.dto.BakeryRequest;
import com.klef.soa.docker.dto.BakeryResponse;
import com.klef.soa.docker.entity.Bakery;
import com.klef.soa.docker.repository.BakeryRepository;
import com.klef.soa.docker.service.BakeryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
}