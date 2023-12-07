<template>
  <div class="link">
    <div
      class="log"
      title="更新记录"
      @click="openWindow('log')"
    >
      <Icon name="log" />
    </div>
    <a
      href="https://github.com/blacktunes/sr-light-cone"
      target="_blank"
    >
      Github
    </a>
    <span>·</span>
    <a
      href="https://space.bilibili.com/1384118"
      target="_blank"
    >
      BiliBili
    </a>
  </div>
</template>

<script lang="ts" setup>
import Icon from './Common/Icon.vue'
import { openWindow } from '@/store/popup'
</script>

<style lang="stylus" scoped>
.link
  position absolute
  bottom -80px
  display flex
  width 100%
  justify-content center

  &:hover
    .log
      opacity 1

  a, span
    color #eee
    font-size 50px
    user-select none

  a
    text-decoration none

  span
    margin 0 10px

  .log
    position absolute
    top 0
    right 30px
    display flex
    justify-content center
    align-items center
    height 80px
    width 80px
    color #eee
    opacity 0.3
    transition 0.2s
    cursor pointer

    &:hover
      opacity 1
</style>
