package com.epicPrompt.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Jogador {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;	
	
    @Column(unique = true)
	private String nomeJogador;
    
    @Column(nullable = false)
	private String senha;
    
    @OneToOne
    private Heroi heroi;
    
    private Boolean loginStatus;

	public Jogador() {
	}
	
	public Jogador(Integer id, String nomeJogador, String senha, Heroi heroi, Boolean loginStatus) {
		this.id = id;
		this.nomeJogador = nomeJogador;
		this.senha = senha;
		this.heroi = heroi;
		this.loginStatus = loginStatus;
	}
	
	public Jogador(String nomeJogador, String senha, Boolean loginStatus) {
		this.nomeJogador = nomeJogador;
		this.senha = senha;
		this.loginStatus = loginStatus;
	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNomeJogador() {
		return nomeJogador;
	}

	public void setNomeJogador(String nomeJogador) {
		this.nomeJogador = nomeJogador;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public Heroi getHeroi() {
		return heroi;
	}

	public void setHeroi(Heroi heroi) {
		this.heroi = heroi;
	}
	
	public Boolean getLoginStatus() {
		return loginStatus;
	}

	public void setLoginStatus(Boolean loginStatus) {
		this.loginStatus = loginStatus;
	}

}
