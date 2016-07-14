/// <reference path="../typings/index.d.ts" />

import * as colors from "colors";

export interface AyluSink {
    write(params: { level: string, sender: string, message: string }): void;
    flush(): void;
};

export default class ConsoleSink implements AyluSink {
    useColor: boolean;

    constructor(useColor?: boolean) {
        this.useColor = useColor || true;
    };

    public write(params: { level: string, sender: string, 
                 message: string }): void {
        let { level, sender, message } = params;

        let currentDate = (new Date()).toISOString();
        let wholeMessage = `[${level}|${sender}][${currentDate}]${message}`;

        switch (level) {
            case "DEB":
                if (this.useColor)
                    console.log(wholeMessage.white);
                else
                    console.log(wholeMessage);
                break;
            case "INF":
                if (this.useColor)
                    console.log(wholeMessage.green);
                else
                    console.log(wholeMessage);
                break;
            case "WRN":
                if (this.useColor)
                    console.log(wholeMessage.yellow);
                else
                    console.log(wholeMessage);
                break;
            case "ERR":
                if (this.useColor)
                    console.error(wholeMessage.red);
                else
                    console.error(wholeMessage);
            case "FAT":
                if (this.useColor)
                    console.error(wholeMessage.red.bold);
                else
                    console.error(wholeMessage);
            default:
                console.error(`--- FATAL ---\n ConsoleSink received unknown log
                            level: ${level}. Please report this to Arial7/Aylu`);
        };


        
    };

    public flush(): void {};


}
