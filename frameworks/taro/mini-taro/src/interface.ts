// import { VNode } from "./vnode"

import { Short } from "./short-cut"

enum NodeType {
  ROOT,
  TEXT,
  VIEW
}

type Props = Record<string, unknown>


export interface MpInstance {
  config: Record<string, unknown>
  setData: (data: unknown, cb: () => void) => void
  $taroParams?: Record<string, unknown>
  $taroPath: string
  data: any
  selectComponent: (selector: string) => any
}

export type UpdatePayloadValue = string | boolean | MiniData | MiniData[]
export type DataTree = Record<string, UpdatePayloadValue>

export interface UpdatePayload {
  path: string;
  value: UpdatePayloadValue
}

export interface MiniElementData {
  [Short.Childnodes]?: MiniData[]
  [Short.NodeName]: string
  [Short.Class]?: string
  [Short.Style]?: string
  uid: string
  [key: string]: unknown
}

export interface MiniTextData {
  [Short.Text]: string
  [Short.NodeName]: string
}

export type MiniData = MiniElementData | MiniTextData

export type NodeName = 'view' | 'text' | '#text' | 'button'

export {
  NodeType,
  Props,
}
