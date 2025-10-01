package com.mana_pani.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordResetEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Password Reset Request");
        
        String resetUrl = "http://localhost:5173/reset-password?token=" + token;
        
        message.setText("To reset your password, click the link below:\n" + resetUrl);
        
        mailSender.send(message);
    }
}

