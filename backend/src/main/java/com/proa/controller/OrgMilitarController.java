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
import com.proa.model.OrgMilitar;
import com.proa.repository.OrgMilitarRepository;


@CrossOrigin (origins = "*")
@RequestMapping ("/corgmilitar/")
@RestController
public class OrgMilitarController {

	
	@Autowired
	private OrgMilitarRepository omRep;

	//Metodo para listar Org. Militar
	@GetMapping("/orgmilitar")
	public List<OrgMilitar> listar(){

		return this.omRep.findAll();

	}

	//Metodo para consultar Org. Militar
	@GetMapping("/orgmilitar/{idOrgMilitar}")
	public ResponseEntity<OrgMilitar> consultar (@PathVariable Long idOrgMilitar) {

		OrgMilitar aut = this.omRep.findById(idOrgMilitar).orElseThrow(()->
		new ResourceNotFoundException("OrgMilitar não encontrada: " + idOrgMilitar));

		return ResponseEntity.ok(aut);
	} 

	//Metodo para inserir Org. Militar
	@PostMapping("/orgmilitar")
	public OrgMilitar inserir (@RequestBody OrgMilitar om) {
		return this.omRep.save(om);
	}

	//Metodo para Alterar Org. Militar
	@PutMapping ("/orgmilitar/{idOrgMilitar}")
	public ResponseEntity<OrgMilitar> alterar (@PathVariable Long idOrgMilitar, @RequestBody OrgMilitar om){

		OrgMilitar omLocalizado = this.omRep.findById(idOrgMilitar).orElseThrow(()->
		new ResourceNotFoundException("OrgMilitar não encontrada: " + idOrgMilitar));

		omLocalizado.setID(om.getID());
		omLocalizado.setNome(om.getNome());
		omLocalizado.setAbreviatura(om.getAbreviatura());
		omLocalizado.setTelefone(om.getTelefone());
		omLocalizado.setLogradouro(om.getLogradouro());
		omLocalizado.setBairro(om.getBairro());
		omLocalizado.setNumero(om.getNumero());
		omLocalizado.setComplemento(om.getComplemento());
		omLocalizado.setUF(om.getUF());
		omLocalizado.setCidade(om.getCidade());
		omLocalizado.setCEP(om.getCEP());
		

		
		
		OrgMilitar atualizado = this.omRep.save(omLocalizado);

		return ResponseEntity.ok(atualizado);

	}

	//Metodo para Deletar Org. Militar
	@DeleteMapping ("/orgmilitar/{idOrgMilitar}")
	public ResponseEntity<Map<String, Boolean>> excluir (@PathVariable Long idOrgMilitar){

		OrgMilitar omLocalizado = this.omRep.findById(idOrgMilitar).orElseThrow(()->
		new ResourceNotFoundException("OrgMilitar não encontrada: " + idOrgMilitar));


		this.omRep.delete(omLocalizado);

		Map<String, Boolean> resposta = new HashMap<>();
		resposta.put("OrgMilitar Excluida!", Boolean.TRUE);

		return ResponseEntity.ok(resposta);

	}
}