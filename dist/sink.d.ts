import { LogLevel } from "./loglevel";

export interface AyluSink {
    write(params: {
        level: LogLevel;
        sender: string;
        message: string;
    }): any;
    setMinimumLevel(level: LogLevel): void;
}
export declare class ConsoleSink implements AyluSink {
    useColor: boolean;
    constructor(useColor?: boolean);
    write: (params: {
        level: LogLevel;
        sender: string;
        message: string;
    }) => void;
    setMinimumLevel(level: LogLevel): void;
}
export declare class FileSink implements AyluSink {
    private filePath;
    constructor(filePath: string);
    write: (params: {
        level: LogLevel;
        sender: string;
        message: string;
    }) => void;
    setMinimumLevel(level: LogLevel): void;
}
