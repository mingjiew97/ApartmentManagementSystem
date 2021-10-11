package com.mercury.server.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="hoa_roomPhoto")
public class RoomPhoto {
	@Id
	private Long id;
	@Column
	private String roomNumber;
	@Column
	private String roomImgName;
	@Column
	private String roomImgDescription;
	
	public RoomPhoto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public RoomPhoto(Long id, String roomNumber, String roomImgName, String roomImgDescription) {
		super();
		this.id = id;
		this.roomNumber = roomNumber;
		this.roomImgName = roomImgName;
		this.roomImgDescription = roomImgDescription;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getRoomNumber() {
		return roomNumber;
	}
	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}
	public String getRoomImgName() {
		return roomImgName;
	}
	public void setRoomImgName(String roomImgName) {
		this.roomImgName = roomImgName;
	}
	public String getRoomImgDescription() {
		return roomImgDescription;
	}
	public void setRoomImgDescription(String roomImgDescription) {
		this.roomImgDescription = roomImgDescription;
	}
	@Override
	public String toString() {
		return "RoomPhoto [id=" + id + ", roomNumber=" + roomNumber + ", roomImgName=" + roomImgName
				+ ", roomImgDescription=" + roomImgDescription + "]";
	}
}
