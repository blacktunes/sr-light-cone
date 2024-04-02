export const setting: {
  lightConeID?: number
  details: boolean
} = reactive({
  lightConeID: undefined,
  details: false
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

setting.details = JSON.parse(localStorage.getItem('sr-light-cone-details') || 'true')
