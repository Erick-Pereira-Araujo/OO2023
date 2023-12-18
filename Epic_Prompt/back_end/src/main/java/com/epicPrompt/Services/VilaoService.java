package com.epicPrompt.Services;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epicPrompt.Models.Vilao;
import com.epicPrompt.Repository.VilaoRepository;

@Service
public class VilaoService {

	@Autowired
	private VilaoRepository vilaoRepository;
	
	public Vilao findById(Integer id) {
	    Optional<Vilao> vilao = vilaoRepository.findById(id);
	    return vilao.orElseThrow(() -> new NoSuchElementException("Vilão não encontrado"));
	}
	
	public Vilao criarVilao(Vilao vilao) {
		return vilaoRepository.save(vilao);
	}
	
	public void iniciaBanco() {
		Vilao vilao1 =  new Vilao();
		vilao1.setId(1);
		vilao1.setAtaque(12);
		vilao1.setDefesa(6);
		vilao1.setVida(110);
		vilao1.setDropXP(100);
		
		Vilao vilao2 =  new Vilao();
		vilao2.setId(2);
		vilao2.setAtaque(17);
		vilao2.setDefesa(8);
		vilao2.setVida(130);
		vilao2.setDropXP(200);

		Vilao vilao3 =  new Vilao();
		vilao3.setId(3);
		vilao3.setAtaque(13);
		vilao3.setDefesa(16);
		vilao3.setVida(150);
		vilao3.setDropXP(300);
		
		Vilao vilao4 =  new Vilao();
		vilao4.setId(4);
		vilao4.setAtaque(27);
		vilao4.setDefesa(18);
		vilao4.setVida(170);
		vilao4.setDropXP(400);
		
		Vilao vilao5 =  new Vilao();
		vilao5.setId(5);
		vilao5.setAtaque(32);
		vilao5.setDefesa(21);
		vilao5.setVida(190);
		vilao5.setDropXP(500);
		
		Vilao vilao6 =  new Vilao();
		vilao6.setId(6);
		vilao6.setAtaque(37);
		vilao6.setDefesa(26);
		vilao6.setVida(210);
		vilao6.setDropXP(600);

		Vilao vilao7 =  new Vilao();
		vilao7.setId(7);
		vilao7.setAtaque(42);
		vilao7.setDefesa(31);
		vilao7.setVida(230);
		vilao7.setDropXP(700);
		
		Vilao vilao8 =  new Vilao();
		vilao8.setId(8);
		vilao8.setAtaque(47);
		vilao8.setDefesa(36);
		vilao8.setVida(250);
		vilao8.setDropXP(800);
		
		Vilao vilao9 =  new Vilao();
		vilao9.setId(9);
		vilao9.setAtaque(52);
		vilao9.setDefesa(41);
		vilao9.setVida(270);
		vilao9.setDropXP(900);
		
		Vilao vilao10 =  new Vilao();
		vilao10.setId(10);
		vilao10.setAtaque(57);
		vilao10.setDefesa(46);
		vilao10.setVida(290);
		vilao10.setDropXP(1000);
		
		criarVilao(vilao1);
		criarVilao(vilao2);
		criarVilao(vilao3);
		criarVilao(vilao4);
		criarVilao(vilao5);
		criarVilao(vilao6);
		criarVilao(vilao7);
		criarVilao(vilao8);
		criarVilao(vilao9);
		criarVilao(vilao10);
		
	}
	
}
