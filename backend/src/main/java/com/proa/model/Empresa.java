package com.proa.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table (name="empresa")
public class Empresa {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	
	@Column (name = "razaosocial")
	private String razaoSocial;
	
	@Column (name = "CNPJ")
	private String CNPJ;
	
	@Column (name = "email")
	private String email;
	
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


	
	
	public Empresa(Long iD, String razaoSocial, String cNPJ, String email, String telefone, String logradouro,
			String bairro, String numero, String complemento, String uF, String cidade, String cEP) {
		super();
		ID = iD;
		this.razaoSocial = razaoSocial;
		CNPJ = cNPJ;
		this.email = email;
		this.telefone = telefone;
		this.logradouro = logradouro;
		this.bairro = bairro;
		this.numero = numero;
		this.complemento = complemento;
		UF = uF;
		this.cidade = cidade;
		CEP = cEP;
	}

	public Empresa() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public String getRazaoSocial() {
		return razaoSocial;
	}

	public void setRazaoSocial(String razaoSocial) {
		this.razaoSocial = razaoSocial;
	}

	public String getCNPJ() {
		return CNPJ;
	}

	public void setCNPJ(String cNPJ) {
		CNPJ = cNPJ;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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
