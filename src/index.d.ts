declare interface optionStatic {
    md5?: string;
    url?: string;
    tkName?: string;
    ondevtoolopen?(): void; // ondevtoolopen 优先级高于 url
    debugDelay?: number;
    interval?: number;
    disableMenu?: boolean;
}
declare interface DDTStatic {
    (option?: optionStatic): void;
    md5(text?: string): string;
}

declare const ddt: DDTStatic;

export default ddt;