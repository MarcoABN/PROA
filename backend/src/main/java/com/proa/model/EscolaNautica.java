package com.proa.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class EscolaNautica {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column (name="razaosocial")
	private String razaoSocial;
	
	@Column (name="cnpj")
	private String cnpj;
	
	//->Relacionamento com Prestador (Instrutor)
    @ManyToOne
    @JoinColumn(name = "instrutor_id")
    private Prestador instrutor;
	
    //->Relacionamento com Prestador (Responsável)
    @ManyToOne
    @JoinColumn(name = "responsavel_id")
    private Prestador responsavel;
    
    

	public EscolaNautica() {
		super();
		// TODO Auto-generated constructor stub
	}


	public EscolaNautica(Long id, String razaoSocial, String cnpj, Prestador instrutor, Prestador responsavel) {
		super();
		this.id = id;
		this.razaoSocial = razaoSocial;
		this.cnpj = cnpj;
		this.instrutor = instrutor;
		this.responsavel = responsavel;
	}


	public Long getId() {
		return id;
	}


	public String getRazaoSocial() {
		return razaoSocial;
	}


	public void setRazaoSocial(String razaoSocial) {
		this.razaoSocial = razaoSocial;
	}


	public String getCnpj() {
		return cnpj;
	}


	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}


	public Prestador getInstrutor() {
		return instrutor;
	}


	public void setInstrutor(Prestador instrutor) {
		this.instrutor = instrutor;
	}


	public Prestador getResponsavel() {
		return responsavel;
	}


	public void setResponsavel(Prestador responsavel) {
		this.responsavel = responsavel;
	}
	
	
	
}
