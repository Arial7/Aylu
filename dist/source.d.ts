/// <reference path="../typings/index.d.ts" />
import * as events from "events";
export declare class AyluSource extends events.EventEmitter {
    private sender;
    constructor(sender: string);
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    fatal(message: string): void;
}
