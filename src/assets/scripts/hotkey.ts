import { currentLightCone, setting } from '@/store/data'
import { emitter } from './event'
import { popupManager } from './popup'

let flag = false

export const hotkey = () => {
  if (flag) return
  flag = true

  document.addEventListener('click', (e) => {
    if (popupManager.isLoading()) return
    if ((e.target as HTMLElement).tagName.toLowerCase() === 'a') return
    if (popupManager.currentComponent !== 'show') popupManager.closeCurrentComponent()
  })

  document.addEventListener('keydown', async (e) => {
    if (popupManager.isLoading()) return
    switch (e.key) {
      // 保存截图
      case 's':
        if (!e.ctrlKey) return
        e.preventDefault()
        if (currentLightCone.value && popupManager.currentComponent === 'show') {
          emitter.emit('screenshot')
        }
        return
      case 'Tab':
        e.preventDefault()
        if (currentLightCone.value && popupManager.currentComponent === 'show') {
          setting.details = !setting.details
        }
        return
      case 'Enter':
        popupManager.currentComponentConfirm()
        return
      case 'Escape':
        popupManager.closeCurrentComponent()
        return
    }
  })
}
