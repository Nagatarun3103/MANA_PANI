package com.mana_pani.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class AppEmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Method to send a welcome email
    public void sendWelcomeEmail(String to, String username) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("manaa.pani.45@gmail.com"); // Replaced with user's email
        message.setTo(to);
        message.setSubject("Welcome to MANA_PANI 🎉");
        message.setText(
            "Hi " + username + ",\n\n" +
            "Welcome to MANA_PANI! 🌊\n" +
            "We’re excited to have you on board. With MANA_PANI, you can set your goals, track progress, and stay motivated.\n\n" +
            "Let’s get started → Log in and set your first goal today!\n\n" +
            "Stay consistent,\n" +
            "The MANA_PANI Team"
        );
        mailSender.send(message);
    }

    // Method to send a goal reminder email
    public void sendGoalReminderEmail(String to, String username, String goalName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("manaa.pani.45@gmail.com"); // Replaced with user's email
        message.setTo(to);
        message.setSubject("⏰ Just 10 minutes left to achieve your goal!");
        message.setText(
            "Hi " + username + ",\n\n" +
            "Your goal \"" + goalName + "\" is about to end in 10 minutes.\n" +
            "This is your chance to push through and finish strong. 💪\n\n" +
            "Remember: small steps every day lead to big results!\n\n" +
            "We believe in you,\n" +
            "The MANA_PANI Team"
        );
        mailSender.send(message);
    }

    // Method to send a password reset email
    public void sendPasswordResetEmail(String to, String username, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("manaa.pani.45@gmail.com"); // Replaced with user's email
        message.setTo(to);
        message.setSubject("Password Reset Request");
        message.setText(
            "Hi " + username + ",\n\n" +
            "You have requested to reset your password. Please use the following token to reset your password:\n\n" +
            "Please click on the following link to reset your password: " +
            "http://localhost:5173/reset-password?token=" + token + "\n\n" +
            "This link is valid for 1 hour.\n\n" +
            "The MANA_PANI Team"
        );
        mailSender.send(message);
    }
}
