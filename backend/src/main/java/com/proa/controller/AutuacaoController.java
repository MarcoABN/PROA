package com.proa.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.proa.model.Autuacao;
import com.proa.repository.AutuacaoRepository;

@CrossOrigin (origins = "http://localhost:4200")
@RequestMapping ("/cautuacao/")
@RestController
public class AutuacaoController {

	
	@Autowired
	private AutuacaoRepository autRep;

	//Metodo para listar Autuacao
	@GetMapping("/autuacao")
	public List<Autuacao> listar(){

		return this.autRep.findAll();

	}

	//Metodo para consultar Autuacao
	@GetMapping("/autuacao/{idAutuacao}")
	public ResponseEntity<Autuacao> consultar (@PathVariable Long idAutuacao) {

		Autuacao aut = this.autRep.findById(idAutuacao).orElseThrow(()->
		new ResourceNotFoundException("Autuacao não encontrada: " + idAutuacao));

		return ResponseEntity.ok(aut);
	} 

	//Metodo para inserir
	@PostMapping("/autuacao")
	public Autuacao inserir (@RequestBody Autuacao aut) {
		return this.autRep.save(aut);
	}

	//Metodo para Alterar
	@PutMapping ("/autuacao/{idAutuacao}")
	public ResponseEntity<Autuacao> alterar (@PathVariable Long idAutuacao, @RequestBody Autuacao aut){

		Autuacao autLocalizado = this.autRep.findById(idAutuacao).orElseThrow(()->
		new ResourceNotFoundException("Autuacao não encontrada: " + idAutuacao));
		
		

		autLocalizado.setID(aut.getID());
		autLocalizado.setDescricao(aut.getDescricao());
		autLocalizado.setDefesa(aut.getDefesa());
		autLocalizado.setEmpresa(aut.getEmpresa());
		autLocalizado.setEmbarcacao(aut.getEmbarcacao());
		autLocalizado.setOrgmilitar(aut.getOrgmilitar());
		autLocalizado.setCliente(aut.getCliente());
		
		
		Autuacao atualizado = this.autRep.save(autLocalizado);

		return ResponseEntity.ok(atualizado);

	}

	//Metodo para Deletar
	@DeleteMapping ("/autuacao/{idAutuacao}")
	public ResponseEntity<Map<String, Boolean>> excluir (@PathVariable Long idAutuacao){

		Autuacao autLocalizado = this.autRep.findById(idAutuacao).orElseThrow(()->
		new ResourceNotFoundException("Autuacao não encontrada: " + idAutuacao));


		this.autRep.delete(autLocalizado);

		Map<String, Boolean> resposta = new HashMap<>();
		resposta.put("Autuacao Excluida!", Boolean.TRUE);

		return ResponseEntity.ok(resposta);

	}
}
