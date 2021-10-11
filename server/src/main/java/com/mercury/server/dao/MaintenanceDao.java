package com.mercury.server.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.mercury.server.bean.Maintenance;

public interface MaintenanceDao extends JpaRepository<Maintenance, Long> {
	Maintenance findByMaintenaceId(Long maintenaceId);
	Maintenance findByServiceId(Long serviceId);
	List<Maintenance> findByStaffName(String StaffName);
	
	@Modifying
	@Query("update Maintenance m set m.actualEndTime = ?1, m.finishedMessage = ?2, m.status = ?3 where m.maintenaceId = ?4")
	void completeMaintenanceById(Date endTime, String finishedMessage, String status, Long maintenaceId);
}
