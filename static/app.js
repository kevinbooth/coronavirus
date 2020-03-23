/******************************************************************************
 *
 *   Name: coronavirus
 *   Version: 1.0
 *   Author: Kevin Booth
 *   Dependencies: 
 *      chart.js
 *
 ******************************************************************************/

const axios = require('axios');

/**
 * COVID19
 * @namespace
 */
var COVID19 = window.COVID19 || {
    //api: 'httpss://api.covid19api.com/summary',
    api: 'http://coronavirus-tracker-api.herokuapp.com/v2/',
    source: '?source=jhu',
    latest: '',
    locations: ''
};

/**
 * Checks if DOM is ready for JS to fire
 * @function
 * @param {object} _fn init function to run once DOM is ready
 */
COVID19.ready = function (_fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    _fn();
  } else {
    document.addEventListener('DOMContentLoaded', _fn);
  }
};

/**
 * Fires off all functions on page load
 * @function
 */
COVID19.init = function () {
    COVID19.fetch();
};

/**
 * Fires off all functions on page load
 * @function
 */
COVID19.fetch = function () {
    axios.get(COVID19.api + 'locations' + COVID19.source)
    .then(function (response) {
        COVID19.latest = response.data.latest;
        console.log(COVID19.latest);
        COVID19.locations = response.data.locations;
        console.log(COVID19.locations);
    }).catch(function (err) {
        console.log('error', err)
    });
};

/**
 * Invoke ready function
 */
COVID19.ready(COVID19.init);