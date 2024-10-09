package com.proa.service;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Value("${spring.mail.username}")
	private String remetente;
	
	public String enviarEmailTexto (String destinatario, String assunto, String mensagem) {
		
	try {
		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		simpleMailMessage.setFrom(remetente);
		simpleMailMessage.setTo(destinatario);
		simpleMailMessage.setSubject(assunto);
		simpleMailMessage.setText(mensagem);
		javaMailSender.send(simpleMailMessage);
		return "Email Enviado";
	}catch (Exception e) {
		return "Erro ao enviar email"+e.getLocalizedMessage();
	}
	}	

	public String enviarEmailComAnexos(String destinatario, String assunto, String mensagem, List<String> caminhosAnexos) {
	    try {
	        // Cria uma instância de MimeMessage
	        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
	        
	        // Usa MimeMessageHelper para configurar o e-mail com anexos
	        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
	        helper.setFrom(remetente);
	        helper.setTo(destinatario);
	        helper.setSubject(assunto);
	        helper.setText(mensagem);
	        
	        // Adiciona cada anexo na lista
	        for (String caminhoAnexo : caminhosAnexos) {
	            FileSystemResource file = new FileSystemResource(new File(caminhoAnexo));
	            helper.addAttachment(file.getFilename(), file);
	        }
	        
	        // Envia o e-mail
	        javaMailSender.send(mimeMessage);
	        return "Email com múltiplos anexos enviado com sucesso";
	    } catch (MessagingException e) {
	        return "Erro ao enviar email com anexos: " + e.getLocalizedMessage();
	    }
	
}
}