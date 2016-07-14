import Aylu from "../src/main";
import AyluSource from "../src/source";
import ConsoleSink from "../src/sink";

let master = new Aylu();

let logger1 = new AyluSource("Sender 1");
let logger2 = new AyluSource("Sender 2");

master.addSource(logger1);
master.addSource(logger2);

let sink1 = new ConsoleSink();
master.addSink(sink1);


logger1.debug("Hallo Welt! - 1");
logger2.debug("Hallo Welt! - 2");
logger1.info("Hallo Welt! - 3");
logger1.warn("Hallo Welt! - 4");
setTimeout(() => {
    logger2.error("Hallo Welt! - 6");
}, 500);
setTimeout(() => {
    logger1.fatal("Hallo Welt! - 5");
}, 100);

