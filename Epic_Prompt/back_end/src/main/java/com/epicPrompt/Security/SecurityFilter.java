package com.epicPrompt.Security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.epicPrompt.Repository.JogadorRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter{

	@Autowired
	private TokenService tokenService;

	@Autowired
	private JogadorRepository jogadorRepository;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
				var token = this.recoverToken(request);
				if(token != null) {
					var nomeJogador = tokenService.validadeToken(token);
					UserDetails jogador = jogadorRepository.findJogadorBynomeJogador(nomeJogador);
					
					var authentication = new UsernamePasswordAuthenticationToken(jogador, null, jogador.getAuthorities());
					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
				filterChain.doFilter(request, response);
	}
	
	private String recoverToken(HttpServletRequest request) {
		var authHeader = request.getHeader("Authorization");
		if(authHeader == null) return null;
		return authHeader.replace("Bearer ", "");
	}
	
}