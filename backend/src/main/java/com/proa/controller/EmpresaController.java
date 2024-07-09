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
import com.proa.model.Empresa;
import com.proa.repository.EmpresaRepository;


@CrossOrigin (origins = "http://localhost:4200")
@RequestMapping ("/cempresa/")
@RestController
public class EmpresaController {

	
	@Autowired
	private EmpresaRepository empRep;

	//Metodo para listar empresas
	@GetMapping("/empresa")
	public List<Empresa> listar(){

		return this.empRep.findAll();

	}

	//Metodo para consultar empresa
	@GetMapping("/empresa/{idEmpresa}")
	public ResponseEntity<Empresa> consultar (@PathVariable Long idEmpresa) {

		Empresa emp = this.empRep.findById(idEmpresa).orElseThrow(()->
		new ResourceNotFoundException("Empresa não encontrada: " + idEmpresa));

		return ResponseEntity.ok(emp);
	} 

	//Metodo para inserir
	@PostMapping("/empresa")
	public Empresa inserir (@RequestBody Empresa emp) {
		return this.empRep.save(emp);
	}

	//Metodo para Alterar
	@PutMapping ("/empresa/{idEmpresa}")
	public ResponseEntity<Empresa> alterar (@PathVariable Long idEmpresa, @RequestBody Empresa emp){

		Empresa empLocalizado = this.empRep.findById(idEmpresa).orElseThrow(()->
		new ResourceNotFoundException("Empresa não encontrada: " + idEmpresa));

		empLocalizado.setID(emp.getID());
		empLocalizado.setRazaoSocial(emp.getRazaoSocial());
		empLocalizado.setCNPJ(emp.getCNPJ());
		empLocalizado.setEmail(emp.getEmail());
		empLocalizado.setTelefone(emp.getTelefone());
		empLocalizado.setLogradouro(emp.getLogradouro());
		empLocalizado.setBairro(emp.getBairro());
		empLocalizado.setNumero(emp.getNumero());
		empLocalizado.setComplemento(emp.getComplemento());
		empLocalizado.setUF(emp.getUF());
		empLocalizado.setCidade(emp.getCidade());
		empLocalizado.setCEP(emp.getCEP());
		
		Empresa atualizado = this.empRep.save(empLocalizado);

		return ResponseEntity.ok(atualizado);

	}

	//Metodo para Deletar
	@DeleteMapping ("/empresa/{idEmpresa}")
	public ResponseEntity<Map<String, Boolean>> excluir (@PathVariable Long idEmpresa){

		Empresa empLocalizado = this.empRep.findById(idEmpresa).orElseThrow(()->
		new ResourceNotFoundException("Empresa não encontrada: " + idEmpresa));


		this.empRep.delete(empLocalizado);

		Map<String, Boolean> resposta = new HashMap<>();
		resposta.put("Empresa Excluida!", Boolean.TRUE);

		return ResponseEntity.ok(resposta);

	}
}
