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
import com.proa.model.Prestador;
import com.proa.repository.PrestadorRepository;

@CrossOrigin (origins = "*")
@RequestMapping ("/cprestador/")
@RestController
public class PrestadorController {

	@Autowired
	private PrestadorRepository prestRep;

	//Metodo para listar prestadores
	@GetMapping("/prestador")
	public List<Prestador> listar(){

		return this.prestRep.findAll();

	}
	

    //Buscar só instrutores
    @GetMapping("/instrutores")
    public List<Prestador> listarInstrutores() {
        return prestRep.findByInstrutorTrue();
    }

    //Buscar só procuradores
    @GetMapping("/procuradores")
    public List<Prestador> listarProcuradores() {
        return prestRep.findByProcuradorTrue();
    }

	//Metodo para consultar Prestador
	@GetMapping("/prestador/{idPrestador}")
	public ResponseEntity<Prestador> consultar (@PathVariable Long idPrestador) {

		Prestador prest = this.prestRep.findById(idPrestador).orElseThrow(()->
		new ResourceNotFoundException("Prestador não encontrado: " + idPrestador));

		return ResponseEntity.ok(prest);
	} 

	//Metodo para inserir
	@PostMapping("/prestador")
	public Prestador inserir (@RequestBody Prestador prest) {
		return this.prestRep.save(prest);
	}

	//Metodo para Alterar
	@PutMapping ("/prestador/{idPrestador}")
	public ResponseEntity<Prestador> alterar (@PathVariable Long idPrestador, @RequestBody Prestador prest){

		Prestador prestLocalizado = this.prestRep.findById(idPrestador).orElseThrow(()->
		new ResourceNotFoundException("Prestador não encontrada: " + idPrestador));

		prestLocalizado.setID(prest.getID());
		prestLocalizado.setNome(prest.getNome());
		prestLocalizado.setRG(prest.getRG());
		prestLocalizado.setOrgEmissor(prest.getOrgEmissor());
		prestLocalizado.setDtEmissao(prest.getDtEmissao());
		prestLocalizado.setCPFCNPJ(prest.getCPFCNPJ());
		prestLocalizado.setTelefone(prest.getTelefone());
		prestLocalizado.setCelular(prest.getCelular());
		prestLocalizado.setEmail(prest.getEmail());
		prestLocalizado.setSenha(prest.getSenha());
		prestLocalizado.setLogradouro(prest.getLogradouro());
		prestLocalizado.setBairro(prest.getBairro());
		prestLocalizado.setNumero(prest.getNumero());
		prestLocalizado.setComplemento(prest.getComplemento());
		prestLocalizado.setUF(prest.getUF());
		prestLocalizado.setCidade(prest.getCidade());
		prestLocalizado.setCEP(prest.getCEP());
		prestLocalizado.setEstadoCivil(prest.getEstadoCivil());
		prestLocalizado.setProfissao(prest.getProfissao());
		prestLocalizado.setNacionalidade(prest.getNacionalidade());
		
		prestLocalizado.setCha_dtemissao(prest.getCha_dtemissao());
		prestLocalizado.setCha_categoria(prest.getCha_categoria());
		prestLocalizado.setCha_numero(prest.getCha_numero());
		
		prestLocalizado.setProcurador(prest.getProcurador());
		prestLocalizado.setInstrutor(prest.getInstrutor());
		prestLocalizado.setTipoProcuracao(prest.getTipoProcuracao());
		prestLocalizado.setEstabelecimento(prest.getEstabelecimento());
		
		
		
		/*AVALIAR COMO DEVE SER TRATADO A QUESTÃO DO RELACIONAMENTO:
		 * AO CRIAR GET/POST PARA OS RELACIONAMENTOS, TEMOS LOOP NAS VALIDAÇÕES
		 * LOGO, DEVE-SE:
		 * 1- CRIAR UMA NOVA INSTÂNCIA MANTENDO OS DADOS E SINALIZANDO A NOVA "TITUALIDADE"
		 * 2- CRIAR UMA NOVA INSTÂNCIA EXCLUINDO OS DADOS E SINALIZANDO A NOVA "TITUALIDADE"
		 * 3- AVALIAR FORMAS DE ALTERAÇÃO DO PRÓPRIO DADO CADASTRADO (CHAVE EXTRANGEIRA)
		 * 
		 * 
		 * */
		

		Prestador atualizado = this.prestRep.save(prestLocalizado);

		return ResponseEntity.ok(atualizado);

	}

	//Metodo para Deletar
	@DeleteMapping ("/prestador/{idPrestador}")
	public ResponseEntity<Map<String, Boolean>> excluir (@PathVariable Long idPrestador){

		Prestador prestLocalizado = this.prestRep.findById(idPrestador).orElseThrow(()->
		new ResourceNotFoundException("Prestador não encontrado: " + idPrestador));


		this.prestRep.delete(prestLocalizado);

		Map<String, Boolean> resposta = new HashMap<>();
		resposta.put("Prestador Excluida!", Boolean.TRUE);

		return ResponseEntity.ok(resposta);

	}
	
	
}
