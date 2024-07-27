package com.proa.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table (name="motor")
public class Motor {
	
	//Declaração de relacionamento "Muitos para Um" com entidade Embarcacao
	@ManyToOne
    @JoinColumn(name = "embarcacao_id")
    private Embarcacao embarcacao;
	
	

	@ManyToOne
    @JoinColumn(name = "notafiscal_id")
    private NotaFiscal notaFiscal;
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column (name = "potencia")
	private String potencia;
	
	@Column (name = "marca")
	private String marca;
	
	@Column (name = "numserie")
	private String numSerie;

	public Motor(Long iD, String potencia, String marca, String numSerie) {
		super();
		id = iD;
		this.potencia = potencia;
		this.marca = marca;
		this.numSerie = numSerie;
	}

	public Motor() {
		super();
	}

	public Long getID() {
		return id;
	}

	public void setID(Long iD) {
		id = iD;
	}

	public String getPotencia() {
		return potencia;
	}

	public void setPotencia(String potencia) {
		this.potencia = potencia;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca.toUpperCase();
	}

	public String getNumSerie() {
		return numSerie;
	}

	public void setNumSerie(String numSerie) {
		this.numSerie = numSerie;
	}
	
	public Embarcacao getEmbarcacao() {
		return embarcacao;
	}

	public void setEmbarcacao(Embarcacao embarcacao) {
		this.embarcacao = embarcacao;
	}

	public NotaFiscal getNotaFiscal() {
		return notaFiscal;
	}

	public void setNotaFiscal(NotaFiscal notaFiscal) {
		this.notaFiscal = notaFiscal;
	}

	
	
	
}
