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

try {
  const _setting = JSON.parse(localStorage.getItem('sr-light-cone-setting') || '{}')
  for (const _key in _setting) {
    const key = _key as keyof typeof setting
    if (
      _setting[_key] !== undefined &&
      setting[key] !== undefined &&
      _setting[_key] !== setting[key] &&
      typeof _setting[_key] === typeof setting[key]
    ) {
      ;(setting[key] as any) = _setting[_key]
    }
  }
} finally {
  watch(setting, () => {
    localStorage.setItem('sr-light-cone-setting', JSON.stringify(toRaw(setting)))
  })
}
