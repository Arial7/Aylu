/// <reference path="../typings/index.d.ts" />
"use strict";
var colors = require("colors");
var fs = require("fs");
;
var ConsoleSink = (function () {
    function ConsoleSink(useColor) {
        var _this = this;
        this.write = function (params) {
            var level = params.level, sender = params.sender, message = params.message;
            var currentDate = (new Date()).toISOString();
            var wholeMessage = "[" + level + "|" + sender + "][" + currentDate + "]" + message;
            switch (level) {
                case "DEB":
                    if (_this.useColor) {
                        console.log(colors.white(wholeMessage));
                    }
                    else
                        console.log(wholeMessage);
                    break;
                case "INF":
                    if (_this.useColor)
                        console.log(colors.green(wholeMessage));
                    else
                        console.log(wholeMessage);
                    break;
                case "WRN":
                    if (_this.useColor)
                        console.log(colors.yellow(wholeMessage));
                    else
                        console.log(wholeMessage);
                    break;
                case "ERR":
                    if (_this.useColor)
                        console.error(colors.red(wholeMessage));
                    else
                        console.error(wholeMessage);
                    break;
                case "FAT":
                    if (_this.useColor)
                        console.error(colors.red(wholeMessage));
                    else
                        console.error(wholeMessage);
                    break;
                default:
                    console.error("ConsoleSink received unknown log level: " +
                        level + ".\n Report this to Arial7/Aylu");
                    break;
            }
            ;
        };
        this.useColor = (useColor === undefined) ? true : useColor;
    }
    ;
    ConsoleSink.prototype.flush = function () { };
    ;
    return ConsoleSink;
}());
exports.ConsoleSink = ConsoleSink;
;
var FileSink = (function () {
    function FileSink(filePath) {
        var _this = this;
        // Track the status of the writeStream;
        this.streamIsOpen = false;
        this.write = function (params) {
            var level = params.level, sender = params.sender, message = params.message;
            var currentDate = (new Date()).toISOString();
            var wholeMessage = "[" + level + "|" + sender + "][" + currentDate + "]" + message;
            // If the stream is not open yet, we have to cache the message
            if (!_this.streamIsOpen) {
                _this.preOpenQueue.push(wholeMessage);
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
                _this.writeStream.write(wholeMessage + "\n");
            }
        };
        this.flush = function () {
            _this.writeStream.end();
        };
        this.filePath = filePath;
        this.preOpenQueue = [];
        this.writeStream = fs.createWriteStream(this.filePath);
        this.writeStream.once("open", function () {
            _this.streamIsOpen = true;
        });
    }
    ;
    return FileSink;
}());
exports.FileSink = FileSink;
;
