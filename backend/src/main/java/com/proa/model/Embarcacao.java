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
@Table (name="embarcacao")
public class Embarcacao {

	
	//Declaração de relacionamento "Um para muitos" com entidades OrgMilitar, Empresa e Cliente

	@ManyToOne
	@JoinColumn(name = "orgmilitar_id")
	private OrgMilitar orgmilitar;
	
	@ManyToOne
	@JoinColumn(name = "empresa_id")
	private Empresa empresa;
	
	@ManyToOne
	@JoinColumn(name = "cliente_id")
	private Cliente cliente;


	//Declaração de variáveis, métodos e etc. 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column (name = "qtdmotores")
	private int qtdMotores;

	@Column (name = "arqueacaoliquida")
	private float arqueacaoLiquida;

	@Column (name = "bocamoldada")
	private float bocaMoldada;

	@Column (name = "areanavegacao")
	private String areaNavegacao;

	@Column (name = "compperpendicular")
	private float compPerpendicular;

	@Column (name = "numcasco")
	private String numCasco;

	@Column (name = "dtconstrucao")
	private Date dtConstrucao;

	@Column (name = "capacarmazenamento")
	private float capArmazenamento;

	@Column (name = "matcasco")
	private String matCasco;

	@Column (name = "qtdtripulantes")
	private int qtdTripulantes;

	@Column (name = "contorno")
	private float contorno;

	@Column (name = "comptotal")
	private float compTotal;

	@Column (name = "lotacao")
	private int lotacao;

	@Column (name = "tipopropulsao")
	private String tipoPropulsao;

	@Column (name = "matsuperestrutura")
	private String matSuperestrutura;

	@Column (name = "pontalmoldado")
	private float pontalMoldado;

	@Column (name = "construtor")
	private String construtor;

	@Column (name = "arqueacaobruta")
	private float arqueacaoBruta;

	@Column (name = "tipoembarcacao")
	private String tipoEmbarcacao;

	@Column (name = "nomeembarcacao")
	private String nomeEmbarcacao;

	@Column (name = "corpredominante")
	private String corPredominante;

	@Column (name = "portebruto")
	private String porteBruto;

	@Column (name = "dtinscricao")
	private Date dtInscricao;

	@Column (name = "potenciamotor")
	private float potenciaMotor;

	@Column (name = "calado")
	private String calado;

	@Column (name = "numinscricao")
	private String numInscricao;

	@Column (name = "tipoatividade")
	private String tipoAtividade;

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

	



	


	public Embarcacao(OrgMilitar orgmilitar, Empresa empresa, Cliente cliente, long iD, int qtdMotores,
			float arqueacaoLiquida, float bocaMoldada, String areaNavegacao, float compPerpendicular, String numCasco,
			Date dtConstrucao, float capArmazenamento, String matCasco, int qtdTripulantes, float contorno,
			float compTotal, int lotacao, String tipoPropulsao, String matSuperestrutura, float pontalMoldado,
			String construtor, float arqueacaoBruta, String tipoEmbarcacao, String nomeEmbarcacao,
			String corPredominante, String porteBruto, Date dtInscricao, float potenciaMotor, String calado,
			String numInscricao, String tipoAtividade, String logradouro, String bairro, String numero,
			String complemento, String uF, String cidade, String cEP) {
		super();
		this.orgmilitar = orgmilitar;
		this.empresa = empresa;
		this.cliente = cliente;
		id = iD;
		this.qtdMotores = qtdMotores;
		this.arqueacaoLiquida = arqueacaoLiquida;
		this.bocaMoldada = bocaMoldada;
		this.areaNavegacao = areaNavegacao;
		this.compPerpendicular = compPerpendicular;
		this.numCasco = numCasco;
		this.dtConstrucao = dtConstrucao;
		this.capArmazenamento = capArmazenamento;
		this.matCasco = matCasco;
		this.qtdTripulantes = qtdTripulantes;
		this.contorno = contorno;
		this.compTotal = compTotal;
		this.lotacao = lotacao;
		this.tipoPropulsao = tipoPropulsao;
		this.matSuperestrutura = matSuperestrutura;
		this.pontalMoldado = pontalMoldado;
		this.construtor = construtor;
		this.arqueacaoBruta = arqueacaoBruta;
		this.tipoEmbarcacao = tipoEmbarcacao;
		this.nomeEmbarcacao = nomeEmbarcacao;
		this.corPredominante = corPredominante;
		this.porteBruto = porteBruto;
		this.dtInscricao = dtInscricao;
		this.potenciaMotor = potenciaMotor;
		this.calado = calado;
		this.numInscricao = numInscricao;
		this.tipoAtividade = tipoAtividade;
		this.logradouro = logradouro;
		this.bairro = bairro;
		this.numero = numero;
		this.complemento = complemento;
		UF = uF;
		this.cidade = cidade;
		CEP = cEP;
	}



	public Embarcacao() {
		super();
		// TODO Auto-generated constructor stub
	}



	public long getID() {
		return id;
	}

	public void setID(long iD) {
		id = iD;
	}

	public int getQtdMotores() {
		return qtdMotores;
	}

