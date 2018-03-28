import React, { Component } from "react";

import "./App.scss";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/header/header";
import LeftPanel from "./components/left-panel/LeftPanel";
import ChartContainer from "./components/chart-container/ChartContainer";


import language from './Language';
import AccordionModal from './components/general/AccordionModal/AccordionModal';
import * as FormControlNames from "./components/general/FormControls";

import DataBinding from "./data/DataBinding";

import { getCookie, getCookieName } from "./services/cookie.js";
import { getMelaTupaService } from "./services/utils.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scenarioSelectionLabel: "",

      language: getCookie(getCookieName()),
      languageList: [
        {
          value: 0,
          label: "Suomi"
        },
        {
          value: 1,
          label: "English"
        }
      ],
      languageLabel: "",

      regionalLevel: "",
      regionalLevelList: [],
      regionalLevelLabel: "",

      region: "",
      regionList: [],
      regionLabel: "",

      scenarioCollection: "",
      scenarioCollectionList: [],
      scenarioCollectionListLabel: "",

      scenariosLabel: "",
      scenarios: [],
      timePeriods: [],
      timePeriodsLabel: "",

      indicatorSelectionLabel: "",
      indicatorCategories: [],

      values: [],
      selectedOptions: [],

      feedbackLabel: "",
      guidanceLabel: "", 
      
      //select help text language
      displayTexts: [],
      accordionModal: {
	    showModal: false,
	    hasGroups: false,
	    title: '',
	    data: {}
	  },       
	  onCloseAccordionModalClick: {},
	  onToggleAccordionModalClick: {}
    };

    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleRegionalLevelChange = this.handleRegionalLevelChange.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleScenarioCollectionChange = this.handleScenarioCollectionChange.bind(this);

    this.handleSelectedDataChange = this.handleSelectedDataChange.bind(this);
    this.onCloseAccordionModalClick = this.onCloseAccordionModalClick.bind(this);
    this.onToggleAccordionModalClick = this.onToggleAccordionModalClick.bind(this);
    console.log("App constructor language: ", this.state.language);
	this.loadDisplayTexts(this.state.language);
  }

