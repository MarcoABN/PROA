package com.proa.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.proa.model.EscolaNautica;
import com.proa.model.Prestador;
import com.proa.repository.EscolaNauticaRepository;
import com.proa.repository.PrestadorRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cescolanautica")
@CrossOrigin(origins = "*")
public class EscolaNauticaController {

    @Autowired
    private EscolaNauticaRepository escolaNauticaRepository;

    @Autowired
    private PrestadorRepository prestadorRepository;

    // Listar todas as escolas náuticas
    @GetMapping
    public List<EscolaNautica> listarTodos() {
        return escolaNauticaRepository.findAll();
    }

    // Buscar escola náutica por ID
    @GetMapping("/{id}")
    public ResponseEntity<EscolaNautica> buscarPorId(@PathVariable Long id) {
        Optional<EscolaNautica> escola = escolaNauticaRepository.findById(id);
        return escola.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    // Cadastrar nova escola náutica
    @PostMapping
    public ResponseEntity<EscolaNautica> salvar(@RequestBody EscolaNautica escolaNautica) {
        // Valida e carrega instrutor e responsável (se IDs existirem)
        if (escolaNautica.getInstrutor() != null && escolaNautica.getInstrutor().getID() != null) {
            Optional<Prestador> instrutor = prestadorRepository.findById(escolaNautica.getInstrutor().getID());
            instrutor.ifPresent(escolaNautica::setInstrutor);
        } else {
            escolaNautica.setInstrutor(null);
        }

        if (escolaNautica.getResponsavel() != null && escolaNautica.getResponsavel().getID() != null) {
            Optional<Prestador> responsavel = prestadorRepository.findById(escolaNautica.getResponsavel().getID());
            responsavel.ifPresent(escolaNautica::setResponsavel);
        } else {
            escolaNautica.setResponsavel(null);
        }

        EscolaNautica novaEscola = escolaNauticaRepository.save(escolaNautica);
        return ResponseEntity.ok(novaEscola);
    }

    // Atualizar escola náutica
    @PutMapping("/{id}")
    public ResponseEntity<EscolaNautica> atualizar(@PathVariable Long id, @RequestBody EscolaNautica escolaNautica) {
        Optional<EscolaNautica> escolaExistente = escolaNauticaRepository.findById(id);
        if (!escolaExistente.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        EscolaNautica escola = escolaExistente.get();
        escola.setRazaoSocial(escolaNautica.getRazaoSocial());

        // Atualiza instrutor e responsável pelos IDs enviados
        if (escolaNautica.getInstrutor() != null && escolaNautica.getInstrutor().getID() != null) {
            Optional<Prestador> instrutor = prestadorRepository.findById(escolaNautica.getInstrutor().getID());
            instrutor.ifPresent(escola::setInstrutor);
        } else {
            escola.setInstrutor(null);
        }

        if (escolaNautica.getResponsavel() != null && escolaNautica.getResponsavel().getID() != null) {
            Optional<Prestador> responsavel = prestadorRepository.findById(escolaNautica.getResponsavel().getID());
            responsavel.ifPresent(escola::setResponsavel);
        } else {
            escola.setResponsavel(null);
        }

        EscolaNautica escolaAtualizada = escolaNauticaRepository.save(escola);
        return ResponseEntity.ok(escolaAtualizada);
    }

    // Remover escola náutica
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        Optional<EscolaNautica> escola = escolaNauticaRepository.findById(id);
        if (!escola.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        escolaNauticaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
