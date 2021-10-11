package com.mercury.server.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mercury.server.bean.Lease;
import com.mercury.server.bean.Room;
import com.mercury.server.dao.RoomDao;

@Transactional
@Service
public class RoomService {
	@Autowired
	RoomDao roomDao;
	
	public Room getRoomByRoomNumber(String roomNumber) {
		Room result = null;
		try {
			result = roomDao.findByRoomNumber(roomNumber);
		} catch (Exception e) {
			return null;
		}
		return result;
	}
	
	public List<Room> getRoomByRoomType(String roomType) {
		return roomDao.findByRoomType(roomType);
	}
	
	public List<Room> getRoomByRoomStatus(String status) {
		return roomDao.findByStatus(status);
	}
	
	public List<Room> getAllRoom() {
		return roomDao.findAll();
	}
	
	public boolean addNewRoom(Room newRoom) {
		try {
			roomDao.save(newRoom);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public boolean editRoom(Room r) {
		boolean result = true;
		if (roomDao.findByRoomNumber(r.getRoomNumber()) == null) {
			result = false;
		} else {
			try {
				roomDao.editRoomByRoomNumber(r.getRoomType(), r.getRoomArea(), r.getStatus(), r.getDeposit(), r.getRoomNumber());
			} catch (Exception e) {
				result = false;
			}
		}
		return result;
	}
	
	public boolean addLeaseToRoom(Lease lease) {
		boolean result = true;
		if (roomDao.findByRoomNumber(lease.getRoomNumber()) == null) {
			result = false;
		} else {
			try {
				roomDao.changeStatusOfRoom("Booked", lease.getRoomNumber());
				roomDao.addLeaseToRoom(lease.getLeaseId(), lease.getRoomNumber());
			} catch (Exception e) {
				result = false;
			}
		}
		return result;
	}
	
	public boolean deleteLease(Room room) {
		boolean result = true;
		if (roomDao.findByRoomNumber(room.getRoomNumber()) == null) {
			result = false;
		} else {
			try {
				roomDao.changeStatusOfRoom("Vacant", room.getRoomNumber());
				roomDao.addLeaseToRoom(0, room.getRoomNumber());
			} catch (Exception e) {
				result = false;
			}
		}
		return result;
	}
	
	public boolean changeBalance(Room room) {
		try {
			roomDao.changeBalance(room.getRemainedBalance(), room.getRoomNumber());
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public boolean changeStatus(Room room) {
		try {
			roomDao.changeStatusOfRoom(room.getStatus(), room.getRoomNumber());
			return true;
		} catch (Exception e) {
			return false;
		}
	}

}
