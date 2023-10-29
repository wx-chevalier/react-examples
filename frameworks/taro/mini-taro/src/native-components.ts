// 基础组件实现
// 原生组件实际就是react组件，名称上与小程序组件对齐

import React, { CSSProperties } from 'react'

type Func = (...params: any[]) => void;

const createNativeComponent = (name: string, props?: Record<string, unknown>) => {
  return (params: { children?: any; className?: string; style?: CSSProperties; onClick?: Func; type?: string; onInput?: Func; }) => {
    const { children, ...nextParams } = params || {}
    return React.createElement(name, { ...nextParams }, children)
  }
}

export const View = createNativeComponent('view', {})

export const Text = createNativeComponent('text', {})

export const Button = createNativeComponent('button', {})

export const Input = createNativeComponent('input', {})

