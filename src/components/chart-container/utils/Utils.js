function dataForGraphs(groupBy, data, scenariosOrTimeperiods, indicators) {
    let xCategories = [];
    let ySeries = [];
    let tempYSeries = [];
    let groupingBy = groupBy === "scenario" ? scenariosOrTimeperiods : 
      ( groupBy === "indicator" ? indicators : scenariosOrTimeperiods);
    let grouped = groupBy === "scenario" ? indicators : 
      (groupBy === "timePeriod" ? indicators : scenariosOrTimeperiods);
    console.log(`groupby ${groupBy}`);
    console.log("groupingBy ", groupingBy);
    console.log("grouped ", grouped);
    console.log("values ", data);
    data.forEach( (item) => {
      groupingBy.forEach(first_item => {
        console.log("first_item ", first_item);
        let first_itemId = first_item.id;

        if ( xCategories.indexOf(first_item.name) === -1 )
           xCategories.push(first_item.name);

          grouped.forEach(second_item => {
            let data = [];
            // console.log(indicatorName);
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
            console.log("data is ", data);

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
  return buttons;
  }

  function generateConfiguration(xaxis, yaxis, itIsPolar, exporting, yLabel, legendLabel) {
    let myConfig = [];
    let height_polar = 600;
    let height = this.state.chartType === "column" ? 400 :
          400 + yaxis[0].series.length * 65 + xaxis.length * 55
    let pointWidth = itIsPolar ? null : this.state.pointWidth;
   
    yaxis.forEach( (item) => {
      myConfig.push( {
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
              pointWidth: pointWidth
          }
        }, 
        series: item.series,
        exporting: exporting
    })});
  
    return myConfig;
  }

  export {dataForGraphs, exporting, generateConfiguration}