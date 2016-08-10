/// <reference path="../typings/index.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events = require("events");
var AyluSource = (function (_super) {
    __extends(AyluSource, _super);
    function AyluSource(sender) {
        _super.call(this);
        this.sender = sender;
    }
    ;
    AyluSource.prototype.debug = function (message) {
        this.emit("aylu-debug", {
            level: 0 /* DEBUG */,
            sender: this.sender,
            message: message
        });
    };
    ;
    AyluSource.prototype.info = function (message) {
        this.emit("aylu-info", {
            level: 1 /* INFO */,
            sender: this.sender,
            message: message
        });
    };
    ;
    AyluSource.prototype.warn = function (message) {
        this.emit("aylu-warn", {
            level: 2 /* WARN */,
            sender: this.sender,
            message: message
        });
    };
    ;
    AyluSource.prototype.error = function (message) {
        this.emit("aylu-error", {
            level: 3 /* ERROR */,
            sender: this.sender,
            message: message
        });
    };
    ;
    AyluSource.prototype.fatal = function (message) {
        this.emit("aylu-fatal", {
            level: 4 /* FATAL */,
            sender: this.sender,
            message: message
        });
    };
    ;
    return AyluSource;
}(events.EventEmitter));
exports.AyluSource = AyluSource;
;
