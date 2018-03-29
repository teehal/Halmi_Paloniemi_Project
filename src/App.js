import React, { Component } from "react";

import "./App.scss";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/header/header";
import LeftPanel from "./components/left-panel/LeftPanel";
import ChartContainer from "./components/chart-container/ChartContainer";
//import Modal from "./components/general/Modal.js";

import language from './Language';

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
      viewHistory:[]
      
    };

    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleRegionalLevelChange = this.handleRegionalLevelChange.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleScenarioCollectionChange = this.handleScenarioCollectionChange.bind(this);

    this.handleSelectedDataChange = this.handleSelectedDataChange.bind(this);
    this.updateSelectedOptions = this.updateSelectedOptions.bind(this);
    //let cookie = getCookie(getCookieName());
// 	console.log("construtctor state: ", this.state);
	this.loadDisplayTexts(this.state.language);
  }

// Load help texts 
  loadDisplayTexts(displayLanguage) {
	if (displayLanguage === 1) { //English
	    this.displayTexts = new language("English");
	} else {//Finnish		
		this.displayTexts = new language("Finnish");
	}
  }
  
  handleLanguageChange(language) {
    // console.log("language change");
    this.setState({
      language: language.value,
      languageHasChanged: true
    });
    this.getAllTheLabel();
    this.languageData();
    this.loadDisplayTexts(language.value);
    // console.log("after", this.state.selectedOptions);
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
     console.log("the list", list);
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
	        console.log("bindChartData result: ", result);
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

            console.log("after", this.state.selectedOptions);
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
        guidanceLabel: "Help",
        barChartLabel: "Bar chart",
        tableChartLabel: "Table chart",
        polarChartLabel: "Polar chart",
        groupByScenariosLabel: "Group by scenarios",
        groupByIndicatorsLabel: "Group by indicators",
        columnTypeLabel: "Vertical",
        barTypeLabel: "Horizontal"
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
        guidanceLabel: "Ohje",
        barChartLabel: "Pylväskaavio",
        tableChartLabel: "Taulukko",
        polarChartLabel: "Ympyräkaavio",
        groupByScenariosLabel: "Ryhmittele skenaarioittain",
        groupByIndicatorsLabel: "Ryhmittele indikaattoreiden mukaan",
        columnTypeLabel: "Palkit pystysuoraan",
        barTypeLabel: "Palkit vaakasuoraan"
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
    // console.log(this.state);
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
            updateSelectedOptions = {this.updateSelectedOptions}
          />

        </div>

        <div className="col-lg-10 col-md-9 col-sm-8 col-xs-6">
			<ChartContainer
        valueData={this.state.values}
        options={this.state.selectedOptions}
        scenarios={this.state.scenarios}
        regionalLevel={this.state.regionalLevel}
        region={this.state.region}
        barChartLabel = {this.state.barChartLabel}
        tableChartLabel = {this.state.tableChartLabel}
        polarChartLabel = {this.state.polarChartLabel}
        groupByScenariosLabel = {this.state.groupByScenariosLabel}
        groupByIndicatorsLabel = {this.state.groupByIndicatorsLabel}
        columnTypeLabel = {this.state.columnTypeLabel}
        barTypeLabel = {this.state.barTypeLabel}
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

      </div>
    );
  }
}

export default App;
