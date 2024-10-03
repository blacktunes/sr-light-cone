import { state } from './setting'

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
