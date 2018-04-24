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
	    close: '',
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
    this.updateSelectedOptions = this.updateSelectedOptions.bind(this);
        this.onCloseAccordionModalClick = this.onCloseAccordionModalClick.bind(this);
    this.onToggleAccordionModalClick = this.onToggleAccordionModalClick.bind(this);
	this.loadDisplayTexts(this.state.language);
  }

// Load help texts 
  loadDisplayTexts(displayLanguage) {
	  
  if (displayLanguage === 1 || displayLanguage === "1") { //English
      this.setState({
        displayTexts: new language("English")
      });
	   // this.state.displayTexts = new language("English");
  } else {//Finnish
      this.setState({
        displayTexts: new language("Finnish")
      });
		 // this.state.displayTexts = new language("Finnish");
	}
  }
  
  onCloseAccordionModalClick() {
    let accordionModal = this.state.accordionModal;
    accordionModal.showModal = false
    this.setState({ accordionModal })
  }
  
  onToggleAccordionModalClick(event) {
    let accordionModal  = this.state.accordionModal;
    switch (event.target.name) {
      case (FormControlNames.REGION_LEVEL):
        accordionModal.data = this.state.regionalLevelList;
        accordionModal.title = this.state.regionalLevelLabel;
        accordionModal.hasGroups = false
        break
		case (FormControlNames.REGION):
        accordionModal.data = this.state.regionList;
        accordionModal.title = this.state.regionLabel;
        accordionModal.hasGroups = false
        break
      case (FormControlNames.SCENARIO_COLLECTION):
        accordionModal.data = this.state.scenarioCollectionList;
        accordionModal.title = this.state.scenarioCollectionLabel;
        accordionModal.hasGroups = false
        break
      case (FormControlNames.SCENARIOS):
        accordionModal.data = this.state.scenarios;
        accordionModal.title = this.state.scenariosLabel;
        accordionModal.hasGroups = false
        break
       case (FormControlNames.TIME_PERIOD):
        accordionModal.data = this.state.timePeriods;
        accordionModal.title = this.state.timePeriodsLabel;
        accordionModal.hasGroups = false
        break
      case (FormControlNames.INDICATORS):
        accordionModal.data = this.state.indicatorCategories;
        accordionModal.title = this.state.indicatorSelectionLabel;
        accordionModal.hasGroups = true
        break
       default:
    }
    accordionModal.close = this.state.displayTexts.close;
    accordionModal.showModal = !this.state.accordionModal.showModal
    this.setState({ accordionModal })
  }
  
  get accordionModal () {
    return (
      	<AccordionModal
	        accordionModal={this.state.accordionModal}
	        onToggleAccordionModalClick={this.onToggleAccordionModalClick}
	        onCloseAccordionModalClick={this.onCloseAccordionModalClick} 
		/>
    )
  }

    
  handleLanguageChange(language) {
    this.setState({
      language: language.value,
      languageHasChanged: true
    });
    this.getAllTheLabel();
    this.languageData();
	  //this.getAllTheData(false);
    this.loadDisplayTexts(language.value);
  }
  
  languageData() {
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
      let position = regionalLevelList.findIndex( (item) => {
        return this.state.regionalLevel.id === item.id
      });
      DataBinding.bindRegionData(regionalLevelList[position]).then(result => {
        result.map(region => {
          regionList.push({
            value: region.id,
            label: region.name,
            ...region
          });
        });

        let regionPosition = regionList.findIndex( (item) => {
          return this.state.region.id === item.id
        });
        let scenarioCollectionList = DataBinding.bindScenarioCollectionsData(
          regionList[regionPosition]
        );
        let scenarioPosition = scenarioCollectionList.findIndex( (item) => {
          return this.state.scenarioCollection.id === item.id
        });
        DataBinding.bindChartData(
          scenarioCollectionList[scenarioPosition],
          regionList[regionPosition]
        ).then(result => {
          let regionIndex = regionList.findIndex( (item) => {
            return this.state.region.id === item.id
          });

          let regionalIndex = regionalLevelList.findIndex( (item) => {
            return this.state.regionalLevel.id === item.id
          });

          let scenarioCollectionIndex = scenarioCollectionList.findIndex ( (item) => {
            return this.state.scenarioCollection.id === item.id
          });

          this.setState({
            languageHasChanged: false,
            regionalLevelList: regionalLevelList,
            region: regionList[regionIndex],
            regionalLevel: regionalLevelList[regionalIndex],
            regionList: regionList,
            scenarioCollection: scenarioCollectionList[scenarioCollectionIndex],
            scenarioCollectionList: scenarioCollectionList,
            scenarios: result.scenarios,
            indicatorCategories: result.indicatorCategories,
            timePeriods: result.timePeriods,
            values: result.values
          });
        });
      });
    });
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
      return true;
      });

      let scenarioCollectionList = DataBinding.bindScenarioCollectionsData(
        regionList[0]
      );

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
    return true;
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
  }

  handleScenarioCollectionChange(value) {
    DataBinding.bindChartData(value, this.state.region).then(result => {
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
           if (index === 0) {
            list.push({
              dataType: "indicator",
              name: indicator.name,
              id: indicator.id.toString(),
              absVar: indicator.absVar
            });
          }
        return true;
        });
      }
    return true;
    });

    list.push({
      dataType: "regionalLevel",
      name: this.state.regionalLevel.name,
      id: this.state.regionalLevel.id
    });

    list.push({
      dataType: "region",
      name: this.state.region.name,
      id: this.state.region.id
    });

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
      return true;
      });

      let regionList = [];
      DataBinding.bindRegionData(regionalLevelList[0]).then(result => {
        result.map(region => {
          regionList.push({
            value: region.id,
            label: region.name,
            ...region
          });
        return true;
        });

        let scenarioCollectionList = DataBinding.bindScenarioCollectionsData(
          regionList[0]
        );

        DataBinding.bindChartData(
          scenarioCollectionList[0],
          regionList[0]
        ).then(result => {
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
      return true;
      });
    return true;
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
        barChartLabel: "Horizontal bar chart",
        barTypeLabel: "Horizontal",
        columnChartLabel: "Vertical bar chart",
        columnTypeLabel: "Vertical",
        feedbackLabel: "Give feedback",
        graphByScenariosLabel: "Scenarios as separate charts",
        graphByYearLabel: "Periods as separate charts",
        groupByIndicatorsLabel: "Group by indicators",
        groupByScenariosLabel: "Group by scenarios",
        groupByTimeperiodsLabel: "Group by periods",
        guidanceLabel: "Help",
        indicatorSelectionLabel: "Indicator Categories",
        indicatorsLabel: "Indicators",
        isMandatoryAlertLabel: "This selection cannot be empty.",
        languageLabel: "Language",
        polarChartLabel: "Polar chart",
        print: "Print",
        regionalLevelLabel: "Regional Level",
        regionLabel: "Region",
        saveAsCSV: "Save as CSV",
        saveAsJPEG: "Save as JPG",
        saveAsPNG: "Save as PNG",
        saveAsSVG: "Save as SVG",
        scenarioCollectionListLabel: "Scenario Collection",
        scenarioSelectionLabel: "Scenario Selection",
        scenariosLabel: "Scenarios",
        tableChartLabel: "Table chart",
        timePeriodsLabel: "Period",
        valuesLabel: "Relative value"
      });
    } else {
      this.setState({
        barChartLabel: "Palkkikaavio",
        barTypeLabel: "Palkit vaakasuoraan",
        columnChartLabel: "Pylväskaavio",
        columnTypeLabel: "Palkit pystysuoraan",
        feedbackLabel: "Anna palautetta",
        graphByScenariosLabel: "Skenaariot erillisinä kaavioina",
        graphByYearLabel: "Kaudet erillisinä kaavioina",
        groupByIndicatorsLabel: "Ryhmittele indikaattoreiden mukaan",
        groupByScenariosLabel: "Ryhmittele skenaarioittain",
        groupByTimeperiodsLabel: "Ryhmittele kausittain",
        guidanceLabel: "Ohje",
        indicatorSelectionLabel: "Indikaattoreiden valinta",
        indicatorsLabel: "Indikaattorit",
        isMandatoryAlertLabel: "Tämä valinta ei voi olla tyhjä.",
        languageLabel: "Kieli",
        polarChartLabel: "Ympyräkaavio",
        print: "Tulosta",
        regionalLevelLabel: "Aluetaso",
        regionLabel: "Alue",
        saveAsCSV: "Tallenna CSV",
        saveAsJPEG: "Tallenna JPG",
        saveAsPNG: "Tallenna PNG",
        saveAsSVG: "Tallenna SVG",
        scenarioCollectionListLabel: "Skenaariokokoelma",
        scenarioSelectionLabel: "Skenaarioiden valinta",
        scenariosLabel: "Skenaariot",
        tableChartLabel: "Taulukko",
        timePeriodsLabel: "Kausi",
        valuesLabel: "Suhteellinen arvo"
      });
    }
  }

  componentDidMount() {
    this.getAllTheLabel();
    this.getAllTheData(true);
    this.loadDisplayTexts(this.state.language);
  }

  updateSelectedOptions(valueArray, datatype) {
    let tempSelected = this.state.selectedOptions.slice();

    valueArray.forEach( (item) => {
      let position = tempSelected.findIndex( (element) => {
        return item.value.toString() === element.id.toString() && datatype === element.dataType
      });

      tempSelected[position].name = item.label;
    });
    this.setState({
      selectedOptions: tempSelected
    });
  }

  render() {
    return (
      <div className="container-fluid App">
        <Header
          displayTexts={this.state.displayTexts}
          handleLanguageChange={this.handleLanguageChange} 
        	language={this.state.language}
          languageList={this.state.languageList}
        />

        <div className="col-lg-2 col-md-4 col-sm-4 col-xs-6">
          <LeftPanel
            displayTexts={this.state.displayTexts}
            handleLanguageChange={this.handleLanguageChange}
            handleRegionalLevelChange={this.handleRegionalLevelChange}
            handleRegionChange={this.handleRegionChange}
            handleScenarioCollectionChange={this.handleScenarioCollectionChange}
            handleSelectedDataChange={this.handleSelectedDataChange}
            indicatorCategories={this.state.indicatorCategories}
            indicatorSelectionLabel={this.state.indicatorSelectionLabel}
            isMandatoryAlertLabel = {this.state.isMandatoryAlertLabel}
            languageLabel={this.state.languageLabel}
            languageList={this.state.languageList}
            language={this.state.language}
            onCloseAccordionModalClick={this.onCloseAccordionModalClick}
            onToggleAccordionModalClick={this.onToggleAccordionModalClick}
            regionalLevelLabel={this.state.regionalLevelLabel}
            regionalLevelList={this.state.regionalLevelList}
            regionalLevel={this.state.regionalLevel}
            regionLabel={this.state.regionLabel}
            regionList={this.state.regionList}
            region={this.state.region}
            scenarioCollectionListLabel={this.state.scenarioCollectionListLabel}
            scenarioCollectionList={this.state.scenarioCollectionList}
            scenarioCollection={this.state.scenarioCollection}
            scenarioSelectionLabel={this.state.scenarioSelectionLabel}
            scenariosLabel={this.state.scenariosLabel}
            scenarios={this.state.scenarios}
            selectedDataChange={this.handleSelectedDataChange}
            selectedOptions={this.state.selectedOptions}
            timePeriodsLabel={this.state.timePeriodsLabel}
            timePeriods={this.state.timePeriods}
            updateSelectedOptions = {this.updateSelectedOptions}
          />

        </div>

        <div className="col-lg-10 col-md-8 col-sm-8 col-xs-6">
			<ChartContainer
        barChartLabel = {this.state.barChartLabel}
        barTypeLabel = {this.state.barTypeLabel}
        columnChartLabel = {this.state.columnChartLabel}
        columnTypeLabel = {this.state.columnTypeLabel}
        graphByScenariosLabel = {this.state.graphByScenariosLabel}
        graphByYearLabel = {this.state.graphByYearLabel}
        groupByIndicatorsLabel = {this.state.groupByIndicatorsLabel}
        groupByScenariosLabel = {this.state.groupByScenariosLabel}
        groupByTimeperiodsLabel = {this.state.groupByTimeperiodsLabel}
        indicatorsLabel = {this.state.indicatorsLabel}
        options={this.state.selectedOptions}
        polarChartLabel = {this.state.polarChartLabel}
        print = {this.state.print}
        regionalLevel={this.state.regionalLevel}
        region={this.state.region}
        saveAsCSV = {this.state.saveAsCSV}
        saveAsJPEG = {this.state.saveAsJPEG}
        saveAsPNG = {this.state.saveAsPNG}
        saveAsSVG = {this.state.saveAsSVG}
        scenariosLabel = {this.state.scenariosLabel}
        scenarios={this.state.scenarios}
        tableChartLabel = {this.state.tableChartLabel}
        timePeriodsLabel = {this.state.timePeriodsLabel}
        valueData={this.state.values}
        valuesLabel = {this.state.valuesLabel}
			/>
	        <div className="services text-center content-panel shadow-1">
	            <a
                target="_blank"
	              href={getMelaTupaService(
	                this.state.selectedOptions,
	                this.state.region,
	                this.state.scenarioCollection,
	                this.state.language
	              )}
	            >
	              <h4>{this.state.displayTexts.MelaTUPAService}</h4>
	            </a>
	            <a href="mailto:metsamittari@luke.fi?Subject=Feedback%20about%20service">
	              <h4>{this.state.feedbackLabel}</h4>
	            </a>				
				
          </div>
          <div className="partnerlogos">	          
			<img src="images/logot.png" alt="" className="logo" />
		</div>
        </div>
        <div className="accordionModal">
			{this.accordionModal}
		</div>
      </div>
    );
  }
}

export default App;
