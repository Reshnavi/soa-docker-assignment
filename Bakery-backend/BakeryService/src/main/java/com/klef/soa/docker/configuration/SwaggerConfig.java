package com.klef.soa.docker.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI bakeryOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("Bakery Management API")
                .description("REST API to add, view and delete bakeries. The ID is generated automatically.")
                .version("1.0.0"));
    }
}
