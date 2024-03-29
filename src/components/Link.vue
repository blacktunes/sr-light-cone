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
        @click.stop="openWindow('log')"
        name="log"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from './Common/Icon.vue'
import { openWindow } from '@/assets/scripts/popup'
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
