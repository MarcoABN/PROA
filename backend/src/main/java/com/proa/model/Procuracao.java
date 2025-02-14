package com.proa.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name="procuracao")
public class Procuracao {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column (name = "modeloProcuracao", unique = true)
	private String modeloProcuracao;
	
	@Column (name = "textoProcuracao", length = 4096)
	private String textoProcuracao;
	
	
	public Procuracao() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Procuracao(Long id, String modeloProcuracao, String textoProcuracao) {
		super();
		this.id = id;
		this.modeloProcuracao = modeloProcuracao;
		this.textoProcuracao = textoProcuracao;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getModeloProcuracao() {
		return modeloProcuracao;
	}

	public void setModeloProcuracao(String modeloProcuracao) {
		this.modeloProcuracao = modeloProcuracao;
	}

	public String getTextoProcuracao() {
		return textoProcuracao;
	}

	public void setTextoProcuracao(String textoProcuracao) {
		this.textoProcuracao = textoProcuracao;
	}
		
	
}
