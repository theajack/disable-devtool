/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-15 22:38:19
 * @Description: Coding something
 */

import {DetectorType} from './utils/enum';

export interface IConfig {
    md5: string; // 绕过禁用的md5值，详情见3.2，默认不启用绕过禁用
    url: string; // 关闭页面失败时的跳转页面，默认值为localhost
    timeOutUrl: string; // 关闭页面超时跳转的url
    tkName: string; // 绕过禁用时的url参数名称，默认为 ddtk
    ondevtoolopen(type: DetectorType, next: Function): void; // 开发者面板打开的回调，启用时url参数无效
    ondevtoolclose: Function | null;
    interval: number; // 定时器的时间间隔 默认200ms
    disableMenu: boolean; // 是否禁用右键菜单 默认为true
    stopIntervalTime: number; // 在移动端时取消监视的等待时长
    clearIntervalWhenDevOpenTrigger: boolean; // 是否在触发之后停止监控
    detectors: DetectorType[] | 'all';  // 启用的监测器 默认为全部
    clearLog: boolean; // 是否每次都清除log
    disableSelect: boolean; // 是否禁用选择文本 默认为false
    disableCopy: boolean; // 是否禁用复制 默认为false
    disableCut: boolean; // 是否禁用剪切 默认为false
    disablePaste: boolean; // 是否禁用粘贴 默认为false
    ignore: (string|RegExp)[] | null | (()=>boolean); // 某些情况忽略禁用
    disableIframeParents: boolean; // iframe中是否禁用所有父窗口，默认 true
    seo: boolean; // 是否启用对seo进行保护，默认 true
    rewriteHTML: string; // 检测到打开之后重写页面
}

export interface IDisableDevtool {
    (opts?: Partial<IConfig>): {success:boolean, reason:string};
    isRunning: boolean;
    isSuspend: boolean;
    md5: (v: string) => string;
    version: string;
    DetectorType: typeof DetectorType;
    isDevToolOpened: ()=>boolean;
}