package com.proa.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proa.model.Cliente;
import com.proa.model.Embarcacao;
import com.proa.service.VencimentoService;


@CrossOrigin (origins = "*")
@RestController
@RequestMapping("/cvencimento")
public class VencimentoController {
    
    @Autowired
    private VencimentoService vencimentoService;
    
    @GetMapping("/vencimento-cha")
    public ResponseEntity<List<Cliente>> buscarVencimentoPorPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim) {
        
        List<Cliente> clientes = vencimentoService.buscarClientesComChaVencendoEntre(dataInicio, dataFim);
        return ResponseEntity.ok(clientes);
    }
    
    
    @GetMapping("/vencimento-tie")
    public ResponseEntity<List<Embarcacao>> buscarVencimentoTiePorPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim) {
        
        List<Embarcacao> embarcacoes = vencimentoService.buscarEmbarcacaoComTieVencendoEntre(dataInicio, dataFim);
        return ResponseEntity.ok(embarcacoes);
    }
    
    @GetMapping("/vencimento-seguro")
    public ResponseEntity<List<Embarcacao>> buscarVencimentoSeguroPorPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim) {
        
        List<Embarcacao> embarcacoes = vencimentoService.buscarEmbarcacaoComSeguroVencendoEntre(dataInicio, dataFim);
        return ResponseEntity.ok(embarcacoes);
    }
}