package com.mercury.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mercury.server.bean.Lease;
import com.mercury.server.bean.Room;
import com.mercury.server.bean.User;
import com.mercury.server.service.RoomService;

@RestController
public class RoomController {
	@Autowired
	RoomService rs;
	
	@GetMapping("/rooms")
	public List<Room> getRoom() {
		return rs.getAllRoom();
	}
	
	@PostMapping("/rooms")
	public Map<String, Object> addRoom(@RequestBody Room newRoom) {
		Map<String, Object> response = new HashMap<>();
		if (rs.getRoomByRoomNumber(newRoom.getRoomNumber()) == null) {
			response.put("containsRoom", true);
			if (rs.addNewRoom(newRoom)) {
				response.put("insertRoom", true);
			} else {
				response.put("insertRoom", false);
			}
		} else {
			response.put("containsRoom", false);
			response.put("insertRoom", false);
		}
		return response;
	}
	
	@GetMapping("/rooms/{roomNumber}")
	public Room getRoomByRoomNumber(@PathVariable String roomNumber) {
		return rs.getRoomByRoomNumber(roomNumber);
	}
	
	@GetMapping("/rooms/roomType/{roomType}")
	public List<Room> getRoomByRoomType(@PathVariable String roomType) {
		return rs.getRoomByRoomType(roomType);
	}
	
	@GetMapping("/rooms/roomStatus/{status}")
	public List<Room> getRoomByRoomStatus(@PathVariable String status) {
		return rs.getRoomByRoomStatus(status);
	}
	
	@PutMapping("/rooms/edit-room")
	public Map<String, Object> editRoomInformation(@RequestBody Room room) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", rs.editRoom(room));
		return response;
	}
	
	@PutMapping("/rooms/add-lease")
	public Map<String, Object> addNewLeaseToRoom(@RequestBody Lease lease) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", rs.addLeaseToRoom(lease));
		return response;
	}
	
	@PutMapping("/rooms/change-balance")
	public Map<String, Object> changeBalance(@RequestBody Room room) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", rs.changeBalance(room));
		return response;
	}
	
	@PutMapping("/rooms/delete-lease")
	public Map<String, Object> deleteLease(@RequestBody Room room) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", rs.deleteLease(room));
		return response;
	}
	
	@PutMapping("/rooms/change-status")
	public Map<String, Object> changeStatus(@RequestBody Room room) {
		System.out.println(room);
		Map<String, Object> response = new HashMap<>();
		response.put("success", rs.changeStatus(room));
		return response;
	}
}
