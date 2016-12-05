package com.aviation.component.ui.vo;

import java.util.List;

public class ComponentsPageVO {

	private List<Long> componentIds;
	
	private String pageStatus;

	public List<Long> getComponentIds() {
		return componentIds;
	}

	public void setComponentIds(List<Long> componentIds) {
		this.componentIds = componentIds;
	}

	public String getPageStatus() {
		return pageStatus;
	}

	public void setPageStatus(String pageStatus) {
		this.pageStatus = pageStatus;
	}
	
	
}
