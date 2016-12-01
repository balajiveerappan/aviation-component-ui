package com.aviation.component.ui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ComponentUIController {

	@RequestMapping("/splashTest")
	public String splashTest() {
		
		System.out.println("hi in test controller");
		
		
		return "test";
	}
	
	
	@RequestMapping("/test")
	public String test() {
		System.out.println("hi in test controller test");
		return "test";
	}
}
