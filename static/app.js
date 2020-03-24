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
    api: 'https://api.covid19api.com/',
    //api: 'http://coronavirus-tracker-api.herokuapp.com/v2/',
    latest: '',
    confirmed: '',
    newConfirmed: '',
    recovered: '',
    newRecovered: '',
    deaths: '',
    newDeaths: '',
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
    COVID19.fetch()
        .then(function () {
            COVID19.appendData();
        });
};

/**
 * Fires off all functions on page load
 * @function
 */
COVID19.fetch = async function () {
    return await axios.get(COVID19.api + 'summary')
    .then(function (response) {
        let data = response.data.Countries;

        COVID19.latest = data.sort(function (a, b) {
          return b.TotalConfirmed - a.TotalConfirmed;
        });

        COVID19.confirmed = data.reduce(function(sum, d) {
          return sum + d.TotalConfirmed;
        }, 0);

        COVID19.newConfirmed = data.reduce(function(sum, d) {
            return sum + d.NewConfirmed;
        }, 0);

        COVID19.recovered = data.reduce(function(sum, d) {
            return sum + d.TotalRecovered;
        }, 0);

        COVID19.newRecovered = data.reduce(function(sum, d) {
            return sum + d.NewRecovered;
        }, 0);

        COVID19.deaths = data.reduce(function(sum, d) {
            return sum + d.TotalDeaths;
        }, 0);

        COVID19.newDeaths = data.reduce(function(sum, d) {
            return sum + d.NewDeaths;
        }, 0);

        console.log('raw data', response);
        console.log('latest', COVID19.latest);
        console.log('confirmed', COVID19.confirmed);
        console.log('newConfirmed', COVID19.newConfirmed);
        console.log('recovered', COVID19.recovered);
        console.log('newRecovered', COVID19.newRecovered);
        console.log('deaths', COVID19.deaths);
        console.log('newDeaths', COVID19.newDeaths);

        //COVID19.appendData();
    }).catch(function (err) {
        console.log('error', err)
    });
};

COVID19.appendData = function () {
    const _confirmed = document.getElementsByClassName('ui-confirmed')[0];
    const _deaths = document.getElementsByClassName('ui-deaths')[0];
    const _recovered = document.getElementsByClassName('ui-recovered')[0];

    if (_confirmed && _deaths && _recovered) {
        _confirmed.innerHTML = COVID19.confirmed;
        _deaths.innerHTML = COVID19.deaths;
        _recovered.innerHTML = COVID19.recovered;

        console.log(_deaths, _recovered);
    }

    const _table = document.getElementsByClassName('ui-table')[0];
    let _output = '';

    COVID19.latest.forEach(function (country, index) {
        //console.log(country, index);

        _output += '<tr>',
        _output += '    <td>' + country.Country + '</td>',
        _output += '    <td>' + country.TotalConfirmed + '</td>',
        _output += '</tr>';
    });

    _table.innerHTML = _output;
}

/**
 * Invoke ready function
 */
COVID19.ready(COVID19.init);