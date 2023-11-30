package com.epicPrompt.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.epicPrompt.Repository.JogadorRepository;

@Service
public class AuthorizationService implements UserDetailsService{

	@Autowired
	JogadorRepository jogadorRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return jogadorRepository.findJogadorBynomeJogador(username);
	}

}
