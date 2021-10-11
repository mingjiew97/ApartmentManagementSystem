package com.mercury.server.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.mercury.server.bean.UserService;

public interface ServiceDao extends JpaRepository<UserService, Long>{
	List<UserService> findByRoomNumber(String roomNumber);
	UserService findByServiceId(Long serviceId);
	
	@Modifying
	@Query("update UserService s set s.preferableStartTime = ?1, s.preferableEndTime = ?2, s.information = ?3 where s.serviceId = ?4")
    void editService(Date startTime, Date endTime, String information, Long id);
	
	@Modifying
	@Query("update UserService s set s.status = ?1 where s.serviceId = ?2")
    void changeServiceStatusToInProgress(String status, Long id);
	
	@Modifying
	@Query("update UserService s set s.maintenanceId = ?1 where s.serviceId = ?2")
    void addMaintenanceId(Long maintenanceId, Long id);
}
