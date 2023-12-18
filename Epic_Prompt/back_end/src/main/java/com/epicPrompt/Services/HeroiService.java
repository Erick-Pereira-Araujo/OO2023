package com.epicPrompt.Services;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epicPrompt.Models.Heroi;
import com.epicPrompt.Models.Jogador;
import com.epicPrompt.Repository.HeroiRepository;

@Service
public class HeroiService {
	
	@Autowired
	private HeroiRepository heroiRepository;
	
	public Heroi findById(Integer id) {
	    Optional<Heroi> heroi = heroiRepository.findById(id);
	    return heroi.orElseThrow(() -> new NoSuchElementException("Heroi não encontrado"));
	}
	
	public Heroi criarHeroi() {
		Heroi heroi = new Heroi();
		heroi.setAtaque(10);
		heroi.setDefesa(10);
		heroi.setNivel(1);
		heroi.setVida(100);
		heroi.setBarraXP(100);
		heroi.setXpAtual(0);
		
		return heroiRepository.save(heroi);
	}
	
	public Heroi levelUp(Heroi heroi, Integer dropXP){
		if(heroi.getNivel() < 10) {
			heroi.setXpAtual(heroi.getXpAtual() + dropXP - heroi.getBarraXP());
			heroi.setBarraXP(heroi.getBarraXP()+100);
			
			//Existe a possibilidade do heroi upar 2 níveis de uma vez, para isso temos esse if.
			if(heroi.getXpAtual() >= heroi.getBarraXP()) {
				//aqui é caso ele upe 2 níveis
				heroi.setXpAtual(heroi.getXpAtual() - heroi.getBarraXP());
				heroi.setBarraXP(heroi.getBarraXP()+100);
				heroi.setAtaque(heroi.getAtaque()+10);
				heroi.setDefesa(heroi.getDefesa()+10);
				heroi.setVida(heroi.getVida()+40);
				heroi.setNivel(heroi.getNivel()+2);
			}else {
				//aqui é caso ele upe 1 nível
				heroi.setAtaque(heroi.getAtaque()+5);
				heroi.setDefesa(heroi.getDefesa()+5);
				heroi.setVida(heroi.getVida()+20);
				heroi.setNivel(heroi.getNivel()+1);
			}
		}
		//atualiza o heroi no banco e retorna esse heroi.
		return heroiRepository.save(heroi);
	}
	
	public Heroi ganhaXP(Heroi heroi, Integer dropXP){
		heroi.setXpAtual(heroi.getXpAtual() + dropXP);
		
		//atualiza o heroi no banco e retorna esse heroi.
		return heroiRepository.save(heroi);
	}


}