	public void setQtdMotores(int qtdMotores) {
		this.qtdMotores = qtdMotores;
	}

	public float getArqueacaoLiquida() {
		return arqueacaoLiquida;
	}

	public void setArqueacaoLiquida(float arqueacaoLiquida) {
		this.arqueacaoLiquida = arqueacaoLiquida;
	}

	public float getBocaMoldada() {
		return bocaMoldada;
	}

	public void setBocaMoldada(float bocaMoldada) {
		this.bocaMoldada = bocaMoldada;
	}

	public String getAreaNavegacao() {
		return areaNavegacao;
	}

	public void setAreaNavegacao(String areaNavegacao) {
		this.areaNavegacao = areaNavegacao;
	}

	public float getCompPerpendicular() {
		return compPerpendicular;
	}

	public void setCompPerpendicular(float compPerpendicular) {
		this.compPerpendicular = compPerpendicular;
	}

	public String getNumCasco() {
		return numCasco;
	}

	public void setNumCasco(String numCasco) {
		this.numCasco = numCasco;
	}

	public Date getDtConstrucao() {
		return dtConstrucao;
	}

	public void setDtConstrucao(Date dtConstrucao) {
		this.dtConstrucao = dtConstrucao;
	}

	public float getCapArmazenamento() {
		return capArmazenamento;
	}

	public void setCapArmazenamento(float capArmazenamento) {
		this.capArmazenamento = capArmazenamento;
	}

	public String getMatCasco() {
		return matCasco;
	}

	public void setMatCasco(String matCasco) {
		this.matCasco = matCasco;
	}

	public int getQtdTripulantes() {
		return qtdTripulantes;
	}

	public void setQtdTripulantes(int qtdTripulantes) {
		this.qtdTripulantes = qtdTripulantes;
	}

	public float getContorno() {
		return contorno;
	}

	public void setContorno(float contorno) {
		this.contorno = contorno;
	}

	public float getCompTotal() {
		return compTotal;
	}

	public void setCompTotal(float compTotal) {
		this.compTotal = compTotal;
	}

	public int getLotacao() {
		return lotacao;
	}

	public void setLotacao(int lotacao) {
		this.lotacao = lotacao;
	}

	public String getTipoPropulsao() {
		return tipoPropulsao;
	}

	public void setTipoPropulsao(String tipoPropulsao) {
		this.tipoPropulsao = tipoPropulsao;
	}

	public String getMatSuperestrutura() {
		return matSuperestrutura;
	}

	public void setMatSuperestrutura(String matSuperestrutura) {
		this.matSuperestrutura = matSuperestrutura;
	}

	public float getPontalMoldado() {
		return pontalMoldado;
	}

	public void setPontalMoldado(float pontalMoldado) {
		this.pontalMoldado = pontalMoldado;
	}

	public String getConstrutor() {
		return construtor;
	}

	public void setConstrutor(String construtor) {
		this.construtor = construtor;
	}

	public float getArqueacaoBruta() {
		return arqueacaoBruta;
	}

	public void setArqueacaoBruta(float arqueacaoBruta) {
		this.arqueacaoBruta = arqueacaoBruta;
	}

	public String getTipoEmbarcacao() {
		return tipoEmbarcacao;
	}

	public void setTipoEmbarcacao(String tipoEmbarcacao) {
		this.tipoEmbarcacao = tipoEmbarcacao;
	}

	public String getNomeEmbarcacao() {
		return nomeEmbarcacao;
	}

	public void setNomeEmbarcacao(String nomeEmbarcacao) {
		this.nomeEmbarcacao = nomeEmbarcacao;
	}

	public String getCorPredominante() {
		return corPredominante;
	}

	public void setCorPredominante(String corPredominante) {
		this.corPredominante = corPredominante;
	}

	public String getPorteBruto() {
		return porteBruto;
	}

	public void setPorteBruto(String porteBruto) {
		this.porteBruto = porteBruto;
	}

	public Date getDtInscricao() {
		return dtInscricao;
	}

	public void setDtInscricao(Date dtInscricao) {
		this.dtInscricao = dtInscricao;
	}

	public float getPotenciaMotor() {
		return potenciaMotor;
	}

	public void setPotenciaMotor(float potenciaMotor) {
		this.potenciaMotor = potenciaMotor;
	}

	public String getCalado() {
		return calado;
	}

	public void setCalado(String calado) {
		this.calado = calado;
	}

	public String getNumInscricao() {
		return numInscricao;
	}

	public void setNumInscricao(String numInscricao) {
		this.numInscricao = numInscricao;
	}

	public String getTipoAtividade() {
		return tipoAtividade;
	}

	public void setTipoAtividade(String tipoAtividade) {
		this.tipoAtividade = tipoAtividade;
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



	public OrgMilitar getOrgmilitar() {
		return orgmilitar;
	}



	public void setOrgmilitar(OrgMilitar orgmilitar) {
		this.orgmilitar = orgmilitar;
	}



	public Empresa getEmpresa() {
		return empresa;
	}



	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}



	public Cliente getCliente() {
		return cliente;
	}



	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	
	
	
	


}
