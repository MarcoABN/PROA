package com.proa.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table (name="orgmilitar")
public class OrgMilitar {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	
	@Column (name = "nome")
	private String nome;
	
	@Column (name = "abreviatura")
	private String abreviatura;
	
	@Column (name = "telefone")
	private String telefone;
	
	@Column (name = "logradouro")
	private String logradouro;
	
	@Column (name = "bairro")
	private String bairro;
	
	@Column (name = "numero")
	private String numero;
	
	@Column (name = "complemento")
	private String complemento;
	
	@Column (name = "UF")
	private String UF;
	
	@Column (name = "cidade")
	private String cidade;
	
	@Column (name = "CEP")
	private String CEP;

	

	public OrgMilitar(Long iD, String nome, String abreviatura, String telefone, String logradouro, String bairro,
			String numero, String complemento, String uF, String cidade, String cEP) {
		super();
		ID = iD;
		this.nome = nome;
		this.abreviatura = abreviatura;
		this.telefone = telefone;
		this.logradouro = logradouro;
		this.bairro = bairro;
		this.numero = numero;
		this.complemento = complemento;
		UF = uF;
		this.cidade = cidade;
		CEP = cEP;
	}

	public OrgMilitar() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getAbreviatura() {
		return abreviatura;
	}

	public void setAbreviatura(String abreviatura) {
		this.abreviatura = abreviatura;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public String getUF() {
		return UF;
	}

	public void setUF(String uF) {
		UF = uF;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getCEP() {
		return CEP;
	}

	public void setCEP(String cEP) {
		CEP = cEP;
	}


	

	
}
