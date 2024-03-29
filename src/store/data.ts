import { computed, reactive } from 'vue'

export const setting: {
  loading: boolean
  lightConeID?: number
} = reactive({
  loading: true,
  lightConeID: undefined,
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
