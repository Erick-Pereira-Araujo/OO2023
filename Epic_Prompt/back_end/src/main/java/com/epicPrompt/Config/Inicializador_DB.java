package com.epicPrompt.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.epicPrompt.Services.VilaoService;

@Configuration
public class Inicializador_DB {
	
	@Autowired
	VilaoService vilaoService;
	
	@Bean
	public Boolean CriaViloesDB() {
		vilaoService.iniciaBanco();
		return true;
	}

}
