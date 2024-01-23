import { reactive } from 'vue'

export const selectData = reactive<{
  title: string
  list: string[] | readonly string[]
  select?: string
  fn?: () => void
}>({
  title: '',
  list: [],
  select: undefined,
  fn: undefined
})
