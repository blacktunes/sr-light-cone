import { reactive } from 'vue'

export const confirmData = reactive<{
  title: string
  tip?: string
  text: string[]
  fn?: () => void
}>({
  title: '',
  tip: undefined,
  text: [],
  fn: undefined
})
