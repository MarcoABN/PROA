package com.proa.service;

import com.proa.model.Cliente;
import com.proa.model.Embarcacao;
import com.proa.repository.EmbarcacaoRepository;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.apache.poi.xwpf.converter.pdf.PdfConverter;
import org.apache.poi.xwpf.converter.pdf.PdfOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProcuracaoService {

    @Autowired
    private EmbarcacaoRepository embarcacaoRepository;

    public byte[] gerarProcuracaoPdf(Long idEmbarcacao) throws Exception {
        Embarcacao embarcacao = embarcacaoRepository.findById(idEmbarcacao)
                .orElseThrow(() -> new RuntimeException("Embarcação não encontrada com ID: " + idEmbarcacao));
        Cliente cliente = embarcacao.getCliente();

        InputStream templateInputStream = new ClassPathResource("templates/procuracao01.docx").getInputStream();
        XWPFDocument document = new XWPFDocument(templateInputStream);

        Map<String, String> variaveis = preencherVariaveis(cliente, embarcacao);
        substituirVariaveis(document, variaveis);

        // Converter para PDF
        try (ByteArrayOutputStream pdfOutput = new ByteArrayOutputStream()) {
            PdfOptions options = PdfOptions.create();
            PdfConverter.getInstance().convert(document, pdfOutput, options);
            return pdfOutput.toByteArray();
        }
    }

    private Map<String, String> preencherVariaveis(Cliente cliente, Embarcacao embarcacao) {
        Map<String, String> vars = new HashMap<>();

        String enderecoCompleto = String.format("%s, %s, %s, %s - %s/%s",
                cliente.getLogradouro(), cliente.getNumero(), cliente.getBairro(),
                cliente.getCidade(), cliente.getCep(), cliente.getUF());

        String localData = "Goiânia, " + LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));

        vars.put("${nomecliente1}", cliente.getNome());
        vars.put("${nacionalidade}", cliente.getNacionalidade());
        vars.put("${enderecocompleto}", enderecoCompleto);
        vars.put("${identidade}", cliente.getRG());
        vars.put("${orgaoexpedidor}", cliente.getOrgEmissor());
        vars.put("${cpfcliente1}", cliente.getCPFCNPJ());

        vars.put("${nomeemb}", embarcacao.getNomeEmbarcacao());
        vars.put("${numinscricao}", embarcacao.getNumInscricao());
        vars.put("${tipo}", embarcacao.getTipoEmbarcacao());
        vars.put("${atividade}", embarcacao.getTipoAtividade());
        vars.put("${comprimento}", String.valueOf(embarcacao.getCompTotal()));
        vars.put("${tripulantes}", String.valueOf(embarcacao.getQtdTripulantes()));
        vars.put("${boca}", String.valueOf(embarcacao.getBocaMoldada()));
        vars.put("${passageiros}", String.valueOf(embarcacao.getLotacao()));
        vars.put("${numcasco}", embarcacao.getNumCasco());
        vars.put("${materialcasco}", embarcacao.getMatCasco());
        vars.put("${potencia}", String.valueOf(embarcacao.getPotenciaMotor()));

        vars.put("${numserie}", embarcacao.getNumInscricao());

        vars.put("${nomecliente2}", cliente.getNome());
        vars.put("${cpfcliente2}", cliente.getCPFCNPJ());
        vars.put("${localdata}", localData);

        return vars;
    }

    private void substituirVariaveis(XWPFDocument document, Map<String, String> variaveis) {
        for (XWPFParagraph paragraph : document.getParagraphs()) {
            List<XWPFRun> runs = paragraph.getRuns();
            if (runs != null) {
                for (XWPFRun run : runs) {
                    String text = run.getText(0);
                    if (text != null) {
                        for (Map.Entry<String, String> entry : variaveis.entrySet()) {
                            if (text.contains(entry.getKey())) {
                                text = text.replace(entry.getKey(), entry.getValue() != null ? entry.getValue() : "");
                            }
                        }
                        run.setText(text, 0);
                    }
                }
            }
        }
    }
}
