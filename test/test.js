/// <reference path="../typings/index.d.ts" />
var Aylu = require("../dist/main").Aylu;
var AyluSource = require("../dist/main").Source;
var ConsoleSink = require("../dist/main").sinks.Console;
var FileSink = require("../dist/main").sinks.File;
var master = new Aylu();
var logger1 = new AyluSource("Sender 1");
var logger2 = new AyluSource("Sender 2");
var fileLogger = new AyluSource("FileTester");
var fileTester = new Aylu();
master.addSource(logger1);
master.addSource(logger2);
var sink1 = new ConsoleSink();
master.addSink(sink1);
var fileSink = new FileSink("./output.log");
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
logger1.info("Now testing 1.000.000 writes to file");
for (var i = 0; i < 1000000; i++) {
    fileLogger.info("File Output: " + i);
}
