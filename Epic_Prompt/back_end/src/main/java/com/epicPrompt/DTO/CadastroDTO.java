package com.epicPrompt.DTO;

import com.epicPrompt.Models.UserRole;

public record CadastroDTO(String nomeJogador, String senha, UserRole role) {

}
