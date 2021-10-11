package com.mercury.server.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.mercury.server.bean.Room;

public interface RoomDao extends JpaRepository<Room, Long>{
	Room findByRoomNumber(String roomNumber);
	List<Room> findByRoomType(String roomType);
	List<Room> findByStatus(String status);
	
	@Modifying
	@Query("update Room r set r.roomType = ?1, r.roomArea = ?2, r.status = ?3, r.deposit = ?4 where r.roomNumber = ?5")
    void editRoomByRoomNumber(String roomType, float roomArea, String status, float deposit, String roomNumber);
	
	@Modifying
	@Query("update Room r set r.leaseId = ?1 where r.roomNumber = ?2")
    void addLeaseToRoom(long leaseId, String roomNumber);
	
	@Modifying
	@Query("update Room r set r.status = ?1 where r.roomNumber = ?2")
    void changeStatusOfRoom(String Status, String roomNumber);
	
	@Modifying
	@Query("update Room r set r.serviceId = ?1 where r.roomNumber = ?2")
    void addServiceToRoom(String serviceId, String roomNumber);
	
	@Modifying
	@Query("update Room r set r.remainedBalance = ?1 where r.roomNumber = ?2")
	void changeBalance(float balance, String roomNumber);
}
