import { data, setting } from '@/store/data'
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
      setting.loading = false
    }
  })
}, 30 * 1000)

const done = () => {
  setting.loading = false
  clearTimeout(timeout)
  closeWindow('confirm')
}

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
