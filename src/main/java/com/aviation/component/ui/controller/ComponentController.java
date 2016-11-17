package com.aviation.component.ui.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.aviation.component.ui.vo.ComponentVO;
import com.aviation.component.ui.vo.PostComponentRequestVO;




@RestController
public class ComponentController {

	private List<Long> componentsIds;
	private String removalFromDate;
	private String removalToDate;
	private String optionEnd;
	private String optionStart;

	
	@RequestMapping(value = "/postComponentIds", method = RequestMethod.POST)
	public void getComponentsIds(@RequestBody final PostComponentRequestVO requestVO) throws ParseException {
		componentsIds = new ArrayList<Long>();
		for (ComponentVO component : requestVO.getComponents()) {
			componentsIds.add(component.getComponentID());
		}
		 DateFormat df = new SimpleDateFormat("yyyy-MM-dd"); 
	     System.out.println("fromdate "+requestVO.getFromDate()+" to date "+requestVO.getToDate());
	     optionEnd=requestVO.getToDate();
	     optionStart=requestVO.getFromDate();
	     Date frmDate= df.parse(requestVO.getFromDate());
         Date tDate= df.parse(requestVO.getToDate());
		 SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		 String  startDate=formatter.format(frmDate);
		 String  endDate=formatter.format(tDate);
		
      removalFromDate=startDate.replaceAll("-", "/");
      removalToDate=endDate.replaceAll("-", "/");
	}
}
