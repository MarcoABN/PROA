package com.proa.controller;



import com.proa.model.Procuracao;
import com.proa.repository.ProcuracaoRepository;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@CrossOrigin (origins = "http://localhost:4200")
@RestController
@RequestMapping("/cprocuracao")
public class ProcuracaoController {
	


    @Autowired
    private ProcuracaoRepository procuracaoRepository;

    // Método para listar todas as procurações
    @GetMapping
    public List<Procuracao> listarTodas() {
        return procuracaoRepository.findAll();
    }

    // Método para consultar uma procuração por ID
    @GetMapping("/{id}")
    public ResponseEntity<Procuracao> consultarPorId(@PathVariable Long id) {
        Optional<Procuracao> procuracao = procuracaoRepository.findById(id);
        if (procuracao.isPresent()) {
            return ResponseEntity.ok(procuracao.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Método para inserir uma nova procuração
    @PostMapping
    public ResponseEntity<String> inserir(@RequestBody Procuracao procuracao) {
        // Verificar se já existe uma procuração com o mesmo modelo
        Optional<Procuracao> existente = procuracaoRepository.findByModeloProcuracao(procuracao.getModeloProcuracao());
        if (existente.isPresent()) {
            return ResponseEntity.badRequest().body("Modelo de procuração já existe.");
        }

        Procuracao novaProcuracao = procuracaoRepository.save(procuracao);
        return ResponseEntity.ok("Procuração criada com sucesso. ID: " + novaProcuracao.getId());
    }

    // Método para excluir uma procuração por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (procuracaoRepository.existsById(id)) {
            procuracaoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/modelo/{modelo}")
    public ResponseEntity<Procuracao> consultarPorModelo(@PathVariable String modelo) {
        Optional<Procuracao> procuracao = procuracaoRepository.findByModeloProcuracao(modelo);
        return procuracao.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
 // Método para atualizar um modelo de procuração existente
    @PutMapping("/{id}")
    public ResponseEntity<String> atualizarProcuracao(@PathVariable Long id, @RequestBody Procuracao procuracaoAtualizada) {
        Optional<Procuracao> procuracaoExistente = procuracaoRepository.findById(id);

        if (procuracaoExistente.isPresent()) {
            Procuracao procuracao = procuracaoExistente.get();

            // Verificar se o novo modelo é único (exceto para o próprio registro sendo atualizado)
            Optional<Procuracao> modeloExistente = procuracaoRepository.findByModeloProcuracao(procuracaoAtualizada.getModeloProcuracao());
            if (modeloExistente.isPresent() && !modeloExistente.get().getId().equals(procuracao.getId())) {
                return ResponseEntity.badRequest().body("Outro modelo de procuração com o mesmo nome já existe.");
            }

            // Atualizar os valores da procuração existente
            procuracao.setModeloProcuracao(procuracaoAtualizada.getModeloProcuracao());
            procuracao.setTextoProcuracao(procuracaoAtualizada.getTextoProcuracao());
            procuracaoRepository.save(procuracao);

            return ResponseEntity.ok("Procuração atualizada com sucesso.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
