/******************************************************************************
 *
 *   Name: coronavirus
 *   Version: 1.0
 *   Author: Kevin Booth
 *   Dependencies: 
 *      chart.js
 *
 ******************************************************************************/


/**
 * COVID19
 * @namespace
 */
var COVID19 = window.COVID19 || {
    api: 'https://coronavirus-tracker-api.herokuapp.com/v2/',
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
    fetch(COVID19.api + 'predict' + COVID19.source, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    }).then(function (response) {
        response.json().then(function (data) {
            COVID19.latest = data.latest;
            console.log(COVID19.latest);
            COVID19.locations = data.locations;
        });
    }).catch(function (err) {
        console.log(err)
    });
};

/**
 * Invoke ready function
 */
COVID19.ready(COVID19.init);