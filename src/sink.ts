/// <reference path="../typings/index.d.ts" />

import * as colors from "colors";
import * as fs from "fs";

export interface AyluSink {
    write(params: { level: string, sender: string, message: string });
    flush(): void;
};

export class ConsoleSink implements AyluSink {
    useColor: boolean;

    constructor(useColor?: boolean) {
        this.useColor = (useColor === undefined) ? true : useColor;
    };

    write = (params: { level: string, sender: string,
                 message: string }) => {
        let { level, sender, message } = params;

        let currentDate = (new Date()).toISOString();
        let wholeMessage = `[${level}|${sender}][${currentDate}]${message}`;

        switch (level) {
            case "DEB":
                if (this.useColor) {
                    console.log(colors.white(wholeMessage));
                }
                else
                    console.log(wholeMessage);
                break;
            case "INF":
                if (this.useColor)
                    console.log(colors.green(wholeMessage));
                else
                    console.log(wholeMessage);
                break;
            case "WRN":
                if (this.useColor)
                    console.log(colors.yellow(wholeMessage));
                else
                    console.log(wholeMessage);
                break;
            case "ERR":
                if (this.useColor)
                    console.error(colors.red(wholeMessage));
                else
                    console.error(wholeMessage);
                break;
            case "FAT":
                if (this.useColor)
                    console.error(colors.red(wholeMessage));
                else
                    console.error(wholeMessage);
                break;
            default:
                console.error("ConsoleSink received unknown log level: " +
                           level + ".\n Report this to Arial7/Aylu");
                break;
        };
    };

    public flush(): void {};


};

export class FileSink implements AyluSink {
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

    write = (params: { level: string, sender: string,
                 message: string }) => {

        let { level, sender, message } = params;
        let currentDate = (new Date()).toISOString();
        let wholeMessage = `[${level}|${sender}][${currentDate}]${message}`;

        // If the stream is not open yet, we have to cache the message
        if (!this.streamIsOpen) {
            this.preOpenQueue.push(wholeMessage);
        }
        else {
            // First check if there are remaining writes
            if (this.preOpenQueue.length > 0) {
                for (let message of this.preOpenQueue) {
                    this.writeStream.write(message + "\n");
                }
                this.preOpenQueue = [];
            }

            this.writeStream.write(wholeMessage + "\n");
        }

    };


    flush = () => {
        this.writeStream.end();
    };

};
