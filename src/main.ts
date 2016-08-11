/// <reference path="../typings/index.d.ts" />

import { AyluSink, ConsoleSink, FileSink } from "./sink";
import { AyluSource} from "./source";
import { LogLevel } from "./loglevel";

export * from "./sink";
export * from "./source";
export * from "./loglevel";

export class Aylu {
    private sinks: AyluSink[];
    private sources: AyluSource[];

    constructor() {
        this.sinks = [];
        this.sources = [];
    };

    public addSink(sink: AyluSink): void {
        this.sinks.push(sink);
        for (let source of this.sources) {
            source.on("aylu-debug", sink.write);
            source.on("aylu-info", sink.write);
            source.on("aylu-warn", sink.write);
            source.on("aylu-error", sink.write);
            source.on("aylu-fatal", sink.write);
        }
    };

    public addSource(source: AyluSource): void {
        this.sources.push(source);
        for (let sink of this.sinks) {
            source.on("aylu-debug", sink.write);
            source.on("aylu-info", sink.write);
            source.on("aylu-warn", sink.write);
            source.on("aylu-error", sink.write);
            source.on("aylu-fatal", sink.write);
        }
    };

    public static logLevelToString(level: LogLevel): string {
        switch(level) {
            case LogLevel.DEBUG:
                return "Debug";
            case LogLevel.INFO:
                return "Info";
            case LogLevel.WARN:
                return "Warn";
            case LogLevel.ERROR:
                return "Error";
            case LogLevel.FATAL:
                return "Fatal";
        };
    };
};

