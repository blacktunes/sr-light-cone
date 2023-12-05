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

const hasPopup = () => {
  let key: keyof typeof popup
  for (key in popup) {
    if (popup[key]) {
      return true
    }
  }
  return false
}

document.addEventListener('keydown', (e) => {
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
