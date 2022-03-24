
declare type DETECTOR_TYPE = -1 | 0 | 1 | 2 | 3 | 4;
declare interface optionStatic {
    md5?: string; // 绕过禁用的md5值，详情见3.2，默认不启用绕过禁用
    url?: string; // 关闭页面失败时的跳转页面，默认值为localhost
    tkName?: string; // 绕过禁用时的url参数名称，默认为 ddtk
    ondevtoolopen?(type: DETECTOR_TYPE, next: Function): void; // 开发者面板打开的回调，启用时url参数无效
    ondevtoolclose?(): void;
    interval?: number; // 定时器的时间间隔 默认200ms
    disableMenu?: boolean; // 是否禁用右键菜单 默认为true
    stopIntervalTime?: number; // 在移动端时取消监视的等待时长
    clearIntervalWhenDevOpenTrigger?: boolean; // 是否在触发之后停止监控
    detectors: Array<DETECTOR_TYPE>;  // 启用的监测器 默认为全部
    clearLog?: boolean; // 是否每次都清除log
    disableSelect?: boolean; // 是否禁用选择文本 默认为false
    disableCopy?: boolean; // 是否禁用复制 默认为false
    disableCut?: boolean; // 是否禁用剪切 默认为false
}
declare interface DDTStatic {
    (option?: optionStatic): void;
    md5(text?: string): string;
    DETECTOR_TYPE: {
        UNKONW: -1;
        REG_TO_STRING: 0;
        DEFINE_ID: 1;
        SIZE: 2;
        DATE_TO_STRING: 3;
        FUNC_TO_STRING: 4;
        DEBUGGER: 5;
        // LOG_TIME: 6;
    }
    version: string;
    isDevToolOpened(): boolean;
}

declare const ddt: DDTStatic;

export default ddt;