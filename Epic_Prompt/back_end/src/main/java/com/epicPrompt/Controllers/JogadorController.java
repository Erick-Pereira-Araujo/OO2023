package com.epicPrompt.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public Integer logarJogador(@RequestBody Jogador jogador) {
		Integer jogadorId = jogadorService.verificaLogin(jogador);
		if(jogadorId == null) {
			return null;
		}else {}
		
		return jogadorId;
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public Integer deslogarJogador(@RequestBody Jogador jogador) {
		Jogador jogadorId = jogadorService.atualizarLoginStatus(jogador);
		if(jogadorId.getLoginStatus() == false) {
			return null;
		}else {}
		
		return 1;
	}
	
	@RequestMapping(value = "jogador/{id}", method = RequestMethod.GET)
	public ResponseEntity<Jogador> findById(@PathVariable Integer id) {
		return new ResponseEntity<>(jogadorService.findById(id), HttpStatus.OK);
	}

}
