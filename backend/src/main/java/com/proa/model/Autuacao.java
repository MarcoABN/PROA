package com.proa.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

//Declaração da Classe "AUTUACAO" para Back-end e criação do banco via Hibernate

@Entity
@Table (name="autuacao")
public class Autuacao {
	

	//Declaração de relacionamento "Muitos para Um" com entidade Embarcacao
	@ManyToOne
	@JoinColumn(name = "embarcacao_id")
	private Embarcacao embarcacao;
	
	@ManyToOne
	@JoinColumn(name = "cliente_id")
	private Cliente cliente;
	
	@ManyToOne
	@JoinColumn(name = "empresa_id")
	private Empresa empresa;
	
	@ManyToOne
	@JoinColumn(name = "orgmilitar_id")
	private OrgMilitar orgmilitar;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;

	//Descrição da Autuação ("História" contada pelo autuado a fim de entendimento e geração da defesa.)
	@Column (name="descricao")
	private String descricao;

	//Defesa da Autuação (Trecho que embasa a defesa junto ao órgão responsável)
	@Column (name="defesa")
	private String defesa;

	public Autuacao(Long iD, String descricao, String defesa) {
		super();
		ID = iD;
		this.descricao = descricao;
		this.defesa = defesa;
	}

	public Autuacao() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getDefesa() {
		return defesa;
	}

	public void setDefesa(String defesa) {
		this.defesa = defesa;
	}

	public Embarcacao getEmbarcacao() {
		return embarcacao;
	}

	public void setEmbarcacao(Embarcacao embarcacao) {
		this.embarcacao = embarcacao;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
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
	
	

}
