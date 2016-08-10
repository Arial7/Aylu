/// <reference path="../typings/index.d.ts" />

import * as colors from "colors";
import * as fs from "fs";

import { LogLevel } from "./loglevel"

function levelToString(level: LogLevel) {
    switch (level) {
        case LogLevel.DEBUG:
            return "DEB";
        case LogLevel.INFO:
            return "INF";
        case LogLevel.WARN:
            return "WRN";
        case LogLevel.ERROR:
            return "ERR";
        case LogLevel.FATAL:
            return "FAT";
    };
}

export interface AyluSink {
    write(params: { level: LogLevel, sender: string, message: string });
    setMinimumLevel(level: LogLevel): void;
};

export class ConsoleSink implements AyluSink {
    private useColor: boolean;
    private minimumLevel: LogLevel = LogLevel.INFO;

    constructor(useColor?: boolean) {
        this.useColor = (useColor === undefined) ? true : useColor;
    };

    write = (params: { level: LogLevel, sender: string,
                 message: string }) => {
        let { level, sender, message } = params;

        if (level >= this.minimumLevel) {

            let currentDate = (new Date()).toISOString();
            let wholeMessage = `[${levelToString(level)}|${sender}][${currentDate}]${message}`;

            switch (level) {
                case LogLevel.DEBUG:
                    if (this.useColor) {
                        console.log(colors.white(wholeMessage));
                    }
                    else
                        console.log(wholeMessage);
                    break;
                case LogLevel.INFO:
                    if (this.useColor)
                        console.log(colors.green(wholeMessage));
                    else
                        console.log(wholeMessage);
                    break;
                case LogLevel.WARN:
                    if (this.useColor)
                        console.log(colors.yellow(wholeMessage));
                    else
                        console.log(wholeMessage);
                    break;
                case LogLevel.ERROR:
                    if (this.useColor)
                        console.error(colors.red(wholeMessage));
                    else
                        console.error(wholeMessage);
                    break;
                case LogLevel.FATAL:
                    if (this.useColor)
                        console.error(colors.red(wholeMessage));
                    else
                        console.error(wholeMessage);
                    break;
            };

        }
    };

    setMinimumLevel(level: LogLevel) {
        this.minimumLevel = level;
    }
};

export class FileSink implements AyluSink {
    private minimumLevel: LogLevel = LogLevel.INFO;
    private filePath: string;
    // Used to cache writes while writeStream is not open yet
    private preOpenQueue: string[];
    // Track the status of the writeStream;
    private streamIsOpen = false;
    private writeStream: fs.WriteStream;

    constructor(filePath: string) {
        this.filePath = filePath;
        this.preOpenQueue = [];

        this.writeStream = fs.createWriteStream(this.filePath);
        this.writeStream.once("open", () => {
            this.streamIsOpen = true;
        });
    };

    write = (params: { level: LogLevel, sender: string,
                 message: string }) => {

        let { level, sender, message } = params;
        let currentDate = (new Date()).toISOString();
        let wholeMessage = `[${levelToString(level)}|${sender}][${currentDate}]${message}`;

        // If the stream is not open yet, we have to cache the message
        if (!this.streamIsOpen) {
            if (level >= this.minimumLevel) {
                this.preOpenQueue.push(wholeMessage);
            }
        }
        else {
            // First check if there are remaining writes
            if (this.preOpenQueue.length > 0) {
                for (let message of this.preOpenQueue) {
                    this.writeStream.write(message + "\n");
                }
                this.preOpenQueue = [];
            }
            if (level >= this.minimumLevel) {
                this.writeStream.write(wholeMessage + "\n");
            }
        }
    };

    setMinimumLevel(level: LogLevel) {
        this.minimumLevel = level;
    }
};
