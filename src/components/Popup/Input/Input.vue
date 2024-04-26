<template>
  <Popup :index="index">
    <window
      :title="inputData.title"
      width="55%"
      confirm
      @close="close"
    >
      <div
        class="textarea"
        v-if="inputData.textarea"
      >
        <textarea
          ref="inputDom"
          v-model="inputData.text"
          :placeholder="inputData.placeholder"
          @keydown.enter.stop="onTextareaEnter"
        ></textarea>
      </div>
      <div
        class="input"
        v-else
      >
        <input
          type="text"
          ref="inputDom"
          v-model="inputData.text"
          :placeholder="inputData.placeholder"
          @keydown.enter.prevent.stop="onConfirmlClick"
        />
      </div>
      <template
        #bottom
        v-if="inputData.tip"
      >
        <div class="tip">{{ inputData.tip }}</div>
      </template>
      <template #footer>
        <Btn
          class="win-btn"
          name="取消"
          type="wrong"
          @click="close"
        />
        <Btn
          class="win-btn"
          name="确认"
          :disable="inputData.required && (!inputData.fn || inputData.text.length < 1)"
          type="check"
          @click="onConfirmlClick"
        />
      </template>
    </window>
  </Popup>
</template>

<script lang="ts" setup>
import Popup from '@/components/Common/Popup.vue'
import Window from '@/components/Common/Window.vue'
import Btn from '@/components/Common/Btn.vue'
import { inputData } from './'
import { confirmCallback } from '@/assets/scripts/popup'

const inputDom = ref<HTMLInputElement | null>(null)

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

watch(
  () => props.index,
  () => {
    if (props.index !== -1) {
      nextTick(() => {
        inputDom.value?.focus()
      })
    }
  }
)

const onTextareaEnter = (e: KeyboardEvent) => {
  if (inputData.textarea && e.ctrlKey) onConfirmlClick()
}

const onConfirmlClick = () => {
  if (inputData.required && inputData.text.length < 1) return false

  inputData.fn?.(inputData.text || inputData.placeholder || '')
  close()
  return true
}

confirmCallback[props.name] = onConfirmlClick
</script>

<style lang="stylus" scoped>
.input
  display flex
  flex 1
  justify-content center
  align-items center
  margin 40px 110px

  input
    flex 1
    box-sizing border-box
    padding 5px 60px
    height 90px
    outline none
    border 2px solid #666
    border-radius 45px
    background #c7c7c7
    font-size 50px

.textarea
  display flex
  flex 1
  justify-content center
  align-items center
  margin 40px 0px

  textarea
    box-sizing border-box
    padding 15px 50px
    width 100%
    height 600px
    outline none
    border 2px solid #666
    border-radius 19px
    border-radius 45px
    background #c7c7c7
    font-size 50px
    resize none

.tip
  padding 10px
  background #b4b4b4
  text-align center
  font-size 40px
</style>
