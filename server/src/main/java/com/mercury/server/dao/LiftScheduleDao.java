package com.mercury.server.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.mercury.server.bean.LiftSchedule;

public interface LiftScheduleDao extends JpaRepository<LiftSchedule, Long> {
	LiftSchedule findByLiftScheduleId(Long liftScheduleId);
	List<LiftSchedule> findByRoomNumber(String roomNumber);
	
	@Modifying
	@Query("update LiftSchedule l set l.approved = ?1 where l.liftScheduleId = ?2")
    void changeStatus(String approved, Long liftScheduleId);
}
