import React, { ComponentClass, FunctionComponent } from 'react'
import {
  getTaroElementById,
  getTaroRootElementByUid,
  PageContext,
} from './createAppConfig'
import { TaroRootElement } from './taro-element'
import { isFunction } from './util'

type PageComponent = FunctionComponent | ComponentClass

export const createPageConfig = (
  Component: PageComponent,
  initData: Record<string, unknown>,
  pageConfig: { path: string },
) => {
  const { path } = pageConfig
  const pageUid = path

  let app: any = null
  try {
    app = getApp()
  } catch (e) {
    console.error(e)
  }

  const getPageElement = () => {
    const rootElement = (app as any).getTree()
    return getTaroRootElementByUid(rootElement, pageUid) as TaroRootElement
  }

  const getElement = (id: string) => {
    const rootElement = (app as any).getTree()
    return getTaroElementById(rootElement, id)
  }

  // 所有事件汇总到一个方法上
  const eventHandler = (e: any) => {
    // 这里使用currentTarget是为了避免被冒泡影响
    const { type: eventName, currentTarget = {} } = e || {}
    const { id = '' } = currentTarget
    const pageElement = getPageElement()
    if (id && pageElement?.ctx) {
      const currentElement = getElement(id)
      if (!currentElement) return
      currentElement.dispatchEvent(eventName, e)
    }
  }

  const createConfig = () => {
    const config = Object.create({
      data: initData,
      onLoad: function (options: unknown) {
        console.warn('page onLoad', options)
        // 小程序page实例
        const page = this
        this.$taroPath = pageUid
        app &&
          app.mount(Component, this.$taroPath, () => {
            const pageElement = getPageElement()
            if (pageElement) {
              pageElement.ctx = page
              pageElement.performUpdate()
            }
          })
      },
      onShow: function() {
        safeExecute('onShow', pageUid)
      },
      onHide: function() {
        safeExecute('onHide', pageUid)
      },
      onReady: function() {
        safeExecute('onReady', pageUid)
      },
      onUnload: function () {
        app &&
          app.unmount(pageUid, () => {
            console.warn(`page: ${pageUid} unmount`)
          })
      },
      eh: eventHandler,
    })

    return config
  }

  return createConfig()
}

const hooks = new Map<string, Map<string, Function>>()

function safeExecute(lifeCycle: string, uid: string) {
  // 这里可以将小程序生命周期hook执行
  if (!hooks.has(uid)) return
  const target = hooks.get(uid)!
  const cb = target.get(lifeCycle)
  if (cb && isFunction(cb)) {
    cb.call(null)
  }
}

export function taroHook(lifeCycle: string) {
  return (cb: Function) => {
    // 这样拿到对应页面的uid
    const id = React.useContext(PageContext)
    const cbRef = React.useRef(cb)

    React.useLayoutEffect(() => {
      if (!isFunction(cbRef.current)) return
      if (!hooks.has(id)) hooks.set(id, new Map())
      const map = hooks.get(id)!
      map.set(lifeCycle, cbRef.current)
    }, [])
  }
}
