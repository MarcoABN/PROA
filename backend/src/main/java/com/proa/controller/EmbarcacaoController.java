package com.proa.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proa.exception.ResourceNotFoundException;
import com.proa.model.Embarcacao;
import com.proa.repository.EmbarcacaoRepository;
 

@CrossOrigin (origins = "*")
@RequestMapping ("/cembarcacao/")
@RestController
public class EmbarcacaoController {

	@Autowired
	private EmbarcacaoRepository embRep;

	//Metodo para listar embarcacoes
	@GetMapping("/embarcacao")
	public List<Embarcacao> listar(){

		return this.embRep.findAll();

	}
	
	@GetMapping("/cliente/{idCliente}")
    public ResponseEntity<List<Embarcacao>> listarPorCliente(@PathVariable Long idCliente) {
		List<Embarcacao> embarcacoes = this.embRep.findByClienteId(idCliente);
        if (embarcacoes.isEmpty()) {
            throw new ResourceNotFoundException("Nenhuma embarcação encontrada para o cliente: " + idCliente);
        }
        return ResponseEntity.ok(embarcacoes);
    }
	

	//Metodo para consultar embarcacao
	@GetMapping("/embarcacao/{idEmbarcacao}")
	public ResponseEntity<Embarcacao> consultar (@PathVariable Long idEmbarcacao) {

		Embarcacao emb = this.embRep.findById(idEmbarcacao).orElseThrow(()->
		new ResourceNotFoundException("Embarcação não encontrada: " + idEmbarcacao));

		return ResponseEntity.ok(emb);
	}
	
	//Metodo para inserir
	@PostMapping("/embarcacao")
	public Embarcacao inserir (@RequestBody Embarcacao emb) {
		return this.embRep.save(emb);
	}

	//Metodo para Alterar
	@PutMapping ("/embarcacao/{idEmbarcacao}")
	public ResponseEntity<Embarcacao> alterar (@PathVariable Long idEmbarcacao, @RequestBody Embarcacao emb){

		Embarcacao embLocalizado = this.embRep.findById(idEmbarcacao).orElseThrow(()->
		new ResourceNotFoundException("Embarcação não encontrada: " + idEmbarcacao));

		embLocalizado.setID(emb.getID());
		embLocalizado.setQtdMotores(emb.getQtdMotores());
		embLocalizado.setArqueacaoLiquida(emb.getArqueacaoLiquida());
		embLocalizado.setBocaMoldada(emb.getBocaMoldada());
		embLocalizado.setAreaNavegacao(emb.getAreaNavegacao());
		embLocalizado.setCompPerpendicular(emb.getCompPerpendicular());
		embLocalizado.setNumCasco(emb.getNumCasco());
		embLocalizado.setDtConstrucao(emb.getDtConstrucao());
		embLocalizado.setCapArmazenamento(emb.getCapArmazenamento());
		embLocalizado.setMatCasco(emb.getMatCasco());
		embLocalizado.setQtdTripulantes(emb.getQtdTripulantes());
		embLocalizado.setContorno(emb.getContorno());
		embLocalizado.setCompTotal(emb.getCompTotal());
		embLocalizado.setLotacao(emb.getLotacao());
		embLocalizado.setTipoPropulsao(emb.getTipoPropulsao());
		embLocalizado.setMatSuperestrutura(emb.getMatSuperestrutura());
		embLocalizado.setPontalMoldado(emb.getPontalMoldado());
		embLocalizado.setConstrutor(emb.getConstrutor());
		embLocalizado.setArqueacaoBruta(emb.getArqueacaoBruta());
		embLocalizado.setTipoEmbarcacao(emb.getTipoEmbarcacao());
		embLocalizado.setNomeEmbarcacao(emb.getNomeEmbarcacao());
		embLocalizado.setCorPredominante(emb.getCorPredominante());
		embLocalizado.setPorteBruto(emb.getPorteBruto());
		embLocalizado.setDtInscricao(emb.getDtInscricao());
		embLocalizado.setPotenciaMotor(emb.getPotenciaMotor());
		embLocalizado.setCalado(emb.getCalado());
		embLocalizado.setNumInscricao(emb.getNumInscricao());
		embLocalizado.setTipoAtividade(emb.getTipoAtividade());
		embLocalizado.setLogradouro(emb.getLogradouro());
		embLocalizado.setBairro(emb.getBairro());
		embLocalizado.setNumero(emb.getNumero());
		embLocalizado.setComplemento(emb.getComplemento());
		embLocalizado.setUF(emb.getUF());
		embLocalizado.setCidade(emb.getCidade());
		embLocalizado.setCEP(emb.getCEP());
		embLocalizado.setBordaLivre(emb.getBordaLivre());
		embLocalizado.setValor(emb.getValor());
		embLocalizado.setDtSeguro(emb.getDtSeguro());



		//embLocalizado.set(emb.get());
		Embarcacao atualizado = this.embRep.save(embLocalizado);

		return ResponseEntity.ok(atualizado);

	}

	//Metodo para Deletar
	@DeleteMapping ("/embarcacao/{idEmbarcacao}")
	public ResponseEntity<Map<String, Boolean>> excluir (@PathVariable Long idEmbarcacao){

		Embarcacao embLocalizado = this.embRep.findById(idEmbarcacao).orElseThrow(()->
		new ResourceNotFoundException("Embarcação não encontrada: " + idEmbarcacao));


		this.embRep.delete(embLocalizado);

		Map<String, Boolean> resposta = new HashMap<>();
		resposta.put("Marca Excluida!", Boolean.TRUE);

		return ResponseEntity.ok(resposta);

	}
}
