const width = 3200
const height = (width / 16) * 9
const bottom = 0

export const viewport = reactive<{
  readonly width: number
  readonly height: number
  readonly bottom: number
  scale: number
  horizontal: boolean
}>({
  width,
  height,
  bottom,
  scale: 1,
  horizontal: false
})
