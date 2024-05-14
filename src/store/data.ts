export const setting: {
  lightConeID?: number
  details: boolean
  download: boolean
  screenshot: boolean
} = reactive({
  lightConeID: undefined,
  details: false,
  download: true,
  screenshot: false
})

export const currentLightCone = computed(() => {
  const index = data.lightCone.findIndex((item) => item.id === setting.lightConeID)
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
  if (_setting.details !== undefined) {
    setting.details = _setting.details
  }
  if (_setting.download !== undefined) {
    setting.download = _setting.download
  }
} finally {
  watch([() => setting.details, () => setting.download], () => {
    localStorage.setItem(
      'sr-light-cone-setting',
      JSON.stringify({
        details: setting.details,
        download: setting.download
      })
    )
  })
}
