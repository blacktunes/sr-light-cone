import { nextTick, reactive } from 'vue'

export const cropper = reactive<{
  show: boolean
  img: string
  aspectRatio?: number
  maxWidth?: number
  fn?: (img: string) => void
  cb?: () => Promise<boolean> 
}>({
  show: false,
  img: '',
  aspectRatio: undefined,
  fn: undefined,
  cb: undefined
})

export const cropperOpen = (
  img: string,
  config?: { aspectRatio?: number; maxWidth?: number }
) => {
  return new Promise<string>(resolve => {
    cropper.img = img
    cropper.aspectRatio = config?.aspectRatio
    cropper.maxWidth = config?.maxWidth
    cropper.show = true
    cropper.fn = (str) => resolve(str)
  })
}

export const cropperClose = async () => {
  cropper.img = ''
  await nextTick()
  cropper.fn = undefined
  cropper.aspectRatio = undefined
  cropper.maxWidth = undefined
  cropper.show = false
}
