/// <reference path="../typings/index.d.ts" />

import { Aylu, AyluSource, ConsoleSink, FileSink, LogLevel } from "../dist/main";


let master = new Aylu();

let logger1 = new AyluSource("Sender 1");
let logger2 = new AyluSource("Sender 2");
let fileLogger = new AyluSource("FileTester");

let fileTester = new Aylu();

master.addSource(logger1);
master.addSource(logger2);

let sink1 = new ConsoleSink();
master.addSink(sink1);
let fileSink = new FileSink("./output.log");
master.addSink(fileSink);

fileTester.addSink(fileSink);
fileTester.addSource(fileLogger);

logger1.debug("Hallo Welt! - 1");
logger2.debug("Hallo Welt! - 2");
logger1.info("Hallo Welt! - 3");
logger1.warn("Hallo Welt! - 4");

setTimeout(() => {
    logger2.fatal("Hallo Welt! - 6");
}, 2000);
setTimeout(() => {
    logger1.error("Hallo Welt! - 5");
}, 1000);

logger1.info("Now setting minimumLevel on Console to ERROR");
sink1.setMinimumLevel(LogLevel.ERROR);
logger1.info("You should not see this in the console");
logger1.error("You should see this in the console");
sink1.setMinimumLevel(LogLevel.DEBUG);
logger1.debug("You should see this!");

logger1.info("Now testing 1.000.000 writes to file");
for (let i = 0; i < 1000000; i++) {
    fileLogger.info("File Output: " + i);
}
