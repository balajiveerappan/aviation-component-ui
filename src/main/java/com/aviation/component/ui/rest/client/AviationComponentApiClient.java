package com.aviation.component.ui.rest.client;

import java.util.List;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.MediaType;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.aviation.component.ui.vo.ComponentReport;
import com.aviation.component.ui.vo.ComponentsPageVO;




@FeignClient("aviation-component-api")
public interface AviationComponentApiClient {
	
	
	@RequestMapping(value = "/removalReport", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ComponentReport getRemovalReport(@RequestParam("componentIds") List<Long> componentIds,@RequestParam("fromDate") String fromDate);

	/*@RequestMapping(value="/navigationToRemoval", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComponentsPageVO navigationToRemoval(@RequestParam("actualData") String actualData,@RequestParam("dataType") String dataType,@RequestParam("fromDate") String fromDate,@RequestParam("toDate") String toDate);*/

	
	@RequestMapping(value = "/navigationToRemoval", method =RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
	public ComponentsPageVO navigationToRemoval(@RequestParam("actualData") String actualData,@RequestParam("dataType") String dataType,@RequestParam("fromDate") String fromDate,@RequestParam("toDate") String toDate);
	
	
}
