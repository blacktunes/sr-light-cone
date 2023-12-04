import { computed, reactive } from 'vue'

export const setting: {
  loading: boolean
  lightConeID?: number
  readonly lightConeIndex: number
} = reactive({
  loading: false,
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
