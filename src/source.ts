/// <reference path="../typings/index.d.ts" />

import * as events from "events";


export class AyluSource extends events.EventEmitter {
    constructor(private sender: string) {
        super();
    };
    
    public debug(message: string): void {
        this.emit("aylu-debug", { 
            level: "DEB",
            sender: this.sender,
            message: message
        });
    };
    
    public info(message: string): void {
        this.emit("aylu-info", {
            level: "INF",
            sender: this.sender,
            message: message
        });
    };

    public warn(message: string): void {
        this.emit("aylu-warn", {
            level: "WRN",
            sender: this.sender,
            message: message
        });
    };

    public error(message: string): void {
        this.emit("aylu-error", {
            level: "ERR",
            sender: this.sender,
            message: message
        });
    };

    public fatal(message: string): void {
        this.emit("aylu-fatal", {
            level: "FAT",
            sender: this.sender,
            message: message
        });
    };

};
