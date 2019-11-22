import 'dayjs/plugin/relativeTime';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Plugin } from 'webpack';

declare global {
  const __DEV__: boolean;

  interface Window {
    System: SystemJSLoader.System;
  }
}

declare module 'html-webpack-plugin' {
  namespace HtmlWebpackPlugin {
    interface Options {
      alwaysWriteToDisk?: boolean;
      inlineSource?: string | RegExp;
    }
  }

  export = HtmlWebpackPlugin;
}
