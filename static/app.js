/******************************************************************************
 *
 *   Name: coronavirus
 *   Version: 1.0
 *   Author: Kevin Booth
 *   Dependencies: 
 *      savjeecoin
 *
 ******************************************************************************/

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const {Blockchain, Transaction} = require('savjeecoin');

/**
 * COVID19
 * @namespace
 */
var COVID19 = window.COVID19 || {
    api: ''
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

};

/**
 * Invoke ready function
 */
COVID19.ready(COVID19.init);