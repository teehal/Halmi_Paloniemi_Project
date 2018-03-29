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
    //  console.log(scenarios);
    //  const timePeriods = this.props.timePeriods;

    const selectedDataChange = this.props.handleSelectedDataChange;

    return (
	<div>
      	<div className="leftpanel-container content-panel shadow-1">
	      
	        <h3 className="header-spacing-panels">
	          {this.props.scenarioSelectionLabel}
	        </h3>
	
	        <div className="region-level">
	          <RegionLevel
	          	language={language}
	            regionalLevelList={regionalLevelList}
	            regionalLevel={regionalLevel}
	            regionalLevelData={regionalLevelData}
	            regionalLevelLabel={this.props.regionalLevelLabel}
	            displayTexts={this.props.displayTexts}            
	          />
	        </div>
	
	        <div className="region">
	          <Region
	            regionList={regionList}
	            region={region}
	            regionData={regionData}
	            regionLabel={this.props.regionLabel}
	            displayTexts={this.props.displayTexts}
	            language={language}
	          />
	        </div>
	
	        <div className="region-level">
	          <ScenarioCollection
	            scenarioCollectionList={scenarioCollectionList}
	            scenarioCollection={scenarioCollection}
	            scenarioCollectionData={scenarioCollectionData}
	            scenarioCollectionListLabel={this.props.scenarioCollectionListLabel}
	            displayTexts={this.props.displayTexts}
	            language={language}
	          />
	        </div>
	
	        <div className="scenarios">
	          <Scenarios
	            scenarios={scenarios}
	            selectedDataChange={selectedDataChange}
	            scenariosLabel={this.props.scenariosLabel}
	            selectedOptions={this.props.selectedOptions}
	            displayTexts={this.props.displayTexts}
							language={language}
							region={region}
							regionalLevel={regionalLevel}
	          />
	        </div>
	        <div className="timeline">
	          <TimePeriods
	            timePeriods={timePeriods}
	            selectedDataChange={selectedDataChange}
	            timePeriodsLabel={this.props.timePeriodsLabel}
	            selectedOptions={this.props.selectedOptions}
	            displayTexts={this.props.displayTexts}
	            language={language}
	          />
	        </div>
	    </div>
			<div>
					<Indicators
							indicatorCategories={this.props.indicatorCategories}
							selectedDataChange={selectedDataChange}
							selectedOptions={this.props.selectedOptions}
							indicatorSelectionLabel={this.props.indicatorSelectionLabel}
							displayTexts={this.props.displayTexts}
							language={language}
							region={region}
							regionalLevel={regionalLevel}
					/>
			</div>
	</div>
    );
  }
}

export default LeftPanel;
