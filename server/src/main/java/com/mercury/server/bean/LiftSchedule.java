package com.mercury.server.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="hoa_liftSchedule")
public class LiftSchedule {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long liftScheduleId;
	@Column
	private Date startTime;
	@Column
	private Date endTime;
	@Column
	private String reason;
	@Column
	private String roomNumber;
	@Column
	private String approved;
	
	
	public LiftSchedule() {
		super();
		// TODO Auto-generated constructor stub
	}
	public LiftSchedule(long liftScheduleId, Date startTime, Date endTime, String reason, String roomNumber,
			String approved) {
		super();
		this.liftScheduleId = liftScheduleId;
		this.startTime = startTime;
		this.endTime = endTime;
		this.reason = reason;
		this.roomNumber = roomNumber;
		this.approved = approved;
	}
	public long getLiftScheduleId() {
		return liftScheduleId;
	}
	public void setLiftScheduleId(long liftScheduleId) {
		this.liftScheduleId = liftScheduleId;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getRoomNumber() {
		return roomNumber;
	}
	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}
	public String getApproved() {
		return approved;
	}
	public void setApproved(String approved) {
		this.approved = approved;
	}
	@Override
	public String toString() {
		return "LiftSchedule [liftScheduleId=" + liftScheduleId + ", startTime=" + startTime + ", endTime=" + endTime
				+ ", reason=" + reason + ", roomNumber=" + roomNumber + ", approved=" + approved + "]";
	}

	
}
