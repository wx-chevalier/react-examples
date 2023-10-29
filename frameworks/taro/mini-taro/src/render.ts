// 这边要借助 react-reconciler 实现一套虚拟dom树的系统

import React, { ReactNode } from 'react'
import { TaroReconciler } from './host-config'
import { TaroElement } from './taro-element'


const render = (component: ReactNode, container: TaroElement) => {

  if (!container._rootContainer) {
    container._rootContainer = TaroReconciler.createContainer(container, 0, false, null);
  }

  TaroReconciler.updateContainer(component, container._rootContainer, null)
  
  return TaroReconciler.getPublicRootInstance(container._rootContainer)
}

export { render }
