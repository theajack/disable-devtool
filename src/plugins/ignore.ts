/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-15 22:36:17
 * @Description: Coding something
 */
import {config} from '../utils/config';

let lastUrl = '';
let lastIgnored = false;

export function isIgnored () {
  const {ignore} = config;
  if (!ignore) return false;

  if (typeof ignore === 'function') {
    return ignore();
  }

  if (ignore.length === 0) return false;
    
  const href = location.href;
  if (lastUrl === href) return lastIgnored;
  lastUrl = href;

  let result = false;

  for (const item of ignore) {
    if (typeof item === 'string') {
      if (href.indexOf(item) !== -1) {
        result = true;
        break;
      }
    } else {
      if (item.test(href)) {
        result = true;
        break;
      }
    }
  }
  lastIgnored = result;
  return result;
}