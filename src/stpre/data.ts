import { computed, reactive } from 'vue'

export const setting: {
  lightConeID?: number
  readonly lightConeIndex: number
} = reactive({
  lightConeID: undefined,
  lightConeIndex: computed(() =>
    data.lightCone.findIndex((item) => item.id === setting.lightConeID)
  )
})

export const data = reactive<{
  lightCone: LightCone[]
}>({
  lightCone: []
})

console.log(setting.lightConeIndex)
