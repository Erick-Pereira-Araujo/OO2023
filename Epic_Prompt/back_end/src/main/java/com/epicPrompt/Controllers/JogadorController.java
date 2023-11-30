package com.epicPrompt.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.epicPrompt.Models.Jogador;
import com.epicPrompt.Services.JogadorService;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "*")
public class JogadorController {
	
	@Autowired
	private JogadorService service;
	
	@RequestMapping(value = "/cadastrar", method = RequestMethod.POST)
	public ResponseEntity<Jogador> addJogador(@RequestBody Jogador jogador) {
		if(service.verificaNomeJogadorExiste(jogador.getNomeJogador()) == false) {
			return null;
		}
		return new ResponseEntity<>(service.salvar(jogador), HttpStatus.CREATED);
	}

}
