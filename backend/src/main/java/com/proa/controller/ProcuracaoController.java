package com.proa.controller;

import com.proa.service.ProcuracaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin (origins = "*")
@RestController
@RequestMapping("/procuracao")
public class ProcuracaoController {

    @Autowired
    private ProcuracaoService procuracaoService;

    @GetMapping("/pdf/{idEmbarcacao}")
    public ResponseEntity<byte[]> gerarProcuracao(@PathVariable Long idEmbarcacao) {
        try {
            byte[] pdf = procuracaoService.gerarProcuracaoPdf(idEmbarcacao);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=procuracao.pdf")
                    .body(pdf);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(null);
        }
    }
}
