//CRUD Inicial validado

package com.proa.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
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
import org.springframework.web.multipart.MultipartFile;

import com.proa.exception.ResourceNotFoundException;
import com.proa.model.Motor;
import com.proa.model.NotaFiscal;
import com.proa.repository.NotaFiscalRepository;

@CrossOrigin(origins = "*")
@RequestMapping("/cnotafiscal/")
@RestController
public class NotaFiscalController {
    @Autowired
    private NotaFiscalRepository notaFiscalRep;

    //Metodo para listar notaFiscales
    @GetMapping("/notafiscal")
    public List<NotaFiscal> listar() {
        return this.notaFiscalRep.findAll();
    }

    //Metodo para consultar NotaFiscal
    @GetMapping("/notafiscal/{idNotaFiscal}")
    public ResponseEntity<NotaFiscal> consultar(@PathVariable Long idNotaFiscal) {
        NotaFiscal prest = this.notaFiscalRep.findById(idNotaFiscal).orElseThrow(() ->
            new ResourceNotFoundException("NotaFiscal não encontrado: " + idNotaFiscal));
        return ResponseEntity.ok(prest);
    }
    
    
    @GetMapping("/embarcacao/{idEmbarcacao}")
    public ResponseEntity<List<NotaFiscal>> listarPorEmbarcacao(@PathVariable Long idEmbarcacao) {
		List<NotaFiscal> notaFiscal = this.notaFiscalRep.findByEmbarcacaoId(idEmbarcacao);
        if (notaFiscal.isEmpty()) {
            throw new ResourceNotFoundException("Nenhuma embarcação encontrada para o cliente: " + idEmbarcacao);
        }
        return ResponseEntity.ok(notaFiscal);
    }
    
    

    //Metodo para inserir
    @PostMapping("/notafiscal")
    public NotaFiscal inserir(@RequestBody NotaFiscal prest) {
        return this.notaFiscalRep.save(prest);
    }

    //Metodo para Alterar
    @PutMapping("/notafiscal/{idNotaFiscal}")
    public ResponseEntity<NotaFiscal> alterar(@PathVariable Long idNotaFiscal, @RequestBody NotaFiscal nf) {
        NotaFiscal nfLocalizado = this.notaFiscalRep.findById(idNotaFiscal).orElseThrow(() ->
            new ResourceNotFoundException("NotaFiscal não encontrada: " + idNotaFiscal));

        nfLocalizado.setID(nf.getID());
        nfLocalizado.setCNPJVendedor(nf.getCNPJVendedor());
        nfLocalizado.setRazaoSocial(nf.getRazaoSocial());
        nfLocalizado.setDtVenda(nf.getDtVenda());
        nfLocalizado.setLocal(nf.getLocal());
        nfLocalizado.setNumeroNotaFiscal(nf.getNumeroNotaFiscal());

        //Relacionamento
        nfLocalizado.setEmbarcacao(nf.getEmbarcacao());

        NotaFiscal atualizado = this.notaFiscalRep.save(nfLocalizado);
        return ResponseEntity.ok(atualizado);
    }

    //Metodo para Deletar
    @DeleteMapping("/notafiscal/{idNotaFiscal}")
    public ResponseEntity<Map<String, Boolean>> excluir(@PathVariable Long idNotaFiscal) {
        NotaFiscal nfLocalizado = this.notaFiscalRep.findById(idNotaFiscal).orElseThrow(() ->
            new ResourceNotFoundException("NotaFiscal não encontrado: " + idNotaFiscal));

        this.notaFiscalRep.delete(nfLocalizado);

        Map<String, Boolean> resposta = new HashMap<>();
        resposta.put("NotaFiscal Excluida!", Boolean.TRUE);
        return ResponseEntity.ok(resposta);
    }
    
    @PostMapping("/notafiscal/{idNotaFiscal}/upload")
    public ResponseEntity<String> uploadPDF(@PathVariable Long idNotaFiscal, @RequestParam("file") MultipartFile file) {
        NotaFiscal nfLocalizado = this.notaFiscalRep.findById(idNotaFiscal).orElseThrow(() ->
            new ResourceNotFoundException("NotaFiscal não encontrada: " + idNotaFiscal));

        // Verificar se o arquivo é um PDF
        if (!file.getContentType().equals("application/pdf")) {
            return ResponseEntity.badRequest().body("O arquivo enviado não é um PDF.");
        }

        try {
            // Definir o caminho para salvar o arquivo
            String fileName = nfLocalizado.getNumeroNotaFiscal() + ".pdf";
            String uploadDir = "D:/PROA/backend/src/NotaFiscal";
            Path filePath = Paths.get(uploadDir + fileName);

            // Salvar o arquivo no sistema de arquivos
            Files.write(filePath, file.getBytes());

            // Atualizar o caminho do PDF no banco de dados
            nfLocalizado.setPdfPath(filePath.toString());
            this.notaFiscalRep.save(nfLocalizado);

            return ResponseEntity.ok("PDF carregado com sucesso.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erro ao salvar o arquivo PDF: " + e.getMessage());
        }
    }
    
    @GetMapping("/notafiscal/{idNotaFiscal}/pdf")
    public ResponseEntity<Resource> getPDF(@PathVariable Long idNotaFiscal) {
        NotaFiscal nfLocalizado = this.notaFiscalRep.findById(idNotaFiscal).orElseThrow(() ->
            new ResourceNotFoundException("NotaFiscal não encontrada: " + idNotaFiscal));

        try {
            Path filePath = Paths.get(nfLocalizado.getPdfPath());
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_PDF)
                        .body(resource);
            } else {
                throw new RuntimeException("Erro ao ler o arquivo: " + nfLocalizado.getPdfPath());
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Erro ao ler o arquivo: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/notafiscal/{idNotaFiscal}/pdf")
    public ResponseEntity<Map<String, Boolean>> excluirPDF(@PathVariable Long idNotaFiscal) {
        NotaFiscal nfLocalizado = this.notaFiscalRep.findById(idNotaFiscal).orElseThrow(() ->
            new ResourceNotFoundException("NotaFiscal não encontrada: " + idNotaFiscal));

        String pdfPath = nfLocalizado.getPdfPath();

        if (pdfPath == null || pdfPath.isEmpty()) {
            throw new ResourceNotFoundException("Nenhum arquivo PDF encontrado para a NotaFiscal: " + idNotaFiscal);
        }

        try {
            // Deletar o arquivo PDF do sistema de arquivos
            Path filePath = Paths.get(pdfPath);
            Files.deleteIfExists(filePath);

            // Remover o caminho do PDF da NotaFiscal no banco de dados
            nfLocalizado.setPdfPath(null);
            this.notaFiscalRep.save(nfLocalizado);

            Map<String, Boolean> resposta = new HashMap<>();
            resposta.put("PDF excluído com sucesso!", Boolean.TRUE);
            return ResponseEntity.ok(resposta);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(Map.of("Erro ao excluir o arquivo PDF: " + e.getMessage(), Boolean.FALSE));
        }
    }


}
