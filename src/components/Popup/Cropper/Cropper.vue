<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        class="cropper"
        v-if="props.index !== -1 && cropperSetting.img"
        :style="{ zIndex: 10 + index }"
        @click.stop
      >
        <VuePictureCropper
          :img="cropperSetting.img"
          :options="{
            viewMode: 1,
            movable: false,
            scalable: false,
            zoomOnWheel: false,
            autoCrop: cropperSetting.aspectRatio !== undefined,
            autoCropArea: 1,
            aspectRatio: cropperSetting.aspectRatio
          }"
        />
        <div
          class="btn-list"
          :style="{
            transform: `scale(${scale ?? 1}) translateX(-50%)`
          }"
        >
          <Btn
            class="btn"
            name="取消"
            type="wrong"
            @click.stop="close"
          />
          <Btn
            class="btn"
            name="确认"
            type="check"
            @click.stop="onCropper"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import Btn from '@/components/Common/Btn.vue'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import { imageCropper, cropperSetting, cropperCallback } from './'

const scale = inject<ComputedRef<number> | undefined>('scale')

const props = defineProps<{
  name: string
  index: number
}>()

const emits = defineEmits<{
  (event: 'close', name: string): void
}>()

const close = () => {
  emits('close', props.name)
}

const onCropper = async () => {
  if (cropper && cropperSetting.fn) {
    cropperSetting.fn(
      (await imageCropper.crop({
        cropperInstance: cropper,
        src: cropperSetting.img,
        outputType: 'base64'
      })) as string
    )
  }
  close()
  return true
}

const reset = () => {
  cropper?.reset()
}

watch(
  () => props.index,
  () => {
    if (props.index === -1) {
      window.removeEventListener('resize', reset)
    } else {
      window.addEventListener('resize', reset)
    }
  }
)

cropperCallback.confirm = onCropper
</script>

<style lang="stylus" scoped>
:deep(.vue--picture-cropper__wrap)
  display flex
  justify-content center
  align-items center
  background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC')

.cropper
  position fixed
  top 0
  right 0
  bottom 0
  left 0

.btn-list
  position fixed
  bottom 15px
  left 50%
  display flex
  width auto
  transform-origin 0 bottom 0px

  .btn
    width 600px
    height 100px

  .default-btn
    display flex
    justify-content center
    align-items center
    box-sizing border-box
    width 400px
    height 100px
    border 5px solid #e0e0e0
    border-radius 50px
    background rgba(240, 240, 240, 0.8)
    font-size 40px
    cursor pointer

    &:hover
      background #ffffff
</style>
