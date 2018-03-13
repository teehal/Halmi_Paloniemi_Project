export function getMelaTupaService(
  selectedOptions,
  region,
  scenarioCollection,
  language
) {
  let chosenScenarios = [];
  selectedOptions.forEach(element => {
    if (element.dataType === "scenario") {
      chosenScenarios.push(element.id);
    }
  });

  let chosenIndicatos = [];
  selectedOptions.forEach(element => {
    if (element.dataType === "indicator") {
      chosenIndicatos.push(element.id);
    }
  });

  let timePeriods = selectedOptions.filter(function(e) {
    return e.dataType === "timePeriod";
  });
  // test URL http://mela2.metla.fi/mela/_tupatest15/tupa/index.php
  let url = "http://mela2.metla.fi/mela/tupa/index.php?lk=";
  url += scenarioCollection !== "" ? scenarioCollection.id.toString() : "";
  url += "&ko=";
  url += region !== "" ? region.id.toString() : "";
  url += "&ty=";
  url += chosenScenarios.join();
  url += "&ka=";
  url += timePeriods.length > 0 ? timePeriods[0].id.toString() : "";
  url += "&mj=";
  url += chosenIndicatos.join();
  url += language === "1" ? "&la=uk" : "";

  return url;
}
