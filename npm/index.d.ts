declare interface optionStatic {
    md5?: string; // 绕过禁用的md5值，详情见3.2，默认不启用绕过禁用
    url?: string; // 关闭页面失败时的跳转页面，默认值为localhost
    tkName?: string; // 绕过禁用时的url参数名称，默认为 ddtk
    ondevtoolopen?(): void; // 开发者面板打开的回调，启用时url参数无效
    interval?: number; // 定时器的时间间隔 默认200ms
    disableMenu?: boolean; // 是否禁用右键菜单 默认为true
    stopIntervalTime?: number; // 在移动端时取消监视的等待时长
}
declare interface DDTStatic {
    (option?: optionStatic): void;
    md5(text?: string): string;
    version: string;
}

declare const ddt: DDTStatic;

export default ddt;