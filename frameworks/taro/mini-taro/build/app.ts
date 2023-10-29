import AppComp from '../demo/app'
import { createAppConfig } from "@/index"

/**
 * 
 * 这里在编译后的结果里面需要将
 * require('./vendors.js'); 
 * require('./runtime.js'); 
 * 放在顶层
 * 让app.js立即执行
 */

 App(createAppConfig(AppComp))
