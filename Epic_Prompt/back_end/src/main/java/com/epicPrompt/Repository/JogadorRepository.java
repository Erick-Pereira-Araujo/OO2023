package com.epicPrompt.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.epicPrompt.Models.Jogador;

@Repository
public interface JogadorRepository extends JpaRepository<Jogador, Integer>{
	
	@Query("SELECT j FROM Jogador j WHERE j.nomeJogador = :nomeJogador")
	Jogador findJogadorByNome(@Param("nomeJogador") String nomeJogador);
	
	UserDetails findJogadorBynomeJogador(String nomeJogador);

}
