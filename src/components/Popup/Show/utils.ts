import { fateList } from '@/assets/scripts/images'
import { closeWindow, isLoading, openWindow } from '@/assets/scripts/popup'
import { screenshot } from '@/assets/scripts/screenshot'
import { currentLightCone } from '@/store/data'

export const updateTime = () => {
  if (!currentLightCone.value) return

  currentLightCone.value.time = Date.now()
}

export const onNameClick = async () => {
  if (!currentLightCone.value) return

  const name = await openWindow('input', {
    title: '修改光锥名',
    required: false,
    defaultText: currentLightCone.value.name,
    placeholder: '未知光锥'
  })
  if (name && currentLightCone.value.name !== name) {
    currentLightCone.value.name = name
    updateTime()
  }
}

export const onTypeClick = async () => {
  if (!currentLightCone.value) return

  const type = await openWindow('select', '修改命途', fateList, currentLightCone.value.type)
  if (type) {
    currentLightCone.value.type = type as Fate
    updateTime()
  }
}

export const onLevelClick = () => {
  if (!currentLightCone.value) return

  currentLightCone.value.level += 1
  if (currentLightCone.value.level > 5) {
    currentLightCone.value.level = 3
  }
  updateTime()
}

export const onImageClick = () => {
  openWindow('cropper', { aspectRatio: 0.7, maxWidth: 1280 }).then((res) => {
    if (!currentLightCone.value) return

    currentLightCone.value.image = res.base64
    updateTime()
  })
}

export const onShareClick = (dom?: HTMLElement | null) => {
  if (isLoading()) return

  openWindow('loading')
  nextTick(() => {
    if (dom) {
      if (!currentLightCone.value) return

      screenshot(dom, currentLightCone.value.name)
      setTimeout(() => {
        nextTick(() => {
          closeWindow('loading')
        })
      }, 500)
    } else {
      closeWindow('loading')
    }
  })
}
