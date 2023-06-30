import { define } from './html.js';

export function hhjsx(tag, props, ...children) {
  if (typeof tag === 'function') {
    return tag(tag ?? '', props, children);
  } else {
    return define(tag)(props ?? {}, children);
  }
}
