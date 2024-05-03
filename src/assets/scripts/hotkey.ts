import { currentLightCone, setShowMode } from '@/store/data'
import { emitter } from './event'
import { popup } from './popup'

let flag = false

export const hotkey = () => {
  if (flag) return
  flag = true

  document.addEventListener('click', (e) => {
    if (popup.isLoading()) return
    if ((e.target as HTMLElement).tagName.toLowerCase() === 'a') return
    if (popup.currentComponent !== 'show') popup.closeCurrentComponent()
  })

  document.addEventListener('keydown', async (e) => {
    if (popup.isLoading()) return
    switch (e.key) {
      // 保存截图
      case 's':
        if (!e.ctrlKey) return
        e.preventDefault()
        if (currentLightCone.value && popup.currentComponent === 'show') {
          emitter.emit('screenshot')
        }
        return
      case 'Tab':
        if (currentLightCone.value && popup.currentComponent === 'show') {
          e.preventDefault()
          setShowMode()
        }
        return
      case 'Enter':
        popup.currentComponentConfirm()
        return
      case 'Escape':
        popup.closeCurrentComponent()
        return
    }
  })
}
