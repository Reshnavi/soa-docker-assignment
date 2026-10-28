package com.klef.soa.docker.service;

import com.klef.soa.docker.dto.BakeryRequest;
import com.klef.soa.docker.dto.BakeryResponse;
import java.util.List;

public interface BakeryService {
    BakeryResponse addBakery(BakeryRequest request);
    List<BakeryResponse> getAllBakeries();
    void deleteBakery(Long id);
    BakeryResponse updateBakery(Long id, BakeryRequest request);
}