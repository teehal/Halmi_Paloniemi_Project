import React, { Component } from "react";

import "./App.scss";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/header/header";
import RightPanel from "./components/right-panel/RightPanel";
import LeftPanel from "./components/left-panel/LeftPanel";
import ChartContainer from "./components/chart-container/ChartContainer";
import Modal from "./components/general/Modal.js";

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
    let cookie = getCookie(getCookieName());
// 	console.log("construtctor state: ", this.state);
	this.loadDisplayTexts(this.state.language);
  }

// Load help texts 
  loadDisplayTexts(displayLanguage) {
//  	  console.log("loadDisplayTexts, language: ", displayLanguage);
	if (displayLanguage == 1) { //English
	    this.displayTexts = new language("English");
//  	    console.log("load English");
	} else {//Finnish		
		this.displayTexts = new language("Finnish");
//  		console.log("load Finnish");
	}
  }
  
  handleLanguageChange(language) {
    // console.log("language change");
    this.setState({
      language: language.value
    });

    // console.log(this.state);
    this.getAllTheLabel();
    this.getAllTheData(false);
//      console.log("language: ", language, "language.value: ", language.value, "state.language: ", this.state.language);
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
    let check = true;

    if (value !== "") {
      //  only choose 1 option in time period, the function of time period is similar to radio box
      if (value.dataType === "timePeriod") {
        let newArr = this.state.selectedOptions.filter(function(element) {
          return element.dataType === "timePeriod";
        });

        // if (newArr.length === 0 || true) {
        let position = this.state.selectedOptions.findIndex( (element) => {
          return element.id === value.id && element.dataType === value.dataType
        });

        if ( position === -1 ) {
          this.state.selectedOptions.push(value);
          this.setState({
            selectedOptions: this.state.selectedOptions
            });
        }
        else if (newArr.length > 1) {
          this.state.selectedOptions.splice(position, 1);
          this.setState({
            selectedOptions: this.state.selectedOptions
          });
        }
        check = false;
      } else {
        //  Only for scenarios and indicators
        let position = this.state.selectedOptions.findIndex(
          element =>
            element.dataType === value.dataType && element.id === value.id
        );

         if (position === -1 || position === "undefined") {
          //  check for number of allowances
          // let numOfScenarios = this.state.selectedOptions.filter(function(e) {
          //   return e.dataType === "scenario";
          // }).length;

          // let numOfIndicators = this.state.selectedOptions.filter(function(e) {
          //   return e.dataType === "indicator";
          // }).length;

          // if (numOfScenarios * (numOfIndicators + 1) <= 20) {
            this.state.selectedOptions.push(value);
            this.setState({
              selectedOptions: this.state.selectedOptions
            });
          // } else {
          //   check = false;
          // }
        } else {
          //  Check for mandatory
          if (value.dataType === "indicator") {
            let indicatorSelected = this.state.selectedOptions.filter(function(
              element
            ) {
              return element.dataType === "indicator";
            });
            this.state.indicatorCategories.map(element => {
              if (element.isMandatory === 1) {
                let count = 0;
                element.indicators.map(indicator => {
                  indicatorSelected.map(s => {
                    if (s.id.toString() === indicator.id.toString()) {
                      count++;
                    }
                  });
                });

                // console.log(count);

                if (count > 1) {
                  this.state.selectedOptions.splice(position, 1);
                  // console.log("before:",this.state.selectedOptions);
                  this.setState({
                    selectedOptions: this.state.selectedOptions
                  });
                  // console.log("after:",this.state.selectedOptions);
                  check = false;
                }
              }
            });
          } else {
            //  number of allowances of scenarios is 1 minimum
            let numOfScenarios = this.state.selectedOptions.filter(function(e) {
              return e.dataType === "scenario";
            }).length;
            //  console.log(numOfScenarios);
            if (numOfScenarios > 1) {
              this.state.selectedOptions.splice(position, 1);
              this.setState({
                selectedOptions: this.state.selectedOptions
              });
              check = false;
            }
          }
        }
      }
    }
    // console.log("fuc");

    return check;
  }

  getAllTheData(isFirst) {
    //  console.log(this.state.language);
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
    // console.log(this.state);
    return (
      <div className="container-fluid App">
        <Header 
        	language={this.state.language}
            languageList={this.state.languageList}
            handleLanguageChange={this.handleLanguageChange}
        	displayTexts={this.displayTexts} />

        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
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
            displayTexts={this.displayTexts}
          />
          <RightPanel
            indicatorCategories={this.state.indicatorCategories}
            handleSelectedDataChange={this.handleSelectedDataChange}
            indicatorSelectionLabel={this.state.indicatorSelectionLabel}
            selectedOptions={this.state.selectedOptions}
            displayTexts={this.displayTexts}
          />
        </div>

        <div className="col-lg-9 col-md-9 col-sm-8 col-xs-6">
          <ChartContainer
            valueData={this.state.values}
            options={this.state.selectedOptions}
            scenarios={this.state.scenarios}
            regionalLevel={this.state.regionalLevel}
            region={this.state.region}
          />
	        <div className="services text-center content-panel shadow-1">
	            <a href="http://Metsämittari.fi">
	              <h4>{this.displayTexts.MetsämittariPortal}</h4>
	            </a>
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
 	            {/*<Modal displayTexts={this.displayTexts} />*/}
	            <a href="mailto:metsamittari@luke.fi?Subject=Feedback%20about%20service">
	              <h4>{this.state.feedbackLabel}</h4>
	            </a>
	        </div>
        </div>

         {/*<div className="col-lg-2">
          <RightPanel
            indicatorCategories={this.state.indicatorCategories}
            handleSelectedDataChange={this.handleSelectedDataChange}
            indicatorSelectionLabel={this.state.indicatorSelectionLabel}
            selectedOptions={this.state.selectedOptions}
          /> 
        </div>*/}
      </div>
    );
  }
}

export default App;
