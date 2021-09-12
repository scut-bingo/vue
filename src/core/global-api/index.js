/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    // 不允许改变Vue.config的引用，可以往里面挂载方法或属性。
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // vue.util里面的方法不应被视为全局api，使用它们会带来意想不到的风险，不可轻易使用。
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  // vue全局方法注册。文档：https://cn.vuejs.org/v2/api/#Vue-nextTick
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API。文档：https://cn.vuejs.org/v2/api/#Vue-observable
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

  // 初始化options对象，并给其拓展
  // components、directives、filters是用来存储全局组件、指令和过滤器。
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  // 将keep-alive组件挂载在vue.options下，因为也是vue自带的全局组件。文档：https://cn.vuejs.org/v2/api/#keep-alive
  extend(Vue.options.components, builtInComponents)

  // 注册vue.use方法。文档：https://cn.vuejs.org/v2/api/#Vue-use
  initUse(Vue)

  // 注册vue.mixin方法，实现混入。文档：https://cn.vuejs.org/v2/api/#Vue-mixin
  initMixin(Vue)

  // 注册vue.extend方法。文档：https://cn.vuejs.org/v2/api/#Vue-extend
  initExtend(Vue)

  // 注册vue.directive、vue.component、vue.filter方法。文档：https://cn.vuejs.org/v2/api/#Vue-directive
  initAssetRegisters(Vue)
}
