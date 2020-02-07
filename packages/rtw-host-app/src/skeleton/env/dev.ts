import MobileDetect from 'mobile-detect';

export const HOST = 'https://xx.com';
// export const HOST = 'http://172.16.7.193:8080';
export const WITH_AUTH = true;

const md = new MobileDetect(window.navigator.userAgent);

export const isMobile = !!md.mobile();
