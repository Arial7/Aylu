/// <reference path="../typings/index.d.ts" />
"use strict";
var main_1 = require("../dist/main");
var master = new main_1.Aylu();
var logger1 = new main_1.AyluSource("Sender 1");
var logger2 = new main_1.AyluSource("Sender 2");
var fileLogger = new main_1.AyluSource("FileTester");
var fileTester = new main_1.Aylu();
master.addSource(logger1);
master.addSource(logger2);
var sink1 = new main_1.ConsoleSink();
master.addSink(sink1);
var fileSink = new main_1.FileSink("./output.log");
master.addSink(fileSink);
fileTester.addSink(fileSink);
fileTester.addSource(fileLogger);
logger1.debug("Hallo Welt! - 1");
logger2.debug("Hallo Welt! - 2");
logger1.info("Hallo Welt! - 3");
logger1.warn("Hallo Welt! - 4");
setTimeout(function () {
    logger2.fatal("Hallo Welt! - 6");
}, 2000);
setTimeout(function () {
    logger1.error("Hallo Welt! - 5");
}, 1000);
logger1.info("Now setting minimumLevel on Console to ERROR");
sink1.setMinimumLevel(3 /* ERROR */);
logger1.info("You should not see this in the console");
logger1.error("You should see this in the console");
sink1.setMinimumLevel(0 /* DEBUG */);
logger1.debug("You should see this!");
logger1.info("Now testing 1.000.000 writes to file");
for (var i = 0; i < 1000000; i++) {
    fileLogger.info("File Output: " + i);
}
