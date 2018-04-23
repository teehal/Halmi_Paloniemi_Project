import React, { Component } from "react";

import Language from "./language/Language";
import RegionLevel from "./region-level/RegionLevel";
import Region from "./region/Region";
import ScenarioCollection from "./scenario-collection/ScenarioCollection";
import Scenarios from "./scenarios/Scenarios";
import TimePeriods from "./time-periods/TimePeriods";
import Indicators from "./indicators/Indicators";

import "./leftpanel.scss";

class LeftPanel extends Component {
  render() {
    const language = this.props.language;
    const languageList = this.props.languageList;
    const languageData = this.props.handleLanguageChange;

    const regionalLevel = this.props.regionalLevel;
    const regionalLevelList = this.props.regionalLevelList;
    const regionalLevelData = this.props.handleRegionalLevelChange;

    const region = this.props.region;
    const regionList = this.props.regionList;
    const regionData = this.props.handleRegionChange;

    const scenarioCollection = this.props.scenarioCollection;
    const scenarioCollectionList = this.props.scenarioCollectionList;
    const scenarioCollectionData = this.props.handleScenarioCollectionChange;

    const scenarios = this.props.scenarios;
		const timePeriods = this.props.timePeriods;
		const updateSelectedOptions = this.props.updateSelectedOptions;

    const selectedDataChange = this.props.handleSelectedDataChange;
    return (
	<div>
      	<div className="leftpanel-container content-panel shadow-1">
	      
	        <h3 className="header-spacing-panels">
	          {this.props.scenarioSelectionLabel}
	        </h3>
	
	        <div className="region-level">
	          <RegionLevel
							displayTexts={this.props.displayTexts}
							language={language}
							onToggleAccordionModalClick={this.props.onToggleAccordionModalClick} 
							regionalLevelData={regionalLevelData}
							regionalLevelLabel={this.props.regionalLevelLabel}
							regionalLevelList={regionalLevelList}
							regionalLevel={regionalLevel}
	          />
	        </div>
	
	        <div className="region">
	          <Region
							displayTexts={this.props.displayTexts}
							language={language}
							onToggleAccordionModalClick={this.props.onToggleAccordionModalClick} 
							regionData={regionData}
							regionLabel={this.props.regionLabel}
							regionList={regionList}
							region={region}
	          />
	        </div>
	
	        <div className="region-level">
	          <ScenarioCollection
							displayTexts={this.props.displayTexts}
							language={language}
							onToggleAccordionModalClick={this.props.onToggleAccordionModalClick} 
							scenarioCollectionData={scenarioCollectionData}
							scenarioCollectionListLabel={this.props.scenarioCollectionListLabel}
							scenarioCollectionList={scenarioCollectionList}
							scenarioCollection={scenarioCollection}
	          />
	        </div>
	
	        <div className="scenarios">
	          <Scenarios
							displayTexts={this.props.displayTexts}
							isMandatoryAlertLabel = {this.props.isMandatoryAlertLabel} 
							language={language}
							onToggleAccordionModalClick={this.props.onToggleAccordionModalClick}
							regionalLevel={regionalLevel}
							region={region}
							scenarioCollection = {scenarioCollection}
							scenariosLabel={this.props.scenariosLabel}
							scenarios={scenarios}
							selectedDataChange={selectedDataChange}
							selectedOptions={this.props.selectedOptions}
							updateSelectedOptions = {updateSelectedOptions}
	          />
	        </div>
	        <div className="timeline">
				<TimePeriods
					displayTexts={this.props.displayTexts}
					isMandatoryAlertLabel = {this.props.isMandatoryAlertLabel}  
					language={language}
					onToggleAccordionModalClick={this.props.onToggleAccordionModalClick}
					regionalLevel={regionalLevel}
					region={region}
					scenarioCollection = {scenarioCollection}
					selectedDataChange={selectedDataChange}
					selectedOptions={this.props.selectedOptions}
					timePeriodsLabel={this.props.timePeriodsLabel}
					timePeriods={timePeriods}
				/>
	        </div>
	    </div>
			<div>
				<Indicators
					displayTexts={this.props.displayTexts}
					indicatorCategories={this.props.indicatorCategories}
					indicatorSelectionLabel={this.props.indicatorSelectionLabel}
					isMandatoryAlertLabel = {this.props.isMandatoryAlertLabel}   
					language={language}
					onToggleAccordionModalClick={this.props.onToggleAccordionModalClick}
					regionalLevel={regionalLevel}
					region={region}
					scenarioCollection = {scenarioCollection}
					selectedDataChange={selectedDataChange}
					selectedOptions={this.props.selectedOptions}
					updateSelectedOptions = {updateSelectedOptions}
				/>
			</div>
	</div>
    );
  }
}

export default LeftPanel;
