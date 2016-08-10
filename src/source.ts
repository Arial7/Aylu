/// <reference path="../typings/index.d.ts" />

import * as events from "events";
import { LogLevel } from "./loglevel";

export class AyluSource extends events.EventEmitter {
    constructor(private sender: string) {
        super();
    };
    
    public debug(message: string): void {
        this.emit("aylu-debug", { 
            level: LogLevel.DEBUG,
            sender: this.sender,
            message: message
        });
    };
    
    public info(message: string): void {
        this.emit("aylu-info", {
            level: LogLevel.INFO,
            sender: this.sender,
            message: message
        });
    };

    public warn(message: string): void {
        this.emit("aylu-warn", {
            level: LogLevel.WARN,
            sender: this.sender,
            message: message
        });
    };

    public error(message: string): void {
        this.emit("aylu-error", {
            level: LogLevel.ERROR,
            sender: this.sender,
            message: message
        });
    };

    public fatal(message: string): void {
        this.emit("aylu-fatal", {
            level: LogLevel.FATAL,
            sender: this.sender,
            message: message
        });
    };

};