// Load help texts 
  loadDisplayTexts(displayLanguage) {
	  console.log("App loadDisplayTexts language: ", displayLanguage);
	if (displayLanguage === 1) { //English
	    this.displayTexts = new language("English");
	} else {//Finnish		
		this.displayTexts = new language("Finnish");
	}
  }
  
  onCloseAccordionModalClick() {
    let { accordionModal } = this.state.accordionModal;
    accordionModal.showModal = false
    this.setState({ accordionModal })
  }
  
  onToggleAccordionModalClick(event) {
	console.log("Home: onToggleAccordionModalClick, props: ", this.props);
    //const { regionLevels, scenarios, indicatorCategories, translate } = this.props
    let { accordionModal } = this.state.accordionModal
	console.log("Home onToggleAccordionModalClick state: ", this.state);
	console.log("Home onToggleAccordionModalClick accordionModal: ", {accordionModal});
    switch (event.target.name) {
      case (FormControlNames.REGION_LEVEL):
        this.state.accordionModal.data = this.state.regionalLevelList;
        this.state.accordionModal.title = this.state.regionalLevelLabel;
        this.state.accordionModal.hasGroups = false
        console.log("Home accordion region_level, regionLevels: ", this.state.regionalLevelList);
        break
      case (FormControlNames.SCENARIO_COLLECTION):
        this.state.accordionModal.data = this.state.scenarioCollectionList;
        this.state.accordionModal.title = this.state.scenarioCollectionLabel;
        this.state.accordionModal.hasGroups = false
        console.log("Home accordion scenario_collection, scenarioCollections: ", this.state.scenarioCollectionList);
        break
      case (FormControlNames.SCENARIOS):
        this.state.accordionModal.data = this.state.scenarios;
        this.state.accordionModal.title = this.state.scenariosLabel;
        this.state.accordionModal.hasGroups = false
        console.log("Home accordion scenarios, scenarios: ", this.state.scenarios);
        break
      case (FormControlNames.INDICATORS):
        this.state.accordionModal.data = this.state.indicatorCategories;
        this.state.accordionModal.title = this.state.indicatorSelectionLabel;//????
        this.state.accordionModal.hasGroups = true
        console.log("Home accordion indicators, indicatorCategories: ", this.state.indicatorCategories);
        break
    }
    this.state.accordionModal.showModal = !this.state.accordionModal.showModal
	console.log("Home onToggleAccordionModalClick, accordionModal: ", this.state.accordionModal);
    this.setState({ accordionModal })
    console.log("Home onToggleAccordionModalClick, state after: ", this.state);
  }

  /*	
  // Get scenario collections from chosen region
  get scenarioCollections () {
    if (
      !this.props.regions ||
      !this.props.selectedValues[FormControlNames.REGION]) {
      return null
    }

    let chosenRegion = _.find(
      this.props.regions,
      r => (r.id) === this.props.selectedValues[FormControlNames.REGION]
    )
    return chosenRegion ? chosenRegion.scenarioCollections : null
  }
*/
  
  get accordionModal () {
	  console.log("Home accordionModal() accordionModal: ", this.state.accordionModal);
    return (
      	<AccordionModal
	        accordionModal={this.state.accordionModal}
	        onToggleAccordionModalClick={this.onToggleAccordionModalClick}
	        onCloseAccordionModalClick={this.onCloseAccordionModalClick} 
		/>
    )
  }

    
  handleLanguageChange(language) {
    // console.log("language change");
    this.setState({
      language: language.value
    });
    this.getAllTheLabel();
    this.getAllTheData(false);
    this.loadDisplayTexts(language.value);
    // console.log("after", this.state.selectedOptions);
  }

  handleRegionalLevelChange(regionalLevel) {
    let regionList = [];
    DataBinding.bindRegionData(regionalLevel).then(result => {
      result.map(region => {
        regionList.push({
          value: region.id,
          label: region.name,
          ...region
        });
      });

      let scenarioCollectionList = DataBinding.bindScenarioCollectionsData(
        regionList[0]
      );
      console.log(`regionList ${Object.entries(regionList[0])}`);
      console.log(`scenarioCollection ${Object.entries(scenarioCollectionList[0])}`);
      DataBinding.bindChartData(scenarioCollectionList[0], regionList[0]).then(
        result => {
          this.setState({
            regionalLevel: regionalLevel,
            regionList: regionList,
            region: regionList[0],
            scenarioCollectionList: scenarioCollectionList,
            scenarioCollection: scenarioCollectionList[0],
            scenarios: result.scenarios,
            indicatorCategories: result.indicatorCategories,
            timePeriods: result.timePeriods,
            values: result.values
          });
          this.setState({ selectedOptions: this.getDefaultSelectedOptions() });
        }
      );
    });
  }

  handleRegionChange(value) {
    if (value !== "") {
      let scenarioCollectionList = DataBinding.bindScenarioCollectionsData(
        value
      );

      DataBinding.bindChartData(scenarioCollectionList[0], value).then(
        result => {
          this.setState({
            region: value,
            scenarioCollection: scenarioCollectionList[0],
            scenarioCollectionList: scenarioCollectionList,

            scenarios: result.scenarios,
            timePeriods: result.timePeriods,
            indicatorCategories: result.indicatorCategories,
            values: result.values
          });
          this.setState({ selectedOptions: this.getDefaultSelectedOptions() });
        }
      );
    }
    // console.log(this.state.selectedOptions);
  }

  handleScenarioCollectionChange(value) {
    DataBinding.bindChartData(value, this.state.region).then(result => {
      //  console.log(result.indicatorCategories);
      this.setState({
        scenarioCollection: value,
        scenarios: result.scenarios,
        indicatorCategories: result.indicatorCategories,
        timePeriods: result.timePeriods,
        values: result.values
      });
      this.setState({ selectedOptions: this.getDefaultSelectedOptions() });
    });
  }

  getDefaultSelectedOptions() {
    let list = [];
    list.push({
      dataType: "scenario",
      name: this.state.scenarios[0].name,
      id: this.state.scenarios[0].id.toString()
    });

    list.push({
      dataType: "timePeriod",
      name:
        this.state.timePeriods[0].yearStart +
        " - " +
        this.state.timePeriods[0].yearEnd,
      id: this.state.timePeriods[0].id.toString()
    });

    this.state.indicatorCategories.map(cat => {
      if (cat.isMandatory.toString() === "1") {
        cat.indicators.map((indicator, index) => {
          // console.log(indicator);
          if (index === 0) {
            list.push({
              dataType: "indicator",
              name: indicator.name,
              id: indicator.id.toString()
            });
          }
        });
      }
    });
    // console.log("the list", list);
    return list;
  }

  handleSelectedDataChange(value) {
    // let check = true;
    if ( value === "" || value === null || value === undefined ) {
      console.log("Value empty.");
      return;
    }

    let position = this.state.selectedOptions.findIndex( (element) => {
      return element.id === value.id && element.dataType === value.dataType
    });

    if ( position === -1 ) {
      this.state.selectedOptions.push(value);
      this.setState({
        selectedOptions: this.state.selectedOptions
        });
    }
    else {
      this.state.selectedOptions.splice(position, 1);
      this.setState({
        selectedOptions: this.state.selectedOptions
      });
    }

    console.log("Success.");
    return;

  }

  getAllTheData(isFirst) {
    DataBinding.bindRegionalLevelData().then(result => {
      let regionalLevelList = [];
      result.map(element => {
        regionalLevelList.push({
          value: element.id,
          label: element.name,
          ...element
        });
      });

      let regionList = [];
      DataBinding.bindRegionData(regionalLevelList[0]).then(result => {
        result.map(region => {
          regionList.push({
            value: region.id,
            label: region.name,
            ...region
          });
        });

        let scenarioCollectionList = DataBinding.bindScenarioCollectionsData(
          regionList[0]
        );

        DataBinding.bindChartData(
          scenarioCollectionList[0],
          regionList[0]
        ).then(result => {
	        //console.log("bindChartData result: ", result);
          if (isFirst === true) {
            this.setState({
              regionalLevelList: regionalLevelList,
              regionalLevel: regionalLevelList[0],
              regionList: regionList,
              region: regionList[0],
              scenarioCollectionList: scenarioCollectionList,
              scenarioCollection: scenarioCollectionList[0],
              scenarios: result.scenarios,
              indicatorCategories: result.indicatorCategories,
              timePeriods: result.timePeriods,
              values: result.values
            });
            this.setState({
              selectedOptions: this.getDefaultSelectedOptions()
            });
          } else {
            this.setState({
              selectedOptions: this.getDefaultSelectedOptions()
            });

            //console.log("after", this.state.selectedOptions);
            this.setState({
              regionalLevelList: regionalLevelList,
              regionalLevel: regionalLevelList[0],
              regionList: regionList,
              region: regionList[0],
              scenarioCollectionList: scenarioCollectionList,
              scenarioCollection: scenarioCollectionList[0],
              scenarios: result.scenarios,
              indicatorCategories: result.indicatorCategories,
              timePeriods: result.timePeriods,
              values: result.values
            });
          }
        });
      });
    });
    this.setState({
	    onToggleAccordionModalClick: this.onToggleAccordionModalClick,
	    onCloseAccordionModalClick: this.onCloseAccordionModalClick
    });
  }

  getAllTheLabel() {
    let cookie = getCookie(getCookieName());
    if (cookie === "1") {
      this.setState({
        scenarioSelectionLabel: "Scenario Selection",
        languageLabel: "Language",
        regionalLevelLabel: "Regional Level",
        regionLabel: "Region",
        scenarioCollectionListLabel: "Scenario Collection",
        scenariosLabel: "Scenarios",
        timePeriodsLabel: "Time Periods",
        indicatorSelectionLabel: "Indicator Categories",
        feedbackLabel: "Give feedback",
        guidanceLabel: "Help"
      });
    } else {
      this.setState({
        scenarioSelectionLabel: "Skenaarioiden valinta",
        languageLabel: "Kieli",
        regionalLevelLabel: "Aluetaso",
        regionLabel: "Alue",
        scenarioCollectionListLabel: "Skenaariokokoelma",
        scenariosLabel: "Skenaariot",
        timePeriodsLabel: "Ajankohta",
        indicatorSelectionLabel: "Indikaattoreiden valinta",
        feedbackLabel: "Anna palautetta",
        guidanceLabel: "Ohje"
      });
    }
  }

  componentDidMount() {
    this.getAllTheLabel();
    this.getAllTheData(true);
    this.loadDisplayTexts(this.state.language);
  }

  render() {
    console.log("Home render state: ", this.state);
    console.log("Home render, onToggleAccordionModalClick: ", this.state.onToggleAccordionModalClick);
    return (
      <div className="container-fluid App">
        <Header 
        	language={this.state.language}
            languageList={this.state.languageList}
            handleLanguageChange={this.handleLanguageChange}
        	displayTexts={this.displayTexts} />

        <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
          <LeftPanel
            language={this.state.language}
            languageList={this.state.languageList}
            handleLanguageChange={this.handleLanguageChange}
            regionalLevelList={this.state.regionalLevelList}
            regionalLevel={this.state.regionalLevel}
            handleRegionalLevelChange={this.handleRegionalLevelChange}
            region={this.state.region}
            regionList={this.state.regionList}
            handleRegionChange={this.handleRegionChange}
            scenarioCollection={this.state.scenarioCollection}
            scenarioCollectionList={this.state.scenarioCollectionList}
            handleScenarioCollectionChange={this.handleScenarioCollectionChange}
            scenarios={this.state.scenarios}
            timePeriods={this.state.timePeriods}
            handleSelectedDataChange={this.handleSelectedDataChange}
            selectedOptions={this.state.selectedOptions}
            scenarioSelectionLabel={this.state.scenarioSelectionLabel}
            languageLabel={this.state.languageLabel}
            regionalLevelLabel={this.state.regionalLevelLabel}
            regionLabel={this.state.regionLabel}
            scenarioCollectionListLabel={this.state.scenarioCollectionListLabel}
            scenariosLabel={this.state.scenariosLabel}
            timePeriodsLabel={this.state.timePeriodsLabel}
            indicatorCategories={this.state.indicatorCategories}
            selectedDataChange={this.handleSelectedDataChange}
            indicatorSelectionLabel={this.state.indicatorSelectionLabel}
            displayTexts={this.displayTexts}
            onToggleAccordionModalClick={this.onToggleAccordionModalClick}
            onCloseAccordionModalClick={this.onCloseAccordionModalClick}           
          />

        </div>

        <div className="col-lg-10 col-md-9 col-sm-8 col-xs-6">
			<ChartContainer
			valueData={this.state.values}
			options={this.state.selectedOptions}
			scenarios={this.state.scenarios}
			regionalLevel={this.state.regionalLevel}
			region={this.state.region}
			/>
	        <div className="services text-center content-panel shadow-1">
	            <a
	              href={getMelaTupaService(
	                this.state.selectedOptions,
	                this.state.region,
	                this.state.scenarioCollection,
	                this.state.language
	              )}
	            >
	              <h4>{this.displayTexts.MelaTUPAService}</h4>
	            </a>
	            <a href="mailto:metsamittari@luke.fi?Subject=Feedback%20about%20service">
	              <h4>{this.state.feedbackLabel}</h4>
	            </a>

          </div>
        </div>
		{this.accordionModal}
      </div>
    );
  }
}

export default App;
