import axios from "axios";
import { getCookie, getCookieName } from "../services/cookie.js";

function getLanguage() {
  let language = getCookie(getCookieName());
  // console.log(language);
  if (language === "1") {
    return "en";
  } else {
    return "fi";
  }
}

function getRegionLevels() {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common["Accept-Language"] = this.getLanguage();
    axios
      .get("https://melatupa.azurewebsites.net/regionLevels")
      .then(results => {
        resolve(results.data);
      })
      .catch(error => {
        console.log(error);
        reject();
      });
  });
}

function getRegion(regionLevelId) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common["Accept-Language"] = this.getLanguage();

    axios
      .get(
        "https://melatupa.azurewebsites.net/regionLevels/" +
          regionLevelId +
          "/regions"
      )
      .then(results => {
        resolve(results.data);
      })
      .catch(error => {
        console.log(error);
        reject();
      });
  });
}

function getScenarionCollection(regionLevelId, regionId) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common["Accept-Language"] = this.getLanguage();

    axios
      .get(
        "https://melatupa.azurewebsites.net/scenarioCollection/" +
          regionLevelId +
          "/region/" +
          regionId
      )
      .then(results => {
        resolve(results.data);
      })
      .catch(error => {
        console.log(error);
        reject();
      });
  });
}

export default {
  getRegionLevels,
  getRegion,
  getScenarionCollection,
  getLanguage
};
