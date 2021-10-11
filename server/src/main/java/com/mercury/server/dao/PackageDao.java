package com.mercury.server.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.mercury.server.bean.HOAPackage;

public interface PackageDao extends JpaRepository<HOAPackage, Long>  {
	
	List<HOAPackage> findByRenterId(String renterId);
	List<HOAPackage> findByTrackingNumber(String trackingNumber);
	
	@Modifying
	@Query("update HOAPackage p set p.packagePickedUpTime = ?1, p.status = ?2 where p.id = ?3")
    void editPackage(Date pickUpDate, String status, Long id);
}
