"use strict";
var main_1 = require("../src/main");
var source_1 = require("../src/source");
var sink_1 = require("../src/sink");
var master = new main_1["default"]();
var logger1 = new source_1["default"]("Sender 1");
var logger2 = new source_1["default"]("Sender 2");
master.addSource(logger1);
master.addSource(logger2);
var sink1 = new sink_1["default"]();
master.addSink(sink1);
logger1.debug("Hallo Welt! - 1");
logger2.debug("Hallo Welt! - 2");
logger1.info("Hallo Welt! - 3");
logger1.warn("Hallo Welt! - 4");
setTimeout(function () {
    logger2.error("Hallo Welt! - 6");
}, 500);
setTimeout(function () {
    logger1.fatal("Hallo Welt! - 5");
}, 100);
