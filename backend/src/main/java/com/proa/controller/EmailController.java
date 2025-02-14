package com.proa.controller;

import com.proa.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/enviar")
    public ResponseEntity<String> enviarEmail(
            @RequestParam String destinatario,
            @RequestParam String assunto,
            @RequestParam String mensagem) {
        String resultado = emailService.enviarEmailTexto(destinatario, assunto, mensagem);
        return ResponseEntity.ok(resultado);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/anexos")
    public ResponseEntity<String> enviarEmailComAnexos(
            @RequestParam String destinatario,
            @RequestParam String assunto,
            @RequestParam String mensagem,
            @RequestParam("anexos") List<MultipartFile> anexos) {
        
        List<String> caminhosAnexos = new ArrayList<>();
        
        try {
            for (MultipartFile anexo : anexos) {
                File tempFile = File.createTempFile("anexo-", "-" + anexo.getOriginalFilename());
                anexo.transferTo(tempFile);
                caminhosAnexos.add(tempFile.getAbsolutePath());
            }
            
            String resultado = emailService.enviarEmailComAnexos(destinatario, assunto, mensagem, caminhosAnexos);
            
            // Limpar arquivos temporários
            for (String caminho : caminhosAnexos) {
                new File(caminho).delete();
            }
            
            return ResponseEntity.ok(resultado);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Erro ao processar anexos: " + e.getMessage());
        }
    }
}