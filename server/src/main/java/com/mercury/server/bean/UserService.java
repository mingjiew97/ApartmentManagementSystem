package com.mercury.server.bean;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="hoa_service")
public class UserService {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long serviceId;
	@Column
	private String information;
	@Column
	private Date preferableStartTime;
	@Column
	private Date preferableEndTime;
	@Column
	private String status;
	@Column
	private String roomNumber;
	@Column
	private long maintenanceId;
	
	
	public UserService() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UserService(long serviceId, String information, Date preferableStartTime, Date preferableEndTime, String status,
			String roomNumber, long maintenanceId) {
		super();
		this.serviceId = serviceId;
		this.information = information;
		this.preferableStartTime = preferableStartTime;
		this.preferableEndTime = preferableEndTime;
		this.status = status;
		this.roomNumber = roomNumber;
		this.maintenanceId = maintenanceId;
	}
	public long getServiceId() {
		return serviceId;
	}
	public void setServiceId(long serviceId) {
		this.serviceId = serviceId;
	}
	public String getInformation() {
		return information;
	}
	public void setInformation(String information) {
		this.information = information;
	}
	public Date getPreferableStartTime() {
		return preferableStartTime;
	}
	public void setPreferableStartTime(Date preferableStartTime) {
		this.preferableStartTime = preferableStartTime;
	}
	public Date getPreferableEndTime() {
		return preferableEndTime;
	}
	public void setPreferableEndTime(Date preferableEndTime) {
		this.preferableEndTime = preferableEndTime;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRoomNumber() {
		return roomNumber;
	}
	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}
	public long getMaintenanceId() {
		return maintenanceId;
	}
	public void setMaintenanceId(long maintenanceId) {
		this.maintenanceId = maintenanceId;
	}
	@Override
	public String toString() {
		return "Service [serviceId=" + serviceId + ", information=" + information + ", preferableStartTime="
				+ preferableStartTime + ", preferableEndTime=" + preferableEndTime + ", status=" + status
				+ ", roomNumber=" + roomNumber + ", maintenanceId=" + maintenanceId + "]";
	}
	
	
}
