<template>
  <div class="link">
    <a
      href="https://github.com/blacktunes/sr-light-cone"
      target="_blank"
    >
      <Icon
        class="icon"
        name="github"
      />
    </a>
    <div class="sep"></div>
    <a
      href="https://space.bilibili.com/1384118"
      target="_blank"
    >
      <Icon
        class="icon"
        name="bilibili"
      />
    </a>
    <div class="sep"></div>
    <div>
      <Icon
        style="margin-top: 5px"
        class="icon"
        title="更新记录"
        @click.stop="popup.open('log')"
        name="log"
      />
    </div>
    <div class="sep"></div>
    <div>
      <Icon
        style="margin-top: 3px"
        class="icon"
        title="切换模式"
        @click.stop="changeMode"
        name="mode"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { setting, setShowMode } from '@/store/data'
import Icon from './Common/Icon.vue'
import { popup } from '@/assets/scripts/popup'

const changeMode = () => {
  popup.open('confirm', {
    title: '切换展示界面',
    text: [`是否切换为${setting.details ? '跃迁' : '智库'}界面`],
    fn: () => {
      setShowMode()
    }
  })
}
</script>

<style lang="stylus" scoped>
.link
  position absolute
  right 130px
  bottom 110px
  display flex
  flex-direction column
  justify-content flex-end
  align-items center
  box-sizing border-box

  .sep
    margin 20px 0
    width 10px
    height 10px
    border-radius 50%
    background #666

  .icon
    color #eee
    opacity 0.3
    transition 0.2s

    &:hover
      opacity 1
</style>
