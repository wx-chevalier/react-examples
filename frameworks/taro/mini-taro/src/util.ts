import { NodeType } from "./interface"

let instanceId: number = 0

export function reset() {
  instanceId = 0
}

export function generate() {
  const id = instanceId
  instanceId += 1
  return id
}

export const noop = () => {}
  
export const NodeTypeMap: any = {
  'view': NodeType.VIEW,
  'text': NodeType.TEXT,
  'root': NodeType.ROOT
}

export const isFunction = (target: unknown) => typeof target === 'function'
