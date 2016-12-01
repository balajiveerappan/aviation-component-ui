package com.aviation.component.ui.vo;

import java.util.List;

public class RemovalReportVO {

	
	
	private String fromDate;
	
	private List<Long> componentIds;

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public List<Long> getComponentIds() {
		return componentIds;
	}

	public void setComponentIds(List<Long> componentIds) {
		this.componentIds = componentIds;
	}

	
	
	
}
