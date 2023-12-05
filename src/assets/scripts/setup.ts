import { setting } from '@/store/data'
import { showConfirm } from '@/store/popup'

const loadingFlag = {
  lightCone: false
}

const errorFlag = {
  lightCone: false
}

export const setLoadingType = (type: 'lightCone', error?: boolean) => {
  loadingFlag[type] = true
  if (error) errorFlag[type] = true

  if (Object.values(loadingFlag).every((flag) => flag)) {
    setting.loading = false
  }

  if (Object.values(errorFlag).some((flag) => flag)) {
    showConfirm({
      title: '数据库初始化失败',
      text: ['光锥编辑器可以正常使用', '但是数据可能丢失且不会被保存']
    })
  }
}

setTimeout(() => {
  if (Object.values(loadingFlag).some((flag) => !flag)) {
    showConfirm({
      title: '数据库加载异常',
      text: [
        '加载时间过长，可能是数据损坏',
        '点击<span style="color:red">确认</span>可以强行使用，但是可能导致功能异常'
      ],
      fn: () => {
        setting.loading = false
      }
    })
  }
}, 30 * 1000)
