import { reactive } from 'vue'
import { SuperImageCropper } from 'super-image-cropper'

export const imageCropper = new SuperImageCropper()

export const cropperSetting = reactive<{
  img: string
  aspectRatio?: number
  fn?: (img: string) => void
}>({
  img: '',
  aspectRatio: undefined,
  fn: undefined,
})

export const cropper = (
  img: string,
  config?: { aspectRatio?: number; maxWidth?: number }
) => {
  return new Promise<string>(resolve => {
    cropperSetting.img = img
    cropperSetting.aspectRatio = config?.aspectRatio
    cropperSetting.fn = (str) => resolve(str)
  })
}
