declare enum DetectorType {
    Unknown = -1,
    RegToString = 0,
    DefineId = 1,
    Size = 2,
    DateToString = 3,
    FuncToString = 4,
    Debugger = 5,
    Performance = 6
}

interface IConfig {
    md5: string;
    url: string;
    tkName: string;
    ondevtoolopen(type: DetectorType, next: Function): void;
    ondevtoolclose: Function | null;
    interval: number;
    disableMenu: boolean;
    stopIntervalTime: number;
    clearIntervalWhenDevOpenTrigger: boolean;
    detectors: DetectorType[] | 'all';
    clearLog: boolean;
    disableSelect: boolean;
    disableCopy: boolean;
    disableCut: boolean;
    disablePaste: boolean;
}

declare function hex_md5(s: string): string;

declare function isDevToolOpened(): boolean;

interface IDisableDevtool {
    (opts?: Partial<IConfig>): void;
    md5: typeof hex_md5;
    version: string;
    DetectorType: typeof DetectorType;
    isDevToolOpened: typeof isDevToolOpened;
}
declare const disableDevtool: IDisableDevtool;

export { disableDevtool as default };
