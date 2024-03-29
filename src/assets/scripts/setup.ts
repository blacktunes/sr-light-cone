import log from '@/assets/data/log'
import { data } from '@/store/data'
import { IndexedDB } from './indexedDB'
import { closeWindow, openWindow } from './popup'

const timeout = setTimeout(() => {
  openWindow('confirm', {
    title: '数据库加载异常',
    text: [
      '加载时间过长，可能是数据损坏',
      '点击<span style="color:red">确认</span>可以强行使用，但是可能导致功能异常'
    ],
    fn: () => {
      closeWindow('loading')
    }
  })
}, 30 * 1000)

const done = () => {
  closeWindow('loading')
  clearTimeout(timeout)
  closeWindow('confirm')
}

const loadDB = () => {
  new IndexedDB('sr-light-cone', '光锥')
    .add({
      data: data,
      key: 'lightCone',
      name: 'lightCone'
    })
    .next()
    .then(done)
    .catch((err) => {
      console.error(err)

      openWindow('confirm', {
        title: '数据库初始化失败',
        text: ['光锥编辑器可以正常使用', '但是数据可能丢失且不会被保存']
      })
    })
}

// 检查更新日志
const logCheck = () => {
  const lastUpdate = new Date(log[0].time).getTime()
  const localLastUpdate = Number(localStorage.getItem('sr-light-cone-time'))
  if (lastUpdate) {
    if (lastUpdate > localLastUpdate) {
      openWindow('log')
      localStorage.setItem('sr-light-cone-time', JSON.stringify(lastUpdate))
    }
  }
}

openWindow('loading')
loadDB()
logCheck()
