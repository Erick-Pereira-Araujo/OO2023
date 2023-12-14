package com.epicPrompt.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epicPrompt.Models.Heroi;

public interface HeroiRepository extends JpaRepository<Heroi, Integer>{
	

}
