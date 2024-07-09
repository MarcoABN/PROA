//CRUD inicial validado

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
import com.proa.model.Motor;
import com.proa.repository.MotorRepository;

@CrossOrigin (origins = "http://localhost:4200")
@RequestMapping ("/cmotor/")
@RestController
public class MotorController {

	@Autowired
	private MotorRepository motorRep;

	//Metodo para listar motores
	@GetMapping("/motor")
	public List<Motor> listar(){

		return this.motorRep.findAll();

	}

	//Metodo para consultar Motor
	@GetMapping("/motor/{idMotor}")
	public ResponseEntity<Motor> consultar (@PathVariable Long idMotor) {

		Motor prest = this.motorRep.findById(idMotor).orElseThrow(()->
		new ResourceNotFoundException("Motor não encontrado: " + idMotor));

		return ResponseEntity.ok(prest);
	} 

	//Metodo para inserir
	@PostMapping("/motor")
	public Motor inserir (@RequestBody Motor prest) {
		return this.motorRep.save(prest);
	}

	//Metodo para Alterar
	@PutMapping ("/motor/{idMotor}")
	public ResponseEntity<Motor> alterar (@PathVariable Long idMotor, @RequestBody Motor mot){

		Motor motLocalizado = this.motorRep.findById(idMotor).orElseThrow(()->
		new ResourceNotFoundException("Motor não encontrada: " + idMotor));

		motLocalizado.setID(mot.getID());
		motLocalizado.setPotencia(mot.getPotencia());
		motLocalizado.setMarca(mot.getMarca());
		motLocalizado.setNumSerie(mot.getNumSerie());
		
		
		//Relacionamento
		motLocalizado.setNotaFiscal(mot.getNotaFiscal());
		motLocalizado.setEmbarcacao(mot.getEmbarcacao());
		/*AVALIAR COMO DEVE SER TRATADO A QUESTÃO DO RELACIONAMENTO:
		 * AO CRIAR GET/POST PARA OS RELACIONAMENTOS, TEMOS LOOP NAS VALIDAÇÕES
		 * LOGO, DEVE-SE:
		 * 1- CRIAR UMA NOVA INSTÂNCIA MANTENDO OS DADOS E SINALIZANDO A NOVA "TITUALIDADE"
		 * 2- CRIAR UMA NOVA INSTÂNCIA EXCLUINDO OS DADOS E SINALIZANDO A NOVA "TITUALIDADE"
		 * 3- AVALIAR FORMAS DE ALTERAÇÃO DO PRÓPRIO DADO CADASTRADO (CHAVE EXTRANGEIRA)
		 * 
		 * 
		 * */
		

		Motor atualizado = this.motorRep.save(motLocalizado);

		return ResponseEntity.ok(atualizado);

	}

	//Metodo para Deletar
	@DeleteMapping ("/motor/{idMotor}")
	public ResponseEntity<Map<String, Boolean>> excluir (@PathVariable Long idMotor){

		Motor motLocalizado = this.motorRep.findById(idMotor).orElseThrow(()->
		new ResourceNotFoundException("Motor não encontrado: " + idMotor));


		this.motorRep.delete(motLocalizado);

		Map<String, Boolean> resposta = new HashMap<>();
		resposta.put("Motor Excluida!", Boolean.TRUE);

		return ResponseEntity.ok(resposta);

	}
}
