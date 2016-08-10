/// <reference path="../typings/index.d.ts" />
"use strict";
var colors = require("colors");
var fs = require("fs");
function levelToString(level) {
    switch (level) {
        case 0 /* DEBUG */:
            return "DEB";
        case 1 /* INFO */:
            return "INF";
        case 2 /* WARN */:
            return "WRN";
        case 3 /* ERROR */:
            return "ERR";
        case 4 /* FATAL */:
            return "FAT";
    }
    ;
}
;
var ConsoleSink = (function () {
    function ConsoleSink(useColor) {
        var _this = this;
        this.minimumLevel = 1 /* INFO */;
        this.write = function (params) {
            var level = params.level, sender = params.sender, message = params.message;
            if (level >= _this.minimumLevel) {
                var currentDate = (new Date()).toISOString();
                var wholeMessage = "[" + levelToString(level) + "|" + sender + "][" + currentDate + "]" + message;
                switch (level) {
                    case 0 /* DEBUG */:
                        if (_this.useColor) {
                            console.log(colors.white(wholeMessage));
                        }
                        else
                            console.log(wholeMessage);
                        break;
                    case 1 /* INFO */:
                        if (_this.useColor)
                            console.log(colors.green(wholeMessage));
                        else
                            console.log(wholeMessage);
                        break;
                    case 2 /* WARN */:
                        if (_this.useColor)
                            console.log(colors.yellow(wholeMessage));
                        else
                            console.log(wholeMessage);
                        break;
                    case 3 /* ERROR */:
                        if (_this.useColor)
                            console.error(colors.red(wholeMessage));
                        else
                            console.error(wholeMessage);
                        break;
                    case 4 /* FATAL */:
                        if (_this.useColor)
                            console.error(colors.red(wholeMessage));
                        else
                            console.error(wholeMessage);
                        break;
                }
                ;
            }
        };
        this.useColor = (useColor === undefined) ? true : useColor;
    }
    ;
    ConsoleSink.prototype.setMinimumLevel = function (level) {
        this.minimumLevel = level;
    };
    return ConsoleSink;
}());
exports.ConsoleSink = ConsoleSink;
;
var FileSink = (function () {
    function FileSink(filePath) {
        var _this = this;
        this.minimumLevel = 1 /* INFO */;
        // Track the status of the writeStream;
        this.streamIsOpen = false;
        this.write = function (params) {
            var level = params.level, sender = params.sender, message = params.message;
            var currentDate = (new Date()).toISOString();
            var wholeMessage = "[" + levelToString(level) + "|" + sender + "][" + currentDate + "]" + message;
            // If the stream is not open yet, we have to cache the message
            if (!_this.streamIsOpen) {
                if (level >= _this.minimumLevel) {
                    _this.preOpenQueue.push(wholeMessage);
                }
            }
            else {
                // First check if there are remaining writes
                if (_this.preOpenQueue.length > 0) {
                    for (var _i = 0, _a = _this.preOpenQueue; _i < _a.length; _i++) {
                        var message_1 = _a[_i];
                        _this.writeStream.write(message_1 + "\n");
                    }
                    _this.preOpenQueue = [];
                }
                if (level >= _this.minimumLevel) {
                    _this.writeStream.write(wholeMessage + "\n");
                }
            }
        };
        this.filePath = filePath;
        this.preOpenQueue = [];
        this.writeStream = fs.createWriteStream(this.filePath);
        this.writeStream.once("open", function () {
            _this.streamIsOpen = true;
        });
    }
    ;
    FileSink.prototype.setMinimumLevel = function (level) {
        this.minimumLevel = level;
    };
    return FileSink;
}());
exports.FileSink = FileSink;
;
