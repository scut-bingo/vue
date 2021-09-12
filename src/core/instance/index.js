import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 定义vue构造函数
// 此处没有使用类class的写法是因为需要给原型上注入许多属性
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 初始化传入的options
  this._init(options)
}

// 注册_init方法，即17行代码调用的那个，是vue初始化的入口方法。
initMixin(Vue)

// 注册实例属性$data、$props和实例方法$set、$delete、$watch
stateMixin(Vue)

// 注册实例方法（事件相关）$on、$emit、$once、$off。文档：https://cn.vuejs.org/v2/api/#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95-%E4%BA%8B%E4%BB%B6
eventsMixin(Vue)

//  注册实例方法（声明周期相关）。_update、$forceUpdate、$destroy。文档：https://cn.vuejs.org/v2/api/#vm-forceUpdate
lifecycleMixin(Vue)

// 注册实例方法（声明周期相关）。文档：https://cn.vuejs.org/v2/api/#vm-nextTick
renderMixin(Vue)

export default Vue
