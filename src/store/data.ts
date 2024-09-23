import { setLocalStorage } from 'star-rail-vue'

export const state: {
  lightConeID?: number
  screenshot: boolean
} = reactive({
  lightConeID: undefined,
  screenshot: false
})

export const setting: {
  details: boolean
  download: boolean
  quality: number
} = reactive({
  details: false,
  download: true,
  quality: 1
})

export const currentLightCone = computed(() => {
  const index = data.lightCone.findIndex((item) => item.id === state.lightConeID)
  if (index === -1) return
  return data.lightCone[index]
})

export const data = reactive<{
  lightCone: LightCone[]
}>({
  lightCone: []
})

setLocalStorage(setting, 'sr-light-cone-setting')
