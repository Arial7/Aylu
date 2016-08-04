/// <reference path="../typings/index.d.ts" />
import { AyluSink } from "./sink";
import { AyluSource } from "./source";
export * from "./sink";
export * from "./source";
export declare class Aylu {
    private sinks;
    private sources;
    constructor();
    addSink(sink: AyluSink): void;
    addSource(source: AyluSource): void;
}
