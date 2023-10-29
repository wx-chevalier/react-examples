/** 加载 CSS */
export function loadCSS(href: string) {
  const head = document.getElementsByTagName('head')[0];

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;

  head.appendChild(link);
}

/** 加载 Script */
export function loadScript(src: string, cb: Function) {
  // 创建一个 script 元素
  const el = document.createElement('script') as any;
  let loaded = false;

  // 设置加载完成的回调事件
  el.onload = el.onreadystatechange = () => {
    // 防止重复加载
    if (
      (el.readyState &&
        el.readyState !== 'complete' &&
        el.readyState !== 'loaded') ||
      loaded
    ) {
      return false;
    }
    // 加载完成后将该脚本的 onload 设置为 null
    el.onload = el.onreadystatechange = null;
    loaded = true;
    cb && cb();

    return true;
  };

  el.async = true;
  el.src = src;
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(el);
}
