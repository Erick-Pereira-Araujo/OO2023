package com.epicPrompt.Services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epicPrompt.Models.Heroi;
import com.epicPrompt.Models.Jogador;
import com.epicPrompt.Repository.JogadorRepository;

@Service
public class JogadorService {
	
	@Autowired
	private JogadorRepository jogadorRepository;
	
	@Autowired
	private HeroiService heroiService;
	
	public List<Jogador> findAll(){
		return jogadorRepository.findAll();
	}
	
	public Jogador findById(Integer id) {
	    Optional<Jogador> jogador = jogadorRepository.findById(id);
	    return jogador.orElseThrow(() -> new NoSuchElementException("Jogador não encontrado"));
	}
	
    
	public Jogador cadastarJogador(Jogador jogador) {
		Heroi heroi = heroiService.criarHeroi();
		jogador.setHeroi(heroi);
		jogador.setLoginStatus(false);
		return jogadorRepository.save(jogador);
	}
	
	public Jogador atualizarLoginStatus(Jogador jogador) {
		
		Jogador jogadorAtualizado = findById(jogador.getId());
		
		if(jogadorAtualizado.getLoginStatus() == false) {
			jogadorAtualizado.setLoginStatus(true);
		}else{
			jogadorAtualizado.setLoginStatus(false);
		}
		
		return jogadorRepository.save(jogadorAtualizado);
	}
	
	public Boolean verificaNomeJogadorExiste(String nomeJogador) {
	    Jogador jogador = jogadorRepository.findJogadorBynomeJogador(nomeJogador);
	    if(jogador == null) {
	    	return true;
	    }
	    return false;
	}
	
	public Integer verificaLogin(Jogador jogador) {
		List<Jogador> jogadores = findAll();
		for(int i=0; i<jogadores.size(); ++i){
			if(jogadores.get(i).getNomeJogador().equals(jogador.getNomeJogador()) 
					&& jogadores.get(i).getSenha().equals(jogador.getSenha())) {
				atualizarLoginStatus(jogadores.get(i));
				return jogadores.get(i).getId();
			}
		}
		return null;
	}
}
