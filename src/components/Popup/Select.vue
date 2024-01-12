<template>
  <window
    :title="selectData.title"
    width="65%"
    confirm
    :show="popup.select"
    @close="popup.select = false"
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
        @click="popup.select = false"
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
</template>

<script lang="ts" setup>
import Window from '@/components/Common/Window.vue'
import Btn from '@/components/Common/Btn.vue'
import { popup, popupCallbalk, selectData } from '@/store/popup'
import { watch } from 'vue'

watch(
  () => popup.select,
  () => {
    if (!popup.select) {
      reset()
    }
  }
)

const reset = () => {
  selectData.title = ''
  selectData.list = []
  selectData.select = undefined
  selectData.fn = undefined
}

const onConfirmlClick = () => {
  selectData.fn?.()
  popup.select = false
  return true
}

popupCallbalk.select = onConfirmlClick
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
