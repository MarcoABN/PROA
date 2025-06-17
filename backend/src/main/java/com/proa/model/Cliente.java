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
	
	@Column (name="cpfcnpj", unique = true)
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
	
	@Column (name="cha_numero")
	private String cha_numero;
	
	@Column (name="cha_categoria")
	private String cha_categoria;
	
	@Column (name="cha_dtemissao")
	private Date cha_dtemissao;
	

	public Cliente(List<Embarcacao> embarcacoes, OrgMilitar orgmilitar, Long id, String nome, String rG,
			String orgEmissor, Date dtEmissao, String cPFCNPJ, String nacionalidade, String naturalidade, Date dataNasc,
			String telefone, String celular, String email, String senha, String cep, String logradouro, String numero,
			String complemento, String bairro, String cidade, String uF, String cha_numero, String cha_categoria,
			Date cha_dtemissao) {
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
		this.cha_numero = cha_numero;
		this.cha_categoria = cha_categoria;
		this.cha_dtemissao = cha_dtemissao;
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
		this.email = email;
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
		this.logradouro = logradouro;
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

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getUF() {
		return UF;
	}

	public void setUF(String uF) {
		UF = uF;
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


	public String getCha_numero() {
		return cha_numero;
	}


	public void setCha_numero(String cha_numero) {
		this.cha_numero = cha_numero;
	}


	public String getCha_categoria() {
		return cha_categoria;
	}


	public void setCha_categoria(String cha_categoria) {
		this.cha_categoria = cha_categoria;
	}


	public Date getCha_dtemissao() {
		return cha_dtemissao;
	}


	public void setCha_dtemissao(Date cha_dtemissao) {
		this.cha_dtemissao = cha_dtemissao;
	}

	
	
	

	
	
	
}
