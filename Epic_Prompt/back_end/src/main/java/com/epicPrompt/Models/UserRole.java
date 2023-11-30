package com.epicPrompt.Models;

public enum UserRole {

	ADMIN("admin"),
	USER("user");
	
	private String role;
	
	UserRole(String role){
		this.role = role;
	}
	
	public String getUserRole() {
		return this.role;
	}
}
