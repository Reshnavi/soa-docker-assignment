package com.klef.soa.docker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BakeryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BakeryServiceApplication.class, args);
		System.out.println("Bakery Service is running");
	}

}
