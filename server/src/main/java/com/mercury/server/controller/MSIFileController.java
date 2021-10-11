package com.mercury.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mercury.server.http.Response;
import com.mercury.server.service.FileStorageService;
import com.mercury.server.service.MSIFileService;

@RestController
@RequestMapping("/files")
public class MSIFileController {
	
	@Autowired
	MSIFileService msiFileService;
	
	private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private FileStorageService fileStorageService;

	@PostMapping("/upload/{filename}")
	public Map<String, Object> upload(@PathVariable String filename, @RequestParam("file") MultipartFile file) {
		Map<String, Object> response = new HashMap<>();
		  try {
			  String fileName = fileStorageService.storeFile(file);
		
		      String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
		              .path("/downloadFile/")
		              .path(fileName)
		              .toUriString();
		      
		      response.put("success", true);
		  } catch (Exception e) {
		      response.put("success", false);
		  }
		  return response;
		  
//		return msiFileService.upload(filename, file);
	}
	
	@GetMapping("/download/{filename}")
	public ResponseEntity<Resource> download(@PathVariable String filename) {
		return msiFileService.download(filename);
	}
	
	@GetMapping("/list")
	public List<String> list() {
		return msiFileService.list();
	}

}
