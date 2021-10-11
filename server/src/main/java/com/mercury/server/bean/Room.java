package com.mercury.server.bean;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.beans.factory.annotation.Value;

@Entity
@Table(name="hoa_room")
public class Room {
	@Id
	private String roomNumber;
	@Column
	private String status;
	@Column
	private String roomType;
	@Column
	private float roomArea;
	@Column
	private float remainedBalance;
	@Column
	private float deposit;
	@Column
	private long leaseId;
	@Column
	private long serviceId;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "hoa_room_user", 
			joinColumns = { @JoinColumn(name = "roomNumber", referencedColumnName = "roomNumber") }, 
			inverseJoinColumns = {@JoinColumn(name = "userEmail", referencedColumnName = "username") })
	private List<User> users;
	
	public Room() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Room(String roomNumber, String status, String roomType, float roomArea, float remainedBalance, float deposit,
			long leaseId, long serviceId, List<User> users) {
		super();
		this.roomNumber = roomNumber;
		this.status = status;
		this.roomType = roomType;
		this.roomArea = roomArea;
		this.remainedBalance = remainedBalance;
		this.deposit = deposit;
		this.leaseId = leaseId;
		this.serviceId = serviceId;
		this.users = users;
	}

	public String getRoomNumber() {
		return roomNumber;
	}
	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRoomType() {
		return roomType;
	}
	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}
	public float getRoomArea() {
		return roomArea;
	}
	public void setRoomArea(float roomArea) {
		this.roomArea = roomArea;
	}
	public float getRemainedBalance() {
		return remainedBalance;
	}
	public void setRemainedBalance(float remainedBalance) {
		this.remainedBalance = remainedBalance;
	}
	public long getLeaseId() {
		return leaseId;
	}
	public void setLeaseId(long leaseId) {
		this.leaseId = leaseId;
	}
	public long getServiceId() {
		return serviceId;
	}
	public void setServiceId(long serviceId) {
		this.serviceId = serviceId;
	}
	public List<User> getUsers() {
		return users;
	}
	public void setUsers(List<User> users) {
		this.users = users;
	}
	public float getDeposit() {
		return deposit;
	}
	public void setDeposit(float deposit) {
		this.deposit = deposit;
	}
}