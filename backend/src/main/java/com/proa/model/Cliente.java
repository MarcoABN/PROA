package com.proa.model;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

//Declaração da Classe "Cliente" para Back-end e criação do banco via Hibernate


@Entity
@Table (name="cliente")
public class Cliente {
	
	@OneToMany(mappedBy = "cliente")
    private List<Embarcacao> embarcacoes;
	
	@ManyToOne
	@JoinColumn(name = "orgmilitar_id")
	private OrgMilitar orgmilitar;
	
	@ManyToOne
	@JoinColumn(name = "empresa_id")
	private Empresa empresa;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column (name="nome")
	private String nome;
	
	@Column (name="rg")
	private String RG;
	
	@Column (name="orgemissor")
	private String orgEmissor;
	
	@Column (name = "dtemissao")
	private Date dtEmissao;
	
	@Column (name="cpfcnpj")
	private String CPFCNPJ;
	
	@Column (name="nacionalidade")
	private String nacionalidade;
	
	@Column (name="naturalidade")
	private String naturalidade;
	
	@Column (name="datanasc")
	private Date dataNasc;
	
	@Column (name="telefone")
	private String telefone;
	
	@Column (name="celular")
	private String celular;
	
	@Column (name="email")
	private String email;
	
	@Column (name="senha")
	private String senha;
	
	@Column (name="cep")
	private String cep;
	
	@Column (name="logradouro")
	private String logradouro;
	
	@Column (name="numero")
	private String numero;
	
	@Column (name="complemento")
	private String complemento;
	
	@Column (name="bairro")
	private String bairro;
	
	@Column (name="cidade")
	private String cidade;
	
	@Column (name="uf")
	private String UF;
	
	@Column (name="representaempresa")
	private String representaEmpresa;
	


	
	

	

	

	public Cliente(List<Embarcacao> embarcacoes, OrgMilitar orgmilitar, Long id, String nome, String rG,
			String orgEmissor, Date dtEmissao, String cPFCNPJ, String nacionalidade, String naturalidade, Date dataNasc,
			String telefone, String celular, String email, String senha, String cep, String logradouro, String numero,
			String complemento, String bairro, String cidade, String uF, String representaEmpresa, Long idEmpresa) {
		super();
		this.embarcacoes = embarcacoes;
		this.orgmilitar = orgmilitar;
		this.id = id;
		this.nome = nome;
		RG = rG;
		this.orgEmissor = orgEmissor;
		this.dtEmissao = dtEmissao;
		CPFCNPJ = cPFCNPJ;
		this.nacionalidade = nacionalidade;
		this.naturalidade = naturalidade;
		this.dataNasc = dataNasc;
		this.telefone = telefone;
		this.celular = celular;
		this.email = email;
		this.senha = senha;
		this.cep = cep;
		this.logradouro = logradouro;
		this.numero = numero;
		this.complemento = complemento;
		this.bairro = bairro;
		this.cidade = cidade;
		UF = uF;
		this.representaEmpresa = representaEmpresa;

	}
 

	public Cliente() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getID() {
		return id;
	}

	public void setID(Long iD) {
		id = iD;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		
		this.nome = nome.toUpperCase();
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
		this.orgEmissor = orgEmissor.toUpperCase();
	}

	public String getCPFCNPJ() {
		return CPFCNPJ;
	}

	public void setCPFCNPJ(String cPFCNPJ) {
		CPFCNPJ = cPFCNPJ;
	}

	public Date getDataNasc() {
		return dataNasc;
	}

	public void setDataNasc(Date dataNasc) {
		this.dataNasc = dataNasc;
	}

	public Date getDtEmissao() {
		return dtEmissao;
	}

	public void setDtEmissao(Date dtEmissao) {
		this.dtEmissao = dtEmissao;
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
		this.email = email.toUpperCase();
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro.toUpperCase();
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
		this.complemento = complemento.toUpperCase();
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro.toUpperCase();
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade.toUpperCase();
	}

	public String getUF() {
		return UF;
	}

	public void setUF(String uF) {
		UF = uF.toUpperCase();
	}

	

	public String getRepresentaEmpresa() {
		return representaEmpresa;
	}

	public void setRepresentaEmpresa(String representaEmpresa) {
		this.representaEmpresa = representaEmpresa;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}

	public OrgMilitar getOrgmilitar() {
		return orgmilitar;
	}

	public void setOrgmilitar(OrgMilitar orgmilitar) {
		this.orgmilitar = orgmilitar;
	}
	
	public String getNaturalidade() {
		return naturalidade;
	}

	public void setNaturalidade(String naturalidade) {
		this.naturalidade = naturalidade;
	}

	public String getNacionalidade() {
		return nacionalidade;
	}

	public void setNacionalidade(String nacionalidade) {
		this.nacionalidade = nacionalidade;
	}

	
	

	
	
	
}
