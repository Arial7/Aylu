/// <reference path="../typings/index.d.ts" />
"use strict";
;
var ConsoleSink = (function () {
    function ConsoleSink(useColor) {
        this.useColor = useColor || true;
    }
    ;
    ConsoleSink.prototype.write = function (params) {
        var level = params.level, sender = params.sender, message = params.message;
        var currentDate = (new Date()).toISOString();
        var wholeMessage = "[" + level + "|" + sender + "][" + currentDate + "]" + message;
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
                console.error("--- FATAL ---\n ConsoleSink received unknown log\n                            level: " + level + ". Please report this to Arial7/Aylu");
        }
        ;
    };
    ;
    ConsoleSink.prototype.flush = function () { };
    ;
    return ConsoleSink;
}());
exports.__esModule = true;
exports["default"] = ConsoleSink;
