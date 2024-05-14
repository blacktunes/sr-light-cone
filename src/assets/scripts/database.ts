import { data } from '@/store/data'
import { createDatabase } from 'star-rail-vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import type { WatchStopHandle } from 'vue'
import { getDetails } from './lightcone'
import { popupManager } from './popup'

const done = () => {
  for (const i in data.lightCone) {
    if (data.lightCone[i].details === undefined) {
      data.lightCone[i].details = getDetails()
    }
  }
  popupManager.close('loading')
  clearTimeout(timeout)
  popupManager.close('confirm')
  updateCheck()
}

// 数据库加载超时
const timeout = setTimeout(() => {
  popupManager.open('confirm', {
    title: '数据库加载异常',
    text: [
      '加载时间过长，可能是数据损坏',
      '点击<span style="color:red">确认</span>可以继续使用，但是可能出现功能异常'
    ],
    fn: () => {
      popupManager.close('loading')
      updateCheck()
    }
  })
}, 30 * 1000)

const { needRefresh, updateServiceWorker } = useRegisterSW()
let updateWatcher: WatchStopHandle
const updateCheck = () => {
  if (!updateWatcher) {
    updateWatcher = watchEffect(() => {
      if (needRefresh.value) {
        nextTick(() => {
          updateWatcher()
        })
        popupManager.open('confirm', {
          title: '发现新版本',
          text: ['是否立刻更新？'],
          tip: '如果取消新将会在下次启动时自动更新',
          fn: () => {
            popupManager.open('loading')
            updateServiceWorker(true)
          }
        })
      }
    })
  }
}

export const loadDatabase = () => {
  createDatabase('sr-light-cone', '光锥')
    .add({
      data: data,
      key: 'lightCone',
      name: 'lightCone'
    })
    .next()
    .then(done)
    .catch((err) => {
      console.error(err)

      popupManager.open('confirm', {
        title: '数据库初始化失败',
        text: ['光锥编辑器可以正常使用', '但是数据可能丢失且不会被保存']
      })
    })
}
