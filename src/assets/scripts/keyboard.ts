import { currentLightCone, setting } from '@/store/data'
import { closeWindow, currentComponent, enterCallback } from './popup'
import { emitter } from './event'

document.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).tagName.toLowerCase() === 'a') return
  if (currentComponent.value) {
    closeWindow(currentComponent.value)
  }
})

document.addEventListener('keydown', async (e) => {
  if (setting.loading) return
  switch (e.key) {
    // 保存截图
    case 's':
      if (!e.ctrlKey) return
      e.preventDefault()
      if (currentLightCone.value && currentComponent.value === 'show') {
        emitter.emit('screenshot')
      }
      return
    case 'Enter':
      if (currentComponent.value && enterCallback[currentComponent.value]) {
        e.preventDefault()
        enterCallback[currentComponent.value]?.()
      }
      return
    case 'Escape':
      if (currentComponent.value) {
        closeWindow(currentComponent.value)
      }
      return
  }
})
