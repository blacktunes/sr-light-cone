import { currentLightCone, setting } from '@/store/data'
import { emitter } from './event'
import { closeCurrentWindow, currentCallback, currentComponent } from './popup'

document.addEventListener('click', (e) => {
  if (setting.loading) return
  if ((e.target as HTMLElement).tagName.toLowerCase() === 'a') return
  closeCurrentWindow()
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
      currentCallback()
      return
    case 'Escape':
      closeCurrentWindow()
      return
  }
})
