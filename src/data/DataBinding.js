import ForestData from "./ForestData";

function bindRegionalLevelData() {
  return new Promise((resolve, reject) => {
    ForestData.getRegionLevels().then(function(result) {
      resolve(result);
    });
  });
}

function bindRegionData(regionalLevel) {
  console.log("bindRegionData " + regionalLevel.value);
  if (regionalLevel !== "") {
    return new Promise((resolve, reject) => {
      ForestData.getRegion(regionalLevel.value).then(function(result) {
        resolve(result);
      });
    });
  }
}

function bindScenarioCollectionsData(region) {
  let list = [];
  region.scenarioCollections.map(element => {
    list.push({
      value: element.id,
      label: element.name,
      ...element
    });
  });
  return list;
}

function bindChartData(scenarioCollection, region) {
  console.log("bindChartdata scenCollect : " + scenarioCollection.id + " region " + region.id);
  return new Promise((resolve, reject) => {
    if (region !== null && scenarioCollection !== null) {
      ForestData.getScenarionCollection(scenarioCollection.id, region.id).then(
        function(result) {
          console.log(result);
          resolve(result[0]);
        }
      );
    }
  });
}

export default {
  bindRegionalLevelData,
  bindRegionData,
  bindScenarioCollectionsData,
  bindChartData
};
