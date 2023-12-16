package com.epicPrompt.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Vilao extends Personagem{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;	
	
	private Integer dropXP;
	
	public Vilao() {
	}

	public Vilao(Integer id, Integer dropXP) {
		super();
		this.id = id;
		this.dropXP = dropXP;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getDropXP() {
		return dropXP;
	}

	public void setDropXP(Integer dropXP) {
		this.dropXP = dropXP;
	}

}
