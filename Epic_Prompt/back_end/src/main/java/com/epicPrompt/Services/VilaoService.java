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
		
		/*Vilao vilao1 =  new Vilao();
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
		vilao3.setAtaque(22);
		vilao3.setDefesa(10);
		vilao3.setVida(150);
		vilao3.setDropXP(300);
		
		Vilao vilao4 =  new Vilao();
		vilao4.setId(4);
		vilao4.setAtaque(27);
		vilao4.setDefesa(15);
		vilao4.setVida(170);
		vilao4.setDropXP(400);
		
		criarVilao(vilao1);
		criarVilao(vilao2);
		criarVilao(vilao3);
		criarVilao(vilao4);*/
	}
	
}
