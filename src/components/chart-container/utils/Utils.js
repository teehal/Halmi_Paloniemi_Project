function dataForGraphs(groupBy, data, scenarios, indicators) {
    let xCategories = [];
    let ySeries = [];
    let tempYSeries = [];
    let groupingBy = groupBy === "scenario" ? scenarios : indicators;
    let grouped = groupBy === "scenario" ? indicators : scenarios;

    data.forEach( (item) => {
      groupingBy.forEach(first_item => {
        let first_itemId = first_item.id;

        if ( xCategories.indexOf(first_item.name) === -1 )
           xCategories.push(first_item.name);

          grouped.forEach(second_item => {
            let data = [];
            // console.log(indicatorName);
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

  const exporting = {
    buttons: {
      contextButton: {
        menuItems: [
          {
            textKey: "printChart",
            onclick: function() {
              this.print();
            }
          },
          {
            separator: true
          },
          {
            textKey: "downloadPNG",
            onclick: function() {
              this.exportChart();
            }
          },
          {
            textKey: "downloadJPEG",
            onclick: function() {
              this.exportChart({
                type: "image/jpeg"
              });
            }
          },
          {
            textKey: "downloadPDF",
            onclick: function() {
              this.exportChart({
                type: "application/pdf"
              });
            }
          },
          {
            textKey: "downloadSVG",
            onclick: function() {
              this.exportChart({
                type: "image/svg+xml"
              });
            }
          }
        ]
      }
    }
  };

  function generateConfiguration(xaxis, yaxis, itIsPolar, exporting) {
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
        xAxis: {
          categories: xaxis,
          crosshair: true
        },
        yAxis: {
          max: itIsPolar ? 1 : undefined,
          tickAmount: itIsPolar ? 5 : undefined,
          min: 0,
          labels: {
            overflow: "justify"
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