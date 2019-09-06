import { Home } from "../pages/page-home/index";
import { IAppModule } from "fc-sg-core";
import { ComponentType } from "react";

import { importApp } from "../index.umd";

export interface ResolvedModule {
  default: ComponentType<any>;
  reducer?: object;
}

export interface Module {
  type: "page" | "module" | "app" | "widget" | "extension";
  component?: React.ComponentType;
  loader?: () => Promise<ResolvedModule>;
}

// menifest 包含了所有页面、模块、应用、控件、插件加载方式的声明，在索引时并不严格区分类型，而推荐按照唯一键索引即可，方便迁移。
// 自动注册为 `/:id` 的路由
const _manifest: { [key: string]: Module } = {
  "page-home": {
    type: "page",
    component: Home
  },
  "page-a": {
    type: "page",
    loader: () => import(/* webpackChunkName: "page-a" */ "../pages/page-a")
  },
  "redux-app": {
    type: "app",
    // 这里在 rtw-bootstrap 中完成了注册，这里直接加载导入
    loader: () => importApp && importApp("http://redux-app")
  }
};

declare global {
  interface Window {
    __DEV_APP__?: IAppModule;
  }
}

// 判断是否定义了开发应用
if (window.__DEV_APP__) {
  _manifest[window.__DEV_APP__.id] = {
    ...window.__DEV_APP__,
    type: "app",
    loader: () => importApp && importApp(window.__DEV_APP__!.module)
  };
}

export const manifest = _manifest;
