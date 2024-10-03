import { data } from '@/store/data'
import { createDatabase } from 'star-rail-vue'
import { getDetails } from './lightcone'
import { popupManager } from './popup'
import { KEY } from '@/store/setting'

const setDetails = () => {
  for (const i in data.lightCone) {
    if (data.lightCone[i].details === undefined) {
      data.lightCone[i].details = getDetails()
    }
  }
}

export const loadDatabase = () => {
  return new Promise<void>((resolve) => {
    // 数据库加载超时
    const timeout = setTimeout(() => {
      popupManager.open('confirm', {
        title: '数据库加载异常',
        tip: '如果持续出现这种情况可以尝试在数据管理里重置数据库',
        text: [
          '加载时间过长，可能是数据损坏',
          '点击<span style="color:red">确认</span>可以继续使用，但是可能出现功能异常'
        ],
        fn: () => {
          popupManager.close('loading')
        },
        close: () => {
          resolve()
        }
      })
    }, 30 * 1000)

    createDatabase(KEY.DATABASE_NAME, '光锥')
      .add({
        data: data,
        key: 'lightCone',
        name: 'lightCone'
      })
      .next()
      .then(() => {
        popupManager.close('confirm')
        setDetails()
        resolve()
      })
      .catch((err) => {
        console.error(err)

        popupManager.open('confirm', {
          title: '数据库初始化失败',
          text: ['光锥编辑器可以正常使用', '但是数据可能丢失且不会被保存'],
          close: () => {
            resolve()
          }
        })
      })
      .finally(() => {
        clearTimeout(timeout)
        popupManager.close('loading')
      })
  })
}
