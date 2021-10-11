package com.mercury.server.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="hoa_card")
public class Card {
	@Id
	private Long cardNumber;
	@Column
	private String address;
	@Column
	private String city;
	@Column
	private String state;
	@Column
	private String country;
	@Column
	private Long zipCode;
	@Column
	private String name;
	@Column
	private Long expDate;
	@Column
	private Long expMonth;
	@Column
	private String username;
	
	
	public Card() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Card(Long cardNumber, String address, String city, String state, String country, Long zipCode, String name,
			Long expDate, Long expMonth, String username) {
		super();
		this.cardNumber = cardNumber;
		this.address = address;
		this.city = city;
		this.state = state;
		this.country = country;
		this.zipCode = zipCode;
		this.name = name;
		this.expDate = expDate;
		this.expMonth = expMonth;
		this.username = username;
	}

	public Long getCardNumber() {
		return cardNumber;
	}
	public void setCardNumber(Long cardNumber) {
		this.cardNumber = cardNumber;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public Long getZipCode() {
		return zipCode;
	}
	public void setZipCode(Long zipCode) {
		this.zipCode = zipCode;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getExpDate() {
		return expDate;
	}
	public void setExpDate(Long expDate) {
		this.expDate = expDate;
	}
	public Long getExpMonth() {
		return expMonth;
	}
	public void setExpMonth(Long expMonth) {
		this.expMonth = expMonth;
	}
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
