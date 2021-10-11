package com.mercury.server.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="hoa_package")
public class HOAPackage {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column
	private Date packageArrivalTime;
	@Column
	private Date packagePickedUpTime;
	@Column
	private String status;
	@Column
	private String trackingNumber;
	@Column
	private String renterId;
	
	
	public HOAPackage() {
		super();
		// TODO Auto-generated constructor stub
	}
	public HOAPackage(Long id, Date packageArrivalTime, Date packagePickedUpTime, String status, String trackingNumber,
			String renterId) {
		super();
		this.id = id;
		this.packageArrivalTime = packageArrivalTime;
		this.packagePickedUpTime = packagePickedUpTime;
		this.status = status;
		this.trackingNumber = trackingNumber;
		this.renterId = renterId;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getPackageArrivalTime() {
		return packageArrivalTime;
	}
	public void setPackageArrivalTime(Date packageArrivalTime) {
		this.packageArrivalTime = packageArrivalTime;
	}
	public Date getPackagePickedUpTime() {
		return packagePickedUpTime;
	}
	public void setPackagePickedUpTime(Date packagePickedUpTime) {
		this.packagePickedUpTime = packagePickedUpTime;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getTrackingNumber() {
		return trackingNumber;
	}
	public void setTrackingNumber(String trackingNumber) {
		this.trackingNumber = trackingNumber;
	}
	public String getRenterId() {
		return renterId;
	}
	public void setRenterId(String renterId) {
		this.renterId = renterId;
	}
	@Override
	public String toString() {
		return "Package [id=" + id + ", packageArrivalTime=" + packageArrivalTime + ", packagePickedUpTime="
				+ packagePickedUpTime + ", status=" + status + ", trackingNumber=" + trackingNumber + ", renterId="
				+ renterId + "]";
	}
}