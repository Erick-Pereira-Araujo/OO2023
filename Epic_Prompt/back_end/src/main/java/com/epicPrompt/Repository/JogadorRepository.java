package com.epicPrompt.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.epicPrompt.Models.Jogador;

@Repository
public interface JogadorRepository extends JpaRepository<Jogador, Integer>{
	
	Jogador findJogadorBynomeJogador(String nomeJogador);

}
