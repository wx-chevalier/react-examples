import React, { ComponentClass } from 'react'
import { NodeType, Props } from './interface'
import { render } from './render'
import { TaroElement, TaroRootElement } from './taro-element'

export interface ReactPageComponent<T = Props> extends ComponentClass<T> {}

const RootElement = new TaroElement({
  id: Infinity,
  props: {},
  nodeName: 'view',
  type: NodeType.ROOT,
})

type PageElement = React.CElement<Props, React.Component<Props, any, any>>

type PageComponent = () => PageElement

const h = React.createElement

const EMPTY_OBJ: any = {}

export let PageContext: React.Context<string> = EMPTY_OBJ

const connectReactPage = (id: string) => {
  return (component: ReactPageComponent) => {
    if (PageContext === EMPTY_OBJ) {
      PageContext = React.createContext('')
    }

    return class Page extends React.Component {
      componentDidCatch(error: Error, info: React.ErrorInfo) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(error)
          console.error(info.componentStack)
        }
      }

      render() {
        // 名称是'root'的dom节点就是页面顶层节点了，在hostConfig中处理成不同节点
        return h(
          'root',
          { pageId: id },
          h(
            PageContext.Provider,
            { value: id },
            h(component, { ...this.props }),
          ),
        )
      }
    }
  }
}

export const createAppConfig = (App: React.ComponentClass) => {
  // 这个Wrapper就是一个代理，将小程序的更新代理到这个页面组件上，再将页面最近的更新setData回小程序
  class AppWrapper extends React.Component {
    public pages: PageComponent[] = []
    public elements: PageElement[] = []

    public mount(component: ComponentClass<Props>, id: string, cb: () => void) {
      const key = id
      const page = () => h(component, { key, tid: id })
      this.pages.push(page)

      // 强制更新一次
      this.forceUpdate(cb)
    }

    public unmount(id: string, cb: () => void) {
      const idx = this.elements.findIndex((item) => item.props.tid === id)
      this.elements.splice(idx, 1)

      this.forceUpdate(cb)
    }

    public render() {
      while (this.pages.length > 0) {
        const page = this.pages.pop()!
        this.elements.push(page())
      }

      const props: Record<string, unknown> | null = null

      return React.createElement(App, props, this.elements.slice())
    }
  }

  const wrapper: AppWrapper = render(
    React.createElement(AppWrapper),
    RootElement,
  ) as AppWrapper

  const createConfig = () => {
    // app的配置不能是一个复杂对象。。
    const config = Object.create({
      mount: function (
        component: ReactPageComponent,
        id: string,
        cb: () => void,
      ) {
        const page = connectReactPage(id)(component)
        wrapper.mount(page, id, cb)
      },
      unmount: function (id: string, cb: () => void) {
        wrapper.unmount(id, cb)
      },
      onLaunch: function (options: Record<string, unknown>) {
        console.warn('app onLaunch')
      },
      onShow: function (options: any) {
        //
      },
      onHide: function () {
        //
      },
      onError: function (msg: any) {
        console.log('app error', msg)
      },
      getTree: function () {
        return RootElement
      },
    })

    return config
  }

  return createConfig()
}

// 页面顶层元素是TaroRootElement props内包含一个pageId，值是当前页面路径
// 查找指定的页面root元素
export function getTaroRootElementByUid(
  rootElement: TaroElement,
  uid: string,
): TaroRootElement | undefined {
  const queue: TaroElement[] = []
  let target: TaroRootElement | undefined = undefined
  // 广度优先查找
  queue.push(rootElement)
  while (queue.length > 0) {
    const t = queue.shift()!
    if (t.getAttribute('pageId') === uid) {
      target = t as TaroRootElement
      break
    } else {
      t.children?.map((item) => queue.push(item))
    }
  }
  return target
}

// 查找指定的页面内元素
export function getTaroElementById(
  rootElement: TaroElement,
  id: string,
): TaroElement | undefined {
  const queue: TaroElement[] = []
  let target: TaroElement | undefined = undefined
  queue.push(rootElement)
  while (queue.length > 0) {
    const t = queue.shift()!
    if (t.getAttribute('uid') === id) {
      target = t as TaroElement
      break
    } else {
      t.children?.map((item) => queue.push(item))
    }
  }
  return target
}
