// Bitdeli
// -------
// * [Documentation](https://bitdeli.com/docs)
// * [JavaScript API Reference](https://bitdeli.com/docs/javascript-api.html)

var type   = require('type')
  , extend = require('extend')
  , load   = require('load-script')
  , utils  = require('../../utils');


module.exports = Bitdeli;

function Bitdeli () {
  this.settings = {
    inputId   : null,
    authToken : null,

    // Whether or not to track an initial pageview when the page first
    // loads. You might not want this if you're using a single-page app.
    initialPageview : true
  };
}


// Changes to the Bitdeli snippet:
//
// * Use `window._bdq` instead of `_bdq` to access existing queue instance
// * Always load the latest version of the library
//   (major backwards incompatible updates will use another URL)
Bitdeli.prototype.initialize = function (settings) {
  if (!settings.inputId || !settings.authToken) {
    throw new Error("Settings must be an object with properties 'inputId' and 'authToken'.");
  }

  extend(this.settings, settings);

  window._bdq = window._bdq || [];
  window._bdq.push(["setAccount", this.settings.inputId, this.settings.authToken]);
  if (this.settings.initialPageview) this.pageview();

  load('//d2flrkr957qc5j.cloudfront.net/bitdeli.min.js');
};


// Bitdeli uses two separate methods: `identify` for storing the `userId`
// and `set` for storing `traits`.
Bitdeli.prototype.identify = function (userId, traits) {
  if (userId) window._bdq.push(['identify', userId]);
  if (traits) window._bdq.push(['set', traits]);
};


Bitdeli.prototype.track = function (event, properties) {
  window._bdq.push(['track', event, properties]);
};


Bitdeli.prototype.pageview = function (url) {
  // If `url` is undefined, Bitdeli uses the current page URL instead.
  window._bdq.push(['trackPageview', url]);
};