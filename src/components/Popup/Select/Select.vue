<template>
  <Popup :index="index">
    <window
      :title="selectData.title"
      width="65%"
      confirm
      @close="close"
    >
      <div class="select-list">
        <div
          class="select"
          :class="{ highlight: item === selectData.select }"
          v-for="item in selectData.list"
          :key="item"
          @click.stop="selectData.select = item"
        >
          <span>
            {{ item }}
          </span>
          <div class="radio"></div>
        </div>
      </div>
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
          type="check"
          :disable="!selectData.select"
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
import { enterCallback } from '@/assets/scripts/popup'
import { selectData } from './'

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

const onConfirmlClick = () => {
  selectData.fn?.()
  close()
  return true
}

enterCallback[props.name] = onConfirmlClick
</script>

<style lang="stylus" scoped>
.select-list
  flex 1
  display flex
  flex-wrap wrap
  align-content flex-start
  margin 30px 0 10px 0

  .select
    box-sizing border-box
    display flex
    align-items center
    justify-content space-between
    width 32%
    height 90px
    font-size 46px
    margin-bottom 30px
    padding 0 30px 0 20px
    background #eee
    border 2px solid transparent
    box-shadow 0px 0px 5px 0px rgba(0, 0, 0, 0.2)
    user-select none

    &:hover
      border-color #aaa

    &:nth-child(3n+2)
      margin-left 2%
      margin-right 2%

    .radio
      box-sizing border-box
      width 45px
      height 45px
      background-color #d6d6d6
      border 2px solid #adadad
      border-radius 50%

.highlight
  .radio
    display flex
    align-items center
    justify-content center
    background-color #fff !important
    border 5px solid #ec9a37 !important

    &:after
      content ''
      display block
      width 25px
      height 25px
      border-radius 50%
      background-color #ec9a37
</style>
