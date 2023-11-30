package com.epicPrompt.Services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epicPrompt.Models.Jogador;
import com.epicPrompt.Repository.JogadorRepository;

@Service
public class JogadorService {
	
	@Autowired
	private JogadorRepository jogadorRepository;
	
	public List<Jogador> findAll(){
		return jogadorRepository.findAll();
	}
	
	public Jogador findById(Integer id) {
	    Optional<Jogador> jogador = jogadorRepository.findById(id);
	    return jogador.orElseThrow(() -> new NoSuchElementException("Jogador não encontrado"));
	}
	
    public Jogador procurarJogadorPorNome(String nomeJogador) {
    	Jogador jogador = jogadorRepository.findJogadorByNome(nomeJogador);
  		return jogador;
    }
    
	public Jogador salvar(Jogador jogador) {
		return jogadorRepository.save(jogador);
	}
	
	public Boolean verificaNomeJogadorExiste(String nomeJogador) {
	    Jogador jogador = jogadorRepository.findJogadorByNome(nomeJogador);
	    if(jogador == null) {
	    	return true;
	    }
	    return false;
	}
	
	public Boolean verificaLogin(Jogador jogador) {
		List<Jogador> jogadores = findAll();
		for(int i=0; i<jogadores.size(); ++i){
			if(jogadores.get(i).getNomeJogador().equals(jogador.getNomeJogador()) 
					&& jogadores.get(i).getSenha().equals(jogador.getSenha())) {
				return true;
			}
		}
		return false;
	}
}
