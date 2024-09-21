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
    <a
      href="https://sr.shenmedouyou.top/"
      target="_blank"
      title="短信编辑器"
      style="margin: -10px 0"
    >
      <Icon
        class="icon"
        name="message"
      />
    </a>
    <div class="sep"></div>
    <div title="数据管理">
      <Icon
        class="icon"
        name="data"
        @click.stop="popupManager.open('data')"
      />
    </div>
    <div class="sep"></div>
    <div title="设置">
      <Icon
        class="icon setting"
        name="setting"
        @click.stop="popupManager.open('setting')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from './Common/Icon.vue'
import { popupManager } from '@/assets/scripts/popup'
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

  .setting
    &:hover
      animation enter-rotate 1s

@keyframes enter-rotate
  0%
    transform rotate(0deg)

  100%
    transform rotate(120deg)
</style>
