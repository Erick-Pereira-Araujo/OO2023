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
	private JogadorService jogadorService;
	
	@RequestMapping(value = "/cadastrar", method = RequestMethod.POST)
	public ResponseEntity<Jogador> addJogador(@RequestBody Jogador jogador) {
		if(jogadorService.verificaNomeJogadorExiste(jogador.getNomeJogador()) == false) {
			return null;
		}
		return new ResponseEntity<>(jogadorService.cadastarJogador(jogador), HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public Integer logarJogador(@RequestBody Jogador jogador) {
		if(jogadorService.verificaLogin(jogador) == null) {
			return null;
		}
		
		return jogador.getId();
	}

}
