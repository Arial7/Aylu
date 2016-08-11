import { AyluSink } from "./sink";
import { AyluSource } from "./source";
import { LogLevel } from "./loglevel";

export * from "./sink";
export * from "./source";
export * from "./loglevel";

export declare class Aylu {
    private sinks;
    private sources;
    constructor();
    addSink(sink: AyluSink): void;
    addSource(source: AyluSource): void;
    static logLevelToString(level: LogLevel): string;
}
