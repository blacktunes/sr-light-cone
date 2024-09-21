import { fateList } from '@/assets/scripts/images'
import { popupManager } from '@/assets/scripts/popup'
import { currentLightCone, setting, state } from '@/store/data'
import { screenshot } from 'star-rail-vue'

export const updateTime = () => {
  if (!currentLightCone.value) return

  currentLightCone.value.time = Date.now()
}

export const onNameClick = async () => {
  if (!currentLightCone.value) return

  const name = await popupManager.open('input', {
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

  const type = await popupManager.open('select', '修改命途', fateList, currentLightCone.value.type)
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
  popupManager.open('cropper', { aspectRatio: 0.7, maxWidth: 1280 }).then((res) => {
    if (!currentLightCone.value) return

    currentLightCone.value.image = res.base64
    updateTime()
  })
}

export const onShareClick = (dom?: HTMLElement | null) => {
  if (popupManager.isLoading()) return

  state.screenshot = true
  popupManager.open('loading')
  nextTick(() => {
    if (dom) {
      if (!currentLightCone.value) return

      screenshot(
        dom,
        {
          name: currentLightCone.value.name,
          download: setting.download,
          data: {
            raw: JSON.stringify(toRaw(currentLightCone.value)),
            filename: 'raw.lc'
          }
        },
        { pixelRatio: setting.quality }
      )
        .catch(() => {
          popupManager.open('confirm', {
            title: '图片保存异常',
            text: ['可能是浏览器拦截了新窗口'],
            tip: '请尝试在设置中切换下载模式'
          })
        })
        .finally(() => {
          setTimeout(() => {
            state.screenshot = false
            popupManager.close('loading')
          }, 1000)
        })
    } else {
      state.screenshot = false
      popupManager.close('loading')
    }
  })
}
