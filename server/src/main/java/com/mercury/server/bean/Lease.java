package com.mercury.server.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="hoa_lease")
public class Lease {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long leaseId;
	@Column
	private String roomNumber;
	@Column
	private Date leaseStartDate;
	@Column
	private Date leaseEndDate;
	@Column
	private String partyA;
	@Column
	private String partyB;
	@Column
	private float rent;
	@Column
	private float deposit;
	@Column
	private String employmentLetter;
	@Column
	private String bankStatement;
	@Column
	private String taxFrom;
	@Column
	private String photoIdentification;
	@Column
	private String leaseCopy;
	
	public Lease() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Lease(long leaseId, String roomNumber, Date leaseStartDate, Date leaseEndDate, String partyA, String partyB,
			float rent, float deposit, String employmentLetter, String bankStatement, String taxFrom,
			String photoIdentification, String leaseCopy) {
		super();
		this.leaseId = leaseId;
		this.roomNumber = roomNumber;
		this.leaseStartDate = leaseStartDate;
		this.leaseEndDate = leaseEndDate;
		this.partyA = partyA;
		this.partyB = partyB;
		this.rent = rent;
		this.deposit = deposit;
		this.employmentLetter = employmentLetter;
		this.bankStatement = bankStatement;
		this.taxFrom = taxFrom;
		this.photoIdentification = photoIdentification;
		this.leaseCopy = leaseCopy;
	}
	public long getLeaseId() {
		return leaseId;
	}
	public void setLeaseId(long leaseId) {
		this.leaseId = leaseId;
	}
	public String getRoomNumber() {
		return roomNumber;
	}
	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}
	public Date getLeaseStartDate() {
		return leaseStartDate;
	}
	public void setLeaseStartDate(Date leaseStartDate) {
		this.leaseStartDate = leaseStartDate;
	}
	public Date getLeaseEndDate() {
		return leaseEndDate;
	}
	public void setLeaseEndDate(Date leaseEndDate) {
		this.leaseEndDate = leaseEndDate;
	}
	public String getPartyA() {
		return partyA;
	}
	public void setPartyA(String partyA) {
		this.partyA = partyA;
	}
	public String getPartyB() {
		return partyB;
	}
	public void setPartyB(String partyB) {
		this.partyB = partyB;
	}
	public float getRent() {
		return rent;
	}
	public void setRent(float rent) {
		this.rent = rent;
	}
	public float getDeposit() {
		return deposit;
	}
	public void setDeposit(float deposit) {
		this.deposit = deposit;
	}
	public String getEmploymentLetter() {
		return employmentLetter;
	}
	public void setEmploymentLetter(String employmentLetter) {
		this.employmentLetter = employmentLetter;
	}
	public String getBankStatement() {
		return bankStatement;
	}
	public void setBankStatement(String bankStatement) {
		this.bankStatement = bankStatement;
	}
	public String getTaxFrom() {
		return taxFrom;
	}
	public void setTaxFrom(String taxFrom) {
		this.taxFrom = taxFrom;
	}
	public String getPhotoIdentification() {
		return photoIdentification;
	}
	public void setPhotoIdentification(String photoIdentification) {
		this.photoIdentification = photoIdentification;
	}
	public String getLeaseCopy() {
		return leaseCopy;
	}
	public void setLeaseCopy(String leaseCopy) {
		this.leaseCopy = leaseCopy;
	}
	@Override
	public String toString() {
		return "Lease [leaseId=" + leaseId + ", roomNumber=" + roomNumber + ", leaseStartDate=" + leaseStartDate
				+ ", leaseEndDate=" + leaseEndDate + ", partyA=" + partyA + ", partyB=" + partyB + ", rent=" + rent
				+ ", deposit=" + deposit + ", employmentLetter=" + employmentLetter + ", BankStatement=" + bankStatement
				+ ", taxFrom=" + taxFrom + ", photoIdentification=" + photoIdentification + ", leaseCopy=" + leaseCopy
				+ "]";
	}
	
	
	
	
	
}