//import React, { Component } from "react";


class Language {

    setLanguage = ""

    constructor(language) {
        this.setLanguage = language;
        // Create empty object of phrases
        let phrases = {}
        // If English is chosen when Language object is created then populate with English
        if (this.setLanguage === "English") {

            phrases = {
                appName: "Forest Indicator",
                team: "Teemu Halmi, Tapio Paloniemi",
                openApp: "Open App",
                scenarioSelector: "Scenario Selector",
                regionLevel: "Region level",
                region: "Region",
                scenarioCollection: "Scenario collection",
                scenarios: "Scenarios",
                chooseRegionLevel: "Choose region level",
                chooseRegion: "Choose region",
                chooseScenarioCollection: "Choose scenario collection",
                timePeriod: "Time Period",
                chooseTimePeriod: "Choose time period",
                chooseIndicator: "Choose Indicator",
                timberProduction: "Timber production",
                gatherProducts: "Gather products",
                diversity: "Diversity",
                coal: "Coal",
                others: "Others",
                emailAddress: "Address",
                emailSubject: "Subject",
                emailBody: "Text",
                send: "Send",
                information: "Information",
                qualityDescription: "Quality Description", 
                qualityDescriptionText: "Quality Description document will be available here.", 
                underConstructionImage: "images/under_construction2.png", 
                close: "Close",
                here: "here",
                info: "This web application is written using the React library. The source code to this application can be found",
                pdfText: "This PDF was generated by the React Forest Indicator App",
                contact: "Contact",
                help: "Help",
                helpGeneralDescription: "This is quick help information regarding how this application operates. It gives a quick tutorial on how to select and display data.",
                helpRegionLevelTitle: "Selecting a Region Level",
                helpRegionLevelText: "A region level can be selected on the left hand side of the app.",
                helpRegionLevelImage: "images/RegionLevel_EN.png",
                helpRegionTitle: "Selecting a Region",
				helpRegionText: "Select a region which data you want to see.",
				helpRegionImage: "images/Region_EN.png",
				helpScenarioCollectionTitle: "Selecting a Scenario Collection",
                helpScenarioCollectionText: "Select the Scenario Collection you want to use",
                helpScenarioCollectionImage: "images/ScenarioCollection_EN.png",
                helpScenarioTitle: "Selecting a Scenario",
                helpScenarioText: "Select the scenarios you want see. You can select as many as you want. You can add or delete them and the graphs will change accordingly.",
                helpScenarioImage: "images/Scenarios_EN.png",
                helpTimePeriodTitle: "Time Period",
                helpTimePeriodText: "After selecting your desired scenarios you can then pick your time period. If you select multiple time periods they will be presented in their own graphs. You can add or delete them and the graphs will change accordingly.",
                helpTimePeriodImage: "images/TimePeriods_EN.png",
                helpIndicatorsTitle: "Indicators and Graphs",
                helpIndicatorsText: "Select indicators you want to see. You can select as many as you want. You can add or delete them and the graphs will change accordingly.",
                helpIndicatorsImage: "images/Indicators_EN.png",
                helpBarChartTitle: "Bar Charts",
                helpBarChartText: "The selected data is presented in bar chart. You can choose to view horizontal or vertical chart grouped by scenarios or indicators.",
                helpBarChartImage: "images/BarChartScenarios_EN.png",
                helpPolarChartTitle: "Polar Charts",
                helpPolarChartText: "You can view the data in a polar chart grouped by scenarios or indicators.",
                helpPolarChartImage: "images/PolarIndicators_EN.png",
                helpTablesTitle: "Tables",
                helpTablesText: "The information can also be displayed in table form. It gives a break down of the same information, with each indicator being listed as a new row, with each scenarios values displayed in relevant columns.",
                helpTablesImage: "images/Table_EN.png", 
                helpSaveTitle: "Save Information",
                helpSaveText: "Each graph can be saved to a PDF or image, and tables as CSV or image. These files are then downloaded to your computer for future use.",
                helpSaveImage: "images/PrintBarChart_EN.png",
                helpDescriptionsTitle: "Display descriptions",
                helpDescriptionsText: "To see the descriptions of data points, you simply need to hover your mouse over them.",
                helpDescriptionsImage: "images/DescriptionPolar_EN.png",
                chartType: "Chart Type",
                pieChart: "Pie Chart",
                lineChart: "Line Chart",
                columnChart: "Column Chart",
                barChart: "Bar Chart",
                polarChart: "Polar Chart",
                displayAs: "Display as: ",
                graph: "Graph",
                table: "Table",
                viewOnMelatupa: "View on MELATupa",
                MelaTUPAService: "MelaTUPA Service", 
                MetsämittariPortal: "Metsämittari.fi Portal", 
                indicators: "Indicators",
                savePDF: "Save as PDF",
                emailSendInfo: "Pressing the Send button will open your device's default email application and fill it with the text you've written here", 
                serviceDescription: "Biodiversity, ecosystem services and timber production in one figure."
            }
        }
        // If Finnish is chosen when Language is created populate with English
        else if (this.setLanguage === "Finnish") {
            phrases = {
                appName: "Metsämittari",
                team: "Teemu Halmi, Tapio Paloniemi",
                openApp: "Avaa sovellus",
                scenarioSelector: "Skenaarioiden Valinta",
                regionLevel: "Aluetaso",
                region: "Alue",
                scenarioCollection: "Skenaariokokoelma",
                scenarios: "Skenaariot",
                chooseRegionLevel: "Valitse aluetaso",
                chooseRegion: "Valitse alue",
                chooseScenarioCollection: "Valitse skenaariokokoelma",
                timePeriod: "Ajanjakso",
                chooseTimePeriod: "Valitse ajankohta",
                chooseIndicator: "Indikaattoreiden valinta",
                timberProduction: "Puuntuotanto",
                gatherProducts: "Keruutuotteet",
                diversity: "Monimuotoisuus",
                coal: "Hiili",
                others: "Muut",
                emailAddress: "Sähköpostiosoite",
                emailSubject: "Sähköpostin aihe",
                emailBody: "Teksti",
                send: "Lähetä",
                information: "Informaatio",
                qualityDescription: "Laatukuvaus",
                qualityDescriptionText: "Laatukuvausdokumentti tulee saataville tänne.", 
                underConstructionImage: "images/under_construction2.png", 
                close: "Sulje",
                here: "täältä",
                info: "Tämä web-sovellus on kirjoitettu React-kirjastolla. Tämän sovelluksen lähdekoodi löytyy",
                pdfText: "Tämän PDF -tiedoston tuotti React Metsämittari Sovellus",
                contact: "Yhteydenotto",
                help: "Ohje",
                helpGeneralDescription: "Tämä on pikaohje miten sovelluksessa valitaan ja näytetään dataa.",
                helpRegionLevelTitle: "Aluetason valitseminen",
                helpRegionLevelText: "Aluetaso voidaan valita sovelluksen vasemmalta reunalta.",
                helpRegionLevelImage:  "images/RegionLevel_FI.png",
                helpRegionTitle: "Alueen valinta",
				helpRegionText: "Valitse alue, jonka tietoja haluat tarkastella.",
				helpRegionImage: "images/Region_FI.png",
				helpScenarioCollectionTitle: "Skenaarioiden valinta",
                helpScenarioCollectionText: "Valitse skenaariokokoelma, jonka tietoja käytetään.",
                helpScenarioCollectionImage: "images/ScenarioCollection_FI.png",
                helpScenarioTitle: "Skenaarioiden valinta",
                helpScenarioText: "Valitse haluamasi skenaariot. Voit valita niin monta kuin haluat. Voit lisätä ja poistaa skenaarioita, ja kuvaajat päivittyvät valintasi mukaisesti.",
                helpScenarioImage: "images/Scenarios_FI.png",
                helpTimePeriodTitle: "Aikajaksot",
                helpTimePeriodText: "Skenaarioiden valitsemisen jälkeen voit valita halutun aikajakson. Voit valita niin monta kuin haluat. Voit lisätä ja poistaa ajanjaksoja, ja kuvaajat päivittyvät valintasi mukaisesti. Kukin ajanjakso näytetään omassa kuvaajassaan.",
                helpTimePeriodImage: "images/TimePeriods_FI.png",
                helpIndicatorsTitle: "Indikaattorit ja kaaviot",
                helpIndicatorsText: "Valitse haluamasi indikaattorit. Voit valita niin monta kuin haluat. Voit lisätä ja poistaa indikaattoreita, ja kuvaajat päivittyvät valintasi mukaisesti.",
                helpIndicatorsImage: "images/Indicators_FI.png", 
                helpBarChartTitle: "Pylväskaaviot",
                helpBarChartText: "Valitut kohteet näytetään pylväskaaviona. Voit valita vaaka- tai pystysuorat pylväät, ja ryhmittelyn skenaarioittain tai indikaattoreittain.",
                helpBarChartImage: "images/BarChartVerticalScenarios_FI.png",
                helpPolarChartTitle: "Ympyräkaavio",
                helpPolarChartText: "Voit valita vaihtoehtoisesti ympyräkaavion ryhmiteltynä skenaarioittain tai indikaattoreittain.",
                helpPolarChartImage: "images/PolarScenarios_FI.png",
                helpTablesTitle: "Taulukko",
                helpTablesText: "Tiedot voidaan myös näyttää taulukkomuodossa. Indikaattorit ovat riveittäin ja skenaariot ovat sarakkeissa.",
                helpTablesImage: "images/Table_FI.png", 
                helpDescriptionsTitle: "Kuvausten näyttäminen",
                helpDescriptionsText: "Voit nähdä yksittäisen datapisteen tiedot graafeissa siirtämällä osoittimen pylvään päälle.",
                helpDescriptionsImage: "images/DescriptionBar_FI.png",
                helpSaveTitle: "Tallenna kaavioita",
                helpSaveText: "Kaikki kaaviot voidaan tallentaa koneellesi PDF-muodossa ja kuvina, sekä taulukot CSV-tiedostona ja kuvana.",
                helpSaveImage: "images/PrintBarChart_FI.png", 
                chartType: "Kaavion tyyppi: ",
                pieChart: "Ympyrädiagrammi",
                lineChart: "Linjakaavio",
                columnChart: "Pylväskaavio",
                barChart: "Palkkikaavio",
                polarChart: "Polaarinen kaavio",
                displayAs: "Näytä: ",
                graph: "Kaavio",
                table: "Taulukko",
                viewOnMelatupa: "Näytä MelaTUPAssa",
                MelaTUPAService: "MelaTUPA-palvelu", 
                MetsämittariPortal: "Metsämittari.fi-sivusto", 
                indicators: "Indikaattorit",
                savePDF: "Tallenna PDF-muodossa",
                emailSendInfo: "Kun painat Lähetä-nappia, laitteesi sähköpostiapplikaatio avautuu ja se täyttyy kirjoittamallasi tekstillä",
                serviceDescription: "Monimuotoisuus, ekosysteemipalvelut ja puuntuotos yhdessä kuvassa."
            }
        }

        // Return the phrases
        return phrases;
    }
}

export default Language;