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
@Table (name="notafiscal")
public class NotaFiscal {
	
	//Declaração de relacionamento "Muitos para Um" com entidade Embarcacao
	@ManyToOne
	@JoinColumn(name = "embarcacao_id")
	private Embarcacao embarcacao;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column (name = "CNPJvendedor")
	private String CNPJVendedor;
	
	@Column (name = "razaosocial")
	private String razaoSocial;
	
	@Column (name = "dtvenda")
	private Date dtVenda;
	
	@Column (name = "local")
	private String Local;
	
	@Column (name = "numeronotafiscal")
	private String numeroNotaFiscal;

	
	

	public NotaFiscal(Embarcacao embarcacao, Long iD, String cNPJVendedor, String razaoSocial, Date dtVenda,
			String local, String numeroNotaFiscal) {
		super();
		this.embarcacao = embarcacao;
		id = iD;
		CNPJVendedor = cNPJVendedor;
		this.razaoSocial = razaoSocial;
		this.dtVenda = dtVenda;
		Local = local;
		this.numeroNotaFiscal = numeroNotaFiscal;
	}

	public NotaFiscal() {
		super();
		 //TODO Auto-generated constructor stub
	}

	public Long getID() {
		return id;
	}

	public void setID(Long iD) {
		id = iD;
	}

	public String getCNPJVendedor() {
		return CNPJVendedor;
	}

	public void setCNPJVendedor(String cNPJVendedor) {
		CNPJVendedor = cNPJVendedor;
	}

	public String getRazaoSocial() {
		return razaoSocial;
	}

	public void setRazaoSocial(String razaoSocial) {
		this.razaoSocial = razaoSocial.toUpperCase();
	}

	public Date getDtVenda() {
		return dtVenda;
	}

	public void setDtVenda(Date dtVenda) {
		this.dtVenda = dtVenda;
	}

	public String getLocal() {
		return Local;
	}

	public void setLocal(String local) {
		Local = local.toUpperCase();
	}

	public String getNumeroNotaFiscal() {
		return numeroNotaFiscal;
	}

	public void setNumeroNotaFiscal(String numeroNotaFiscal) {
		this.numeroNotaFiscal = numeroNotaFiscal;
	}

	public Embarcacao getEmbarcacao() {
		return embarcacao;
	}

	public void setEmbarcacao(Embarcacao embarcacao) {
		this.embarcacao = embarcacao;
	}	
	
	
}
