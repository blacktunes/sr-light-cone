import { reactive } from 'vue'

export const inputData = reactive<{
  title: string
  tip?: string
  required: boolean
  text: string
  placeholder?: string
  fn?: (str: string) => void
}>({
  title: '',
  tip: undefined,
  required: true,
  text: '',
  placeholder: undefined,
  fn: undefined
})

