// 这边要借助 react-reconciler 实现一套虚拟dom树的系统

import ReactReconciler, { HostConfig } from 'react-reconciler'
import { NodeName, NodeType, Props } from './interface'
import { generate, NodeTypeMap, noop } from './util'
import { TaroElement, TaroRootElement, TaroText } from './taro-element'

export function updateProps (dom: TaroElement, oldProps: Props, newProps: Props) {
  let i: string

  for (i in oldProps) {
    if (!(i in newProps)) {
      setProperty(dom, i, null, oldProps[i])
    }
  }
  for (i in newProps) {
    if (oldProps[i] !== newProps[i]) {
      setProperty(dom, i, newProps[i], oldProps[i])
    }
  }
}

function isEventName (s: string) {
  return s[0] === 'o' && s[1] === 'n'
}

function setEvent(dom: TaroElement, name: string, value: unknown) {
  let eventName = name.toLowerCase().slice(2)

  if (eventName === 'click') {
    eventName = 'tap'
  }

  if (typeof value === 'function') {
    dom.addEventListener(eventName, value)
  } else {
    dom.removeEventListener(eventName)
  }
}

/** 
 * 判断属性，处理属性
 */
function setProperty (dom: TaroElement, name: string, value: unknown, oldValue?: unknown) {
  // className转class
  name = name === 'className' ? 'class' : name

  if (
    name === 'key' ||
    name === 'children' ||
    name === 'ref'
  ) {
    // 跳过
  } else if (name === 'style') {
    // TODO 需要处理style的变化
  } else if (isEventName(name)) {
    // 事件 onClick等
    setEvent(dom, name, value)
  } else if (value == null) {
    dom.removeAttribute(name)
  } else {
    dom.setAttribute(name, value as string)
  }
}

const hostConfig: HostConfig<
  string, // Type
  Props, // Props
  TaroElement, // Container
  TaroElement, // Instance
  TaroText, // TextInstance
  TaroElement, // SuspenseInstance
  TaroElement, // HydratableInstance
  TaroElement, // PublicInstance
  Record<string, any>, // HostContext
  string[], // UpdatePayload
  unknown, // ChildSet
  unknown, // TimeoutHandle
  unknown // NoTimeout
> = {
  createInstance(
    type: string,
    props: Props,
    rootContainer: TaroElement,
    hostContext: unknown,
    internalHandle: unknown,
  ): TaroElement {
    const conf = {
      id: generate(),
      type: NodeTypeMap[type] || NodeType.VIEW,
      nodeName: type as NodeName,
      props,
      children: [],
    }
    if (type === 'root') {
      return new TaroRootElement(conf)
    } else {
      return new TaroElement(conf)
    }
  },
  createTextInstance(
    text: string,
    rootContainer: TaroText,
    hostContext: unknown,
    internalHandle: unknown,
  ): TaroText {
    const vnode = new TaroText({
      id: generate(),
      type: NodeType.TEXT,
      nodeName: 'text',
      props: {},
      text,
    })
    return vnode
  },
  getPublicInstance (inst: TaroElement) {
    return inst
  },

  getRootHostContext () {
    return {}
  },

  getChildHostContext () {
    return {}
  },

  appendChild (parent, child) {
    parent.appendChild(child)
  },

  appendInitialChild (parent, child) {
    parent.appendChild(child)
  },

  appendChildToContainer (parent, child) {
    parent.appendChild(child)
  },

  removeChild (parent, child) {
    parent.removeChild(child)
  },

  removeChildFromContainer (parent, child) {
    parent.removeChild(child)
  },

  insertBefore (parent, child, refChild) {
    parent.insertBefore(child, refChild)
  },

  insertInContainerBefore (parent, child, refChild) {
    parent.insertBefore(child, refChild)
  },

  commitTextUpdate (textInst, _, newText) {
    textInst.textContext = newText
  },

  finalizeInitialChildren (dom, _, props) {
    updateProps(dom, {}, props)
    return false
  },

  prepareUpdate () {
    return []
  },

  commitUpdate (dom, _payload, _type, oldProps, newProps) {
    updateProps(dom, oldProps, newProps)
  },

  clearContainer (element) {
    if (element.children && element.children.length > 0) {
      element.children = []
    }
  },

  shouldSetTextContent: () => false,
  prepareForCommit (..._: any[]) { return null },
  resetAfterCommit: noop,
  commitMount: noop,
  now: () => Date.now(),
  cancelTimeout: clearTimeout,
  scheduleTimeout: setTimeout,
  preparePortalMount: noop,
  noTimeout: -1,
  supportsMutation: true,
  supportsPersistence: false,
  isPrimaryRenderer: true,
  supportsHydration: false
}

const TaroReconciler = ReactReconciler(hostConfig)

// TaroReconciler.injectIntoDevTools({
//   bundleType: 1,
//   version: '0.0.1',
//   rendererPackageName: 'mini-taro'
// })

export {
  TaroReconciler,
  ReactReconciler,
}
