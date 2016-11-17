package com.aviation.component.ui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class AviationComponentUiApplication {

	public static void main(String[] args) {
		SpringApplication.run(AviationComponentUiApplication.class, args);
	}
}
