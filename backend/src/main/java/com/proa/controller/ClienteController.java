//CRUD inicial Validado

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proa.exception.ResourceNotFoundException;
import com.proa.model.Cliente;
import com.proa.repository.ClienteRepository;
import com.proa.service.EmailService;

@CrossOrigin (origins = "*")
@RequestMapping ("/ccliente/")
@RestController
public class ClienteController {

	@Autowired
	private ClienteRepository clientRep;
	
	//Opção para envio de email
	@Autowired
	private EmailService emailService;

	//Metodo para listar Cliente
	@GetMapping("/cliente")
	public List<Cliente> listar(){	
		
		return this.clientRep.findAll();

	}

	//Metodo para consultar Cliente
	@GetMapping("/cliente/{idCliente}")
	public ResponseEntity<Cliente> consultar (@PathVariable Long idCliente) {

		Cliente cliente = this.clientRep.findById(idCliente).orElseThrow(()->
		new ResourceNotFoundException("Cliente não encontrado: " + idCliente));

		return ResponseEntity.ok(cliente);
	} 
	
	//Metodo para consultar Cliente por CPF
	@GetMapping("/cpfcnpj/{cpfcnpj}")
    public ResponseEntity<Cliente> consultarPorCpfcnpj(@PathVariable String cpfcnpj) {
        Cliente cliente = this.clientRep.findByCPFCNPJ(cpfcnpj).orElseThrow(() ->
            new ResourceNotFoundException("Cliente não encontrado com CPF/CNPJ: " + cpfcnpj));

        return ResponseEntity.ok(cliente);
    }

	
	public Cliente findByEmail(String email) {
        return this.clientRep.findByEmail(email);
    }
	

	//Metodo para inserir
	@PostMapping("/cliente")
	public Cliente inserir (@RequestBody Cliente cliente) {
		return this.clientRep.save(cliente);
	}

	//Metodo para Alterar
	@PutMapping ("/cliente/{idCliente}")
	public ResponseEntity<Cliente> alterar (@PathVariable Long idCliente, @RequestBody Cliente cliente){

		Cliente clientetLocalizado = this.clientRep.findById(idCliente).orElseThrow(()->
		new ResourceNotFoundException("Cliente não encontrado: " + idCliente));

		//clientetLocalizado.setID(cliente.getID());
		clientetLocalizado.setNome(cliente.getNome());
		clientetLocalizado.setRG(cliente.getRG());
		clientetLocalizado.setOrgEmissor(cliente.getOrgEmissor());
		clientetLocalizado.setDtEmissao(cliente.getDtEmissao());
		clientetLocalizado.setDataNasc(cliente.getDataNasc());
		clientetLocalizado.setCPFCNPJ(cliente.getCPFCNPJ());
		clientetLocalizado.setNacionalidade(cliente.getNacionalidade());
		clientetLocalizado.setNaturalidade(cliente.getNaturalidade());
		clientetLocalizado.setTelefone(cliente.getTelefone());
		clientetLocalizado.setCelular(cliente.getCelular());
		clientetLocalizado.setEmail(cliente.getEmail());
		clientetLocalizado.setSenha(cliente.getSenha());
		clientetLocalizado.setLogradouro(cliente.getLogradouro());
		clientetLocalizado.setBairro(cliente.getBairro());
		clientetLocalizado.setNumero(cliente.getNumero());
		clientetLocalizado.setComplemento(cliente.getComplemento());
		clientetLocalizado.setUF(cliente.getUF());
		clientetLocalizado.setCidade(cliente.getCidade());
		clientetLocalizado.setCep(cliente.getCep());
		clientetLocalizado.setCha_categoria(cliente.getCha_categoria());
		clientetLocalizado.setCha_numero(cliente.getCha_numero());
		clientetLocalizado.setCha_dtemissao(cliente.getCha_dtemissao());
		
		//Relacionamento
		clientetLocalizado.setOrgmilitar(cliente.getOrgmilitar());

		Cliente atualizado = this.clientRep.save(clientetLocalizado);

		return ResponseEntity.ok(atualizado);

	}

	//Metodo para Deletar
	@DeleteMapping ("/cliente/{idCliente}")
	public ResponseEntity<Map<String, Boolean>> excluir (@PathVariable Long idCliente){

		Cliente ClienteLocalizado = this.clientRep.findById(idCliente).orElseThrow(()->
		new ResourceNotFoundException("Cliente não encontrado: " + idCliente));


		this.clientRep.delete(ClienteLocalizado);

		Map<String, Boolean> resposta = new HashMap<>();
		resposta.put("Cliente Excluida!", Boolean.TRUE);

		return ResponseEntity.ok(resposta);

	}
	
	//Novo método para consultar Cliente por nome (busca parcial)
    @GetMapping("/cliente/buscar-por-nome")
    public ResponseEntity<List<Cliente>> consultarPorNome(@RequestParam String nome) {
        if (nome == null || nome.trim().isEmpty()) {
            throw new ResourceNotFoundException("Nome não pode ser vazio");
        }
        
        List<Cliente> clientes = this.clientRep.findByNomeContainingIgnoreCase(nome.trim());
        
        if (clientes.isEmpty()) {
            throw new ResourceNotFoundException("Nenhum cliente encontrado com o nome: " + nome);
        }
        
        return ResponseEntity.ok(clientes);
    }
	
	//
}
