declare module '*.less' {
  const styles: Record<string, string>;
  export = styles;
}

declare module '*.svg' {
  import React from 'react';
  const Component: React.ComponentType;
  export = styles;
}

declare module '@antv/data-set' {
  namespace DataSet {
    interface DateViewTransformOptions {
      type: string;
      field?: string;
      fields?: string[];
      dimension?: string;
      key?: string;
      value?: string;
      as?: string;
    }

    class DataView {
      source(data: object[]): this;
      transform(options: Partial<DateViewTransformOptions>): this;
    }
  }

  class DataSet {
    static DataView: DataSet.DataView;
    createView(): DataSet.DataView;
  }

  const DataSet: DataSet;

  export = DataSet;
}

declare module '@antv/g2' {
  namespace G2 {
    interface Shape {
      parsePoint(point: Point): Point;
    }
  }

  export = G2;
}

declare module 'html-webpack-harddisk-plugin' {
  import { Plugin } from 'webpack';

  class HtmlWebpackHarddiskPlugin extends Plugin {}

  export = HtmlWebpackHarddiskPlugin;
}

declare module 'html-webpack-inline-source-plugin' {
  import { Plugin } from 'webpack';

  class HtmlWebpackInlineSourcePlugin extends Plugin {}

  export = HtmlWebpackInlineSourcePlugin;
}

declare module 'lazy-compile-webpack-plugin' {
  import { Plugin } from 'webpack';

  namespace LazyCompileWebpackPlugin {
    interface Options {
      refreshAfterCompile?: boolean;
    }
  }

  class LazyCompileWebpackPlugin extends Plugin {
    constructor(options?: LazyCompileWebpackPlugin.Options);
  }

  export = LazyCompileWebpackPlugin;
}

declare module 'webpack-theme-color-replacer' {
  import { Plugin } from 'webpack';

  namespace ThemeColorReplacer {
    interface Options {
      fileName: string;
      matchColors: string[];
      changeSelector(selector: string): string;
    }
  }

  class ThemeColorReplacer extends Plugin {
    static varyColor: {
      lighten: (color: string, radio: number) => string;
      darken: (color: string, radio: number) => string;
    };

    constructor(options: ThemeColorReplacer.Options);
  }

  export = ThemeColorReplacer;
}

declare module 'webpack-theme-color-replacer/client' {
  namespace WebpackThemColorReplacerClient {
    interface ChangeColorOptions {
      newColors: string[];
      changeUrl(cssUrl: string): string;
    }
  }

  interface WebpackThemColorReplacerClient {
    varyColor: {
      lighten: (color: string, radio: number) => string;
      darken: (color: string, radio: number) => string;
    };
    changer: {
      changeColor(
        options: WebpackThemColorReplacerClient.ChangeColorOptions,
        PromiseConstructor: typeof Promise,
      ): Promise<void>;
    };
  }

  const client: WebpackThemColorReplacerClient;

  export = client;
}

declare module 'dayjs/locale/zh-cn';
declare module 'dayjs/locale/en';
declare module 'rc-tween-one/lib/plugin/ChildrenPlugin';
declare module 'dayjs-ext/plugin/timeZone';
declare module 'react-hls-player';
