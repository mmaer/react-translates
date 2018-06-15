// setup for test files
require('babel-register');
require('babel-polyfill');

// temporary hack until SBKS-269 is fixed and fully rolled out
require('ignore-styles');

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const dom = new JSDOM('<!doctype html><html><body></body></html>');

// Setup the jsdom environment
global.document = dom.window.document;
global.window = dom.window;
global.navigator = global.window.navigator;
