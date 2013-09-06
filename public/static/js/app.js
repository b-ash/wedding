(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("coffee/countdown", function(exports, require, module) {
  var Countdown,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Countdown = (function() {

    Countdown.prototype.wedding = 1413086400;

    function Countdown() {
      this.formatTimeout = __bind(this.formatTimeout, this);

      this.getTimeout = __bind(this.getTimeout, this);

      this.render = __bind(this.render, this);
      this.render();
      setInterval(this.render, 1000);
    }

    Countdown.prototype.render = function() {
      var time;
      time = this.formatTimeout(this.getTimeout());
      return $('p.countdown').html(time);
    };

    Countdown.prototype.getTimeout = function() {
      var days, hours, minutes, months, now, seconds;
      now = moment().unix();
      seconds = this.wedding - now;
      months = Math.floor(seconds / 2628000);
      seconds -= months * 2628000;
      days = Math.floor(seconds / 86400);
      seconds -= days * 86400;
      hours = Math.floor(seconds / 3600);
      seconds -= hours * 3600;
      minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
      return {
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    };

    Countdown.prototype.formatTimeout = function(timeout) {
      var times;
      times = [this.formatTime('month', timeout.months), this.formatTime('day', timeout.days), this.formatTime('hour', timeout.hours), this.formatTime('minute', timeout.minutes), this.formatTime('second', timeout.seconds)];
      return times.join(', ');
    };

    Countdown.prototype.formatTime = function(frame, val) {
      var time;
      time = "" + val + " " + frame;
      if (val > 1 || val === 0) {
        time += 's';
      }
      return time;
    };

    return Countdown;

  })();

  module.exports = Countdown;
  
});
window.require.register("coffee/index", function(exports, require, module) {
  var $, Countdown;

  Countdown = require('./countdown');

  $ = jQuery;

  $(function() {
    var timer;
    return timer = new Countdown();
  });
  
});
