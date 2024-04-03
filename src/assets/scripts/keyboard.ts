import { currentLightCone, setShowMode } from '@/store/data'
import { emitter } from './event'
import {
  closeCurrentComponent,
  currentComponentCallback,
  getCurrentComponent,
  isLoading
} from './popup'

document.addEventListener('click', (e) => {
  if (isLoading()) return
  if ((e.target as HTMLElement).tagName.toLowerCase() === 'a') return
  if (getCurrentComponent() !== 'show') closeCurrentComponent()
})

document.addEventListener('keydown', async (e) => {
  if (isLoading()) return
  switch (e.key) {
    // 保存截图
    case 's':
      if (!e.ctrlKey) return
      e.preventDefault()
      if (currentLightCone.value && getCurrentComponent() === 'show') {
        emitter.emit('screenshot')
      }
      return
    case 'Tab':
      if (currentLightCone.value && getCurrentComponent() === 'show') {
        e.preventDefault()
        setShowMode()
      }
      return
    case 'Enter':
      currentComponentCallback()
      return
    case 'Escape':
      closeCurrentComponent()
      return
  }
})
