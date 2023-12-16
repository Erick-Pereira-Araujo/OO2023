package com.epicPrompt.Models;

import jakarta.persistence.MappedSuperclass;

//MapperdSuperClass serve para avisar ao hibernate essa classe não é uma entidade a ser criada uma tabela
//mas seus atributos devem ser mapeados para as classes filhas possam ter esses atributos em suas tabelas
@MappedSuperclass
public abstract class Personagem {
	
	protected Integer vida;
	
	protected Integer ataque;
	
	protected Integer defesa;

	public Integer getVida() {
		return vida;
	}

	public void setVida(Integer vida) {
		this.vida = vida;
	}

	public Integer getAtaque() {
		return ataque;
	}

	public void setAtaque(Integer ataque) {
		this.ataque = ataque;
	}

	public Integer getDefesa() {
		return defesa;
	}

	public void setDefesa(Integer defesa) {
		this.defesa = defesa;
	}

}
