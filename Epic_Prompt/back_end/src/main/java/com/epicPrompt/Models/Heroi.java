package com.epicPrompt.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Heroi extends Personagem{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;	
	
	private Integer jogadorId;
	
	private Integer barraXP;
	
	public Heroi() {
	}

	public Heroi(Integer jogadorId, Integer barraXP) {
		super();
		this.jogadorId = jogadorId;
		this.barraXP = barraXP;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getJogadorId() {
		return jogadorId;
	}

	public void setJogadorId(Integer jogadorId) {
		this.jogadorId = jogadorId;
	}

	public Integer getBarraXP() {
		return barraXP;
	}

	public void setBarraXP(Integer barraXP) {
		this.barraXP = barraXP;
	}

}
