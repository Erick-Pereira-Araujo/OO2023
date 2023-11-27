package com.epicPrompt.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class helloControler {
	
	@GetMapping
	public String hello() {
		return "Hello World!\n";
	}
}
