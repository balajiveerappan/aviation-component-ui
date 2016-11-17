package com.aviation.component.ui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ComponentUIController {

	
	
	
	@RequestMapping("/test")
	public String test() {
		
		return "test";
	}
}
