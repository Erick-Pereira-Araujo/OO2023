package com.epicPrompt.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.epicPrompt.Models.Heroi;
import com.epicPrompt.Services.HeroiService;

@RestController
@RequestMapping(path = "/api/heroi")
@CrossOrigin(origins = "*")
public class HeroiController {
	
	@Autowired
	private HeroiService heroiService;
	
	@RequestMapping(value = "/{dropXP}", method = RequestMethod.PUT)
	public ResponseEntity<Heroi> levelUP(@RequestBody Heroi heroi, @PathVariable Integer dropXP) {
		return new ResponseEntity<>(heroiService.levelUp(heroi, dropXP), HttpStatus.ACCEPTED);
	}

}
