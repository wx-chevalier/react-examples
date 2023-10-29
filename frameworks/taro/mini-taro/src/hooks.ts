/**
 * 这里实现的hook对应Taro提供的hook
 * 参考这些hook可以实现出任意需要的业务hook，比如useShareAppMessage，usePageScroll等
 */
import { taroHook } from "./createPageConfig";

export const useReady = taroHook('onReady')

export const useDidShow = taroHook('onShow')

export const useDidHide = taroHook('onHide')
