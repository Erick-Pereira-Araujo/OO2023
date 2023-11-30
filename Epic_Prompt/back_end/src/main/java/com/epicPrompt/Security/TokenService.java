package com.epicPrompt.Security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.epicPrompt.Models.Jogador;

@Service
public class TokenService {
	
	@Value("${api.security.token.secret}")
	private String secret;

	public String generateToken(Jogador jogador) {
		try {
			Algorithm algorithm = Algorithm.HMAC256(secret);
			String token = JWT.create()
					.withIssuer("api")
					.withSubject(jogador.getNomeJogador())
					.withExpiresAt(geExiprationDate())
					.sign(algorithm);
			return token;
		}catch(JWTCreationException exception){
			throw new RuntimeException("Error ao gerar o token", exception);
		}
	}
	
	public String validadeToken(String token) {
		try {
			Algorithm algorithm = Algorithm.HMAC256(secret);
			
			return JWT.require(algorithm)
					.withIssuer("api")
					.build()
					.verify(token)
					.getSubject();
		}catch(JWTCreationException exception){
			return "";
		}
	}
	
	private Instant geExiprationDate() {
		return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
	}
}
