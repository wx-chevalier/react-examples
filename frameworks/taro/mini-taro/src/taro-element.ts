import { MpInstance, NodeName, NodeType, Props, UpdatePayload } from "./interface";
import { RootName, Short } from "./short-cut";
import { generateUid, hydrate } from "./hydrate";

export class TaroElement {

  public props: Props
  public _rootContainer: unknown

  public id: number;
  public type: NodeType;
  public nodeName: NodeName;
  public children?: TaroElement[];
  public text?: string;
  public parentNode: TaroElement | null = null
  public __handlers: Map<string, Function> = new Map()

  constructor(params: {
    id: number;
    type: NodeType;
    nodeName: NodeName;
    props: Props
    children?: TaroElement[];
    text?: string;
  }) {
    const { id, type, nodeName, props, children, text } = params
    this.id = id
    this.type = type
    this.nodeName = nodeName
    this.props = Object.assign({ uid: generateUid(id) }, props)
    // props中的children是冗余数据
    if (this.props['children']) {
      delete this.props['children']
    }
    this.children = children
    this.text = text
  }

  private onAttributeUpdate() {
    if (!this.parentNode) return
    const index = this.parentNode.children?.findIndex((p) => p.id === this.id)
    if (!index || index < 0) return
    this._root?.enqueueUpdate({
      path: `${this.parentNode?._path}.${Short.Childnodes}[${index}]`,
      value: hydrate(this),
    })
  }

  setAttribute(name: string, value: unknown) {
    this.props[name] = value
    this.onAttributeUpdate()
  }

  getAttribute(name: string) {
    return this.props[name]
  }

  removeAttribute(name: string) {
    if (name in this.props) {
      delete this.props[name]
      this.onAttributeUpdate()
    }
  }

  get _path (): string {
    const parentNode = this.parentNode
    if (!parentNode || !Array.isArray(parentNode.children)) return ''
    const index = parentNode.children.findIndex((p) => p.id === this.id)
    return `${parentNode._path}.${Short.Childnodes}[${index}]`
  }

  protected get _root (): TaroRootElement | null {
    return this.parentNode?._root || null
  }

  appendChild(child: TaroElement) {
    child.parentNode = this
    if (!this.children) {
      this.children = [child]
    } else {
      this.children.push(child)
    }
    this._root?.enqueueUpdate({
      path: `${this._path}.${Short.Childnodes}`,
      value: this.children.map(hydrate),
    })
  }

  insertBefore(child: TaroElement, beforeChild: TaroElement) {
    if (!this.children) return
    const index = this.children.findIndex((item) => item.id === beforeChild.id)
    if (index < 0) return
    child.parentNode = this
    this.children.splice(index, 0, child)
    this._root?.enqueueUpdate({
      path: `${this._path}.${Short.Childnodes}`,
      value: this.children.map(hydrate),
    })
  }

  removeChild(child: TaroElement) {
    if (!this.children) return
    const index = this.children.findIndex((item) => item.id === child.id)
    if (index < 0) return
    this.children.splice(index, 1)
    this._root?.enqueueUpdate({
      path: `${this._path}.${Short.Childnodes}`,
      value: this.children.map(hydrate),
    })
  }

  addEventListener(eventName: string, value: Function) {
    this.__handlers.set(eventName, value)
  }

  removeEventListener(eventName: string) {
    this.__handlers.delete(eventName)
  }

  // 触发事件（忽略冒泡和捕获）
  // taro3内部会二次封装这个事件，处理冒泡等行为，此处简化
  dispatchEvent(eventName: string, e: unknown) {
    if (this.__handlers.has(eventName)) {
      const fn = this.__handlers.get(eventName)
      typeof fn === 'function' && fn(e)
    }
  }
}

export class TaroText extends TaroElement {

  constructor(params: {
    id: number
    type: NodeType
    nodeName: NodeName
    props: Props
    children?: TaroElement[]
    text?: string
  }) {
    super(params)
    this.nodeName = '#text'
  }

  set textContext(text: string) {
    this.text = text
    this._root?.enqueueUpdate({
      path: `${this._path}.${Short.Text}`,
      value: text,
    })
  }
}

export class TaroRootElement extends TaroElement {
  public updatePayloads: UpdatePayload[] = []
  public ctx: null | MpInstance = null
  private pendingUpdate: boolean = false

  constructor(params: {
    id: number
    type: NodeType
    nodeName: NodeName
    props: Props
    children?: TaroElement[]
    text?: string
  }) {
    super(params)
  }

  get _root(): TaroRootElement {
    return this
  }

  // 页面顶层root节点让_path返回顶层名称
  get _path (): string {
    return RootName
  }

  public enqueueUpdate (payload: UpdatePayload) {
    this.updatePayloads.push(payload)

    console.warn('updatePayloads', [...this.updatePayloads])
  
    if (!this.pendingUpdate && this.ctx !== null) {
      this.performUpdate()
    }
  }

  public performUpdate() {
    this.pendingUpdate = true

    // TODO 这里可以优化，将所有的复杂payloads合并为最小payloads，传给setData
    const elements: UpdatePayload[] = []
    while(this.updatePayloads.length > 0) {
      const item = this.updatePayloads.shift()!
      elements.push(item)
    }

    console.warn('setData before', elements, this.ctx)

    Promise.resolve().then(() => {
      while(elements.length > 0) {
        const item = elements.shift()!
        const { path, value } = item
        this.ctx?.setData({ [path]: value }, () => {
          console.warn('setData end')
        })
      }
      this.pendingUpdate = false
    })
  }
}
