function dataForGraphs(groupBy, data, scenariosOrTimeperiods, indicators) {
    let xCategories = [];
    let ySeries = [];
    let tempYSeries = [];
    let groupingBy = groupBy === "scenario" ? scenariosOrTimeperiods : 
      ( groupBy === "indicator" ? indicators : scenariosOrTimeperiods);
    let grouped = groupBy === "scenario" ? indicators : 
      (groupBy === "timePeriod" ? indicators : scenariosOrTimeperiods);

    data.forEach( (item) => {
      groupingBy.forEach(first_item => {
        let first_itemId = first_item.id;

        if ( xCategories.indexOf(first_item.name) === -1 )
           xCategories.push(first_item.name);

          grouped.forEach(second_item => {
            let data = [];
            if (item.dataType === "timePeriod") {
              if (groupBy === "scenario") {
                data = item.data.filter(function(e) {
                  return (
                    e.scenarioId.toString() === first_itemId.toString() &&
                    e.indicatorId.toString() === second_item.id.toString()
                  );
                });
              } else {
                data = item.data.filter(function(e) {
                  return (
                    e.indicatorId.toString() === first_itemId.toString() &&
                    e.scenarioId.toString() === second_item.id.toString()
                  );
                });
              }
            } else {
              if (groupBy === "indicator") {
                data = item.data.filter(function(e) {
                  return (
                    e.indicatorId.toString() === first_itemId.toString() &&
                    e.timePeriodId.toString() === second_item.id.toString()
                  );
                });
              } else {
                data = item.data.filter(function(e) {
                  return (
                    e.timePeriodId.toString() === first_itemId.toString() &&
                    e.indicatorId.toString() === second_item.id.toString()
                  );
                });
              }
            }

            let seriesData = [];
            data.forEach(d => {
              seriesData.push(d.value);
            });
            let position = tempYSeries.findIndex(
              element =>
                element.name === second_item.name && element.id === second_item.id
            );

            if (position === -1 || position === "undefined") {
              tempYSeries.push({
                name: second_item.name,
                data: seriesData,
                id: second_item.id,
              });
            } else {
              tempYSeries[position].data.push(seriesData);
            }
          });
      });
      ySeries.push({name: item.timePeriodName, series: tempYSeries});
      tempYSeries = [];
  });
  return {xAxis: xCategories, yAxis: ySeries};
  }

  function exporting(labels) {
    let buttons = {
      contextButton: {
        menuItems: [
          {
            //textKey: "printChart",
            text: labels.print,
            onclick: function() {
              this.print();
            }
          },
          {
            separator: true
          },
          {
            // textKey: "downloadPNG",
            text: labels.saveAsPNG,
            onclick: function() {
              this.exportChart();
            }
          },
          {
            // textKey: "downloadJPEG",
            text: labels.saveAsJPEG,
            onclick: function() {
              this.exportChart({
                type: "image/jpeg"
              });
            }
          },
          {
            // textKey: "downloadSVG",
            text: labels.saveAsSVG,
            onclick: function() {
              this.exportChart({
                type: "image/svg+xml"
              });
            }
          }
        ]
      }
    }
    let chartOptions = {
      subtitle: {
        text: `Lähde: Metsämittari/Luke |
               Source: Forest Indicator/Luke`,
        floating: true,
        align: 'left',
        verticalAlign: 'bottom',
        style: {
          fontSize: '4pt',
        }
      }
    }
  return {buttons: buttons, chartOptions: chartOptions};
  }

  function generateConfiguration(xaxis, yaxis, itIsPolar, exporting, yLabel, legendLabel) {
    let myConfig = [];
    let height_polar = 600;
    let height = this.state.chartType === "column" ? 400 :
          400 + yaxis[0].series.length * 65 + xaxis.length * 55
    //let pointWidth = itIsPolar ? null : this.state.pointWidth;
   
    yaxis.forEach( (item) => {
      myConfig.push( {
        colors: ["#ff8200", "#00B5E2", "#54585a", "#0033a0", "#e13c98", "#78be20",
          "#7f3f98", "#ff9548", "#53d1ef", "#686c71", "#ea70b5", "#7dc969", "#2f69b8", "#845eaf"],
        title: {
          text: this.props.region.name + " " + item.name
        },
        chart: {
          polar: itIsPolar,
          defaultSeriesType: this.state.chartType,
          backgroundColor: "transparent",
          height: itIsPolar ? height_polar : height
        },
        legend: {
          title: {
            text: legendLabel + ':',
            style: {
              textAlign: 'center',
              fontSize: '10pt',
              color: '#666873',
              fontWeight: 'normal',
              textDecoration: 'underline'
            }
          }
        },
        xAxis: {
          categories: xaxis,
          crosshair: true
        },
        yAxis: {
          max: itIsPolar ? 1 : 1,
          tickAmount: itIsPolar ? 5 : undefined,
          min: 0,
          labels: {
            overflow: "justify"
          },
          title: {
            text: yLabel
          }
        },
        plotOptions: {
          series: {
              //pointWidth: pointWidth
              groupPadding: 0.1,
              pointPadding: 0.1,
              borderWidth: 0
          }
        }, 
        series: item.series,
        exporting: exporting
    })});
  
    return myConfig;
  }

  function organizeData(graphState, scenarios, timeperiods, values) {

    let validData = [];

    if (graphState) {
      timeperiods.forEach( (item, index) => {
        validData.push({
          dataType: item.dataType,
          timePeriodId: item.id,
          timePeriodName: item.name,
          data: values.filter(function(e) {
              return e.timePeriodId.toString() === timeperiods[index].id.toString();
            })
        });
      });
    }
    else {
      scenarios.forEach( (item, index) => {
        validData.push({
          dataType: "scenario",
          timePeriodId: item.id,
          timePeriodName: item.name,
          data: values.filter(function(e) {
              return e.scenarioId.toString() === scenarios[index].id.toString();
            })
        });
      });
    }
    return validData;
  }

  export {dataForGraphs, exporting, generateConfiguration, organizeData}