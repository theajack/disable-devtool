/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-17 22:37:16
 * @Description: Coding something
 */

export function checkScriptUse () {
  if ('undefined' === typeof window || !window.document) return null;
  const dom = document.querySelector('[disable-devtool-auto]');
  if (!dom) {
    return null;
  }
  
  const boolAttrs = [
    'disable-menu', 'disable-select', 'disable-copy',
    'disable-cut', 'disable-paste', 'clear-log'
  ];
  
  const intAttrs = ['interval'];
  
  const json: Record<string, any> = {};
  [
    'md5', 'url', 'tk-name', 'detectors',
    ...boolAttrs, ...intAttrs
  ].forEach(name => {
    let value: any = dom.getAttribute(name);
    if (value !== null) {
      if (intAttrs.indexOf(name) !== -1) {
        value = parseInt(value);
      } else if (boolAttrs.indexOf(name) !== -1) {
        value = value === 'false' ? false : true;
      } else if (name === 'detector') {
        if (value !== 'all') {
          value = value.split(' ');
        }
      }
      json[formatName(name)] = value;
    }
  });
  return json;
}

function formatName (name: string) {
  if (name.indexOf('-') === -1) {
    return name;
  }
  let flag = false;
  return name.split('').map(c => {
    if (c === '-') {
      flag = true;
      return '';
    }
    if (flag) {
      flag = false;
      return c.toUpperCase();
    }
    return c;
  }).join('');
}