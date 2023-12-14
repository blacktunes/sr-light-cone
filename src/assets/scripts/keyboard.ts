import { cropper, cropperClose } from '@/store/cropper'
import { setting } from '@/store/data'
import { closeWindow, popup } from '@/store/popup'
import { emitter } from './event'

const handelBack = () => {
  if (closeWindow()) return

  if (setting.lightConeID) {
    setting.lightConeID = undefined
    return
  }
}

document.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).tagName.toLowerCase() === 'a') return
  closeWindow()
})

const hasPopup = () => {
  let key: keyof typeof popup
  for (key in popup) {
    if (popup[key]) {
      return true
    }
  }
  return false
}

document.addEventListener('keydown', async (e) => {
  if (setting.loading) return
  switch (e.key) {
    // 保存截图
    case 's':
      if (!e.ctrlKey) return
      e.preventDefault()
      if (setting.lightConeIndex !== -1 && !hasPopup()) {
        emitter.emit('screenshot')
      }
      return
    case 'Enter':
      // 裁剪窗口
      if (cropper.show && (await cropper.cb?.())) {
        console.log(1)
        e.preventDefault()
        return
      }
      // 确认窗口
      if (closeWindow(true)) {
        e.preventDefault()
        return
      }
      return
    case 'Escape':
      if (cropper.show) {
        cropperClose()
        return
      }
      handelBack()
  }
})
