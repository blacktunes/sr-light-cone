import { reactive } from 'vue'

export const setting = reactive<{
  id?: number
}>({
  id: undefined
})

export const data = reactive<{
  list: LightCone[]
}>({
  list: []
})
