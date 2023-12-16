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
	
	private Integer nivel;
	
	private Integer barraXP;
	
	private Integer xpAtual;
	
	public Heroi() {
	}

	public Heroi(Integer nivel, Integer barraXP, Integer xpAtual) {
		super();
		this.barraXP = barraXP;
		this.xpAtual = xpAtual;
		this.nivel = nivel;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public Integer getNivel() {
		return nivel;
	}

	public void setNivel(Integer nivel) {
		this.nivel = nivel;
	}

	public Integer getBarraXP() {
		return barraXP;
	}

	public void setBarraXP(Integer barraXP) {
		this.barraXP = barraXP;
	}

	public Integer getXpAtual() {
		return xpAtual;
	}

	public void setXpAtual(Integer xpAtual) {
		this.xpAtual = xpAtual;
	}

}
