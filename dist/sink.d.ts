export interface AyluSink {
    write(params: {
        level: string;
        sender: string;
        message: string;
    }): any;
}
export declare class ConsoleSink implements AyluSink {
    useColor: boolean;
    constructor(useColor?: boolean);
    write: (params: {
        level: string;
        sender: string;
        message: string;
    }) => void;
}
export declare class FileSink implements AyluSink {
    private filePath;
    private preOpenQueue;
    private streamIsOpen;
    private writeStream;
    constructor(filePath: string);
    write: (params: {
        level: string;
        sender: string;
        message: string;
    }) => void;
}
