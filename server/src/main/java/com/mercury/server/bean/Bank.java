package com.mercury.server.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="hoa_bank")
public class Bank {
	@Id
	private Long accountNumber;
	@Column
	private String accountHolderName;
	@Column
	private Long routingNumber;
	@Column
	private String accountType;
	@Column
	private String name;
	@Column
	private String email;
	@Column
	private String username;
	
	public Bank() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Bank(Long accountNumber, String accountHolderName, Long routingNumber, String accountType, String name,
			String email, String username) {
		super();
		this.accountNumber = accountNumber;
		this.accountHolderName = accountHolderName;
		this.routingNumber = routingNumber;
		this.accountType = accountType;
		this.name = name;
		this.email = email;
		this.username = username;
	}
	public Long getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(Long accountNumber) {
		this.accountNumber = accountNumber;
	}
	public String getAccountHolderName() {
		return accountHolderName;
	}
	public void setAccountHolderName(String accountHolderName) {
		this.accountHolderName = accountHolderName;
	}
	public Long getRoutingNumber() {
		return routingNumber;
	}
	public void setRoutingNumber(Long routingNumber) {
		this.routingNumber = routingNumber;
	}
	public String getAccountType() {
		return accountType;
	}
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
