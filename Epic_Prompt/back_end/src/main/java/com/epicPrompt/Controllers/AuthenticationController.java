package com.epicPrompt.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.epicPrompt.DTO.AuthenticationDTO;
import com.epicPrompt.DTO.CadastroDTO;
import com.epicPrompt.DTO.LoginResponseDTO;
import com.epicPrompt.Models.Jogador;
import com.epicPrompt.Repository.JogadorRepository;
import com.epicPrompt.Security.TokenService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = "*")
public class AuthenticationController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JogadorRepository jogadorRepository;
	
	@Autowired
	private TokenService tokenService;
	
	@PostMapping("/login")
	public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
		var usernamePassword = new UsernamePasswordAuthenticationToken(data.nomeJogador(), data.senha());
		var auth = this.authenticationManager.authenticate(usernamePassword);
		
		UserDetails userDetails = (UserDetails) auth.getPrincipal();
		
		boolean passwordMatches = new BCryptPasswordEncoder().matches(data.senha(), userDetails.getPassword());
		
		if (!passwordMatches) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
		
		var token = tokenService.generateToken((Jogador)userDetails);
		
		return ResponseEntity.ok(new LoginResponseDTO(token));
	}
	
	@PostMapping("/cadastrar")
	public ResponseEntity cadastrar(@RequestBody @Valid CadastroDTO data) {
		if(this.jogadorRepository.findJogadorBynomeJogador(data.nomeJogador()) != null) {
			return ResponseEntity.badRequest().build();
		}
		
		String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
		Jogador novoJogador = new Jogador(data.nomeJogador(), encryptedPassword, data.role());
		
		//this.jogadorRepository.save(novoJogador);
		return new ResponseEntity<>(jogadorRepository.save(novoJogador), HttpStatus.CREATED);
	}

}
