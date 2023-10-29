import { MiniData, NodeType } from "./interface"
import { Short } from "./short-cut"
import { TaroElement } from "./taro-element"

const isEmpty = (children: any[] | undefined) => {
  return !children || (Array.isArray(children) && children.length === 0)
}

export const generateUid = (id: number) => `u-${id}`

/**
 * 
 * 这个函数是将虚拟dom树转为了渲染属性树
 * @param node 
 * @returns 
 */
export const hydrate = (node: TaroElement): MiniData => {
  if (node.type === NodeType.TEXT && isEmpty(node.children)) {
    return {
      [Short.Text]: node.text || '',
      [Short.NodeName]: node.nodeName,
    }
  } else {
    const { nodeName, props, id, children } = node
    const { className, style, children: _children, ...nextProps } = props || {}

    // style字符串化 + 驼峰转横线
    let styleContent = ''
    if (!!style) {
      for (const [key, value] of Object.entries(style as Object)) {
        styleContent += `${styleTransform(key)}: ${value};`
      }
    }

    return {
      [Short.Childnodes]: !!children && Array.isArray(children) ? children.map(hydrate) : [],
      [Short.NodeName]: nodeName,
      [Short.Class]: className as string || '',
      [Short.Style]: styleContent as string,
      uid: generateUid(id),
      ...nextProps,
    }
  }
}

// fontSize -> font-size
export const styleTransform = (name: string) => {
  const list = name.split('')
  const index = list.findIndex(p => /[A-Z]/.test(p))
  if (index >= 0) list.splice(index, 1, '-' + list[index].toLowerCase())
  return list.join('')
}
