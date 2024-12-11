package com.proa.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table (name="prestador")
public class Prestador {
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	
	@Column (name = "nome")
	private String nome;
	
	@Column (name = "RG")
	private String RG;
	
	@Column (name = "orgemissor")
	private String orgEmissor;
	
	@Column (name = "dtemissao")
	private Date dtEmissao;
	
	@Column (name = "nacionalidade")
	private String nacionalidade;
	
	@Column (name = "estadocivil")
	private String estadoCivil;
	
	@Column (name = "profissao")
	private String profissao;
	
	@Column (name = "CPFCNPJ")
	private String CPFCNPJ;
	
	@Column (name = "telefone")
	private String telefone;
	
	@Column (name = "celular")
	private String celular;
	
	@Column (name = "email")
	private String email;
	
	@Column (name = "senha")
	private String senha;
	
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

	

	public Prestador(Long iD, String nome, String rG, String orgEmissor, Date dtEmissao,
			String nacionalidade, String estadoCivil, String profissao, String cPFCNPJ, String telefone, String celular,
			String email, String senha, String logradouro, String bairro, String numero, String complemento, String uF,
			String cidade, String cEP) {
		super();
		ID = iD;
		this.nome = nome;
		RG = rG;
		this.orgEmissor = orgEmissor;
		this.dtEmissao = dtEmissao;
		this.nacionalidade = nacionalidade;
		this.estadoCivil = estadoCivil;
		this.profissao = profissao;
		CPFCNPJ = cPFCNPJ;
		this.telefone = telefone;
		this.celular = celular;
		this.email = email;
		this.senha = senha;
		this.logradouro = logradouro;
		this.bairro = bairro;
		this.numero = numero;
		this.complemento = complemento;
		UF = uF;
		this.cidade = cidade;
		CEP = cEP;
	}

	public Prestador() {
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

	public String getRG() {
		return RG;
	}

	public void setRG(String rG) {
		RG = rG;
	}

	public String getOrgEmissor() {
		return orgEmissor;
	}

	public void setOrgEmissor(String orgEmissor) {
		this.orgEmissor = orgEmissor;
	}

	public Date getDtEmissao() {
		return dtEmissao;
	}

	public void setDtEmissao(Date dtEmissao) {
		this.dtEmissao = dtEmissao;
	}

	public String getCPFCNPJ() {
		return CPFCNPJ;
	}

	public void setCPFCNPJ(String cPFCNPJ) {
		CPFCNPJ = cPFCNPJ;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
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

	public String getNacionalidade() {
		return nacionalidade;
	}

	public void setNacionalidade(String nacionalidade) {
		this.nacionalidade = nacionalidade;
	}

	public String getEstadoCivil() {
		return estadoCivil;
	}

	public void setEstadoCivil(String estadoCivil) {
		this.estadoCivil = estadoCivil;
	}

	public String getProfissao() {
		return profissao;
	}

	public void setProfissao(String profissao) {
		this.profissao = profissao;
	}
	
	
}
