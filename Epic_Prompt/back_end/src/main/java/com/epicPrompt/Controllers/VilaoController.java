package com.epicPrompt.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.epicPrompt.Models.Vilao;
import com.epicPrompt.Services.VilaoService;

@RestController
@RequestMapping(path = "/api/vilao")
@CrossOrigin(origins = "*")
public class VilaoController {
	
	@Autowired
	private VilaoService vilaoService;
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public ResponseEntity<Vilao> getVilao(@PathVariable Integer id) {
		return new ResponseEntity<>(vilaoService.findById(id), HttpStatus.OK);
	}
	

}
