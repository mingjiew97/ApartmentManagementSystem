package com.mercury.server.bean;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="hoa_maintenance")
public class Maintenance {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long maintenaceId;
	@Column
	private Date actualStartTime;
	@Column
	private Date actualEndTime;
	@Column
	private String finishedMessage;
	@Column
	private long serviceId;
	@Column
	private String staffName;
	@Column
	private String status;
	
	public Maintenance() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Maintenance(long maintenaceId, Date actualStartTime, Date actualEndTime, String finishedMessage,
			long serviceId, String staffName, String status) {
		super();
		this.maintenaceId = maintenaceId;
		this.actualStartTime = actualStartTime;
		this.actualEndTime = actualEndTime;
		this.finishedMessage = finishedMessage;
		this.serviceId = serviceId;
		this.staffName = staffName;
		this.status = status;
	}
	public long getMaintenaceId() {
		return maintenaceId;
	}
	public void setMaintenaceId(long maintenaceId) {
		this.maintenaceId = maintenaceId;
	}
	public Date getActualStartTime() {
		return actualStartTime;
	}
	public void setActualStartTime(Date actualStartTime) {
		this.actualStartTime = actualStartTime;
	}
	public Date getActualEndTime() {
		return actualEndTime;
	}
	public void setActualEndTime(Date actualEndTime) {
		this.actualEndTime = actualEndTime;
	}
	public String getFinishedMessage() {
		return finishedMessage;
	}
	public void setFinishedMessage(String finishedMessage) {
		this.finishedMessage = finishedMessage;
	}
	public long getServiceId() {
		return serviceId;
	}
	public void setServiceId(long serviceId) {
		this.serviceId = serviceId;
	}
	public String getStaffName() {
		return staffName;
	}
	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Maintenance [maintenaceId=" + maintenaceId + ", actualStartTime=" + actualStartTime + ", actualEndTime="
				+ actualEndTime + ", finishedMessage=" + finishedMessage + ", serviceId=" + serviceId + ", staffName="
				+ staffName + ", status=" + status + "]";
	}
}