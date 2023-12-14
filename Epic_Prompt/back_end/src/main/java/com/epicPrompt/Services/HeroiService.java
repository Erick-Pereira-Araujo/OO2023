package com.epicPrompt.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epicPrompt.Models.Heroi;
import com.epicPrompt.Repository.HeroiRepository;

@Service
public class HeroiService {
	
	@Autowired
	private HeroiRepository heroiRepository;
	
	public Heroi criarHeroi() {
		Heroi heroi = new Heroi();
		heroi.setAtaque(10);
		heroi.setDefesa(10);
		heroi.setNivel(1);
		heroi.setVida(100);
		heroi.setBarraXP(100);
		
		return heroiRepository.save(heroi);
	}

}
