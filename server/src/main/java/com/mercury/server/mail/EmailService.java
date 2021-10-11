package com.mercury.server.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailService {
	@Autowired
	public JavaMailSender emailSender;
	
	public void SendMessage(String subject, String content) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo("frank19970907@outlook.com");
		message.setSubject(subject);
		message.setText("Temporary password is " + content);
		emailSender.send(message);
	}
	
	public void PasswordReset() {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo("frank19970907@outlook.com");
		message.setSubject("Password Reset Notification");
		message.setText("Password has been successfully reset!");
		emailSender.send(message);
	}

	public void TestSendMessage() {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo("frank19970907@outlook.com");
		message.setSubject("test");
		message.setText("test");
		emailSender.send(message);
	}
}
