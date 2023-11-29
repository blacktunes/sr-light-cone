<template>
  <div class="link">
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

<script lang="ts" setup></script>

<style lang="stylus" scoped>
.link
  position absolute
  bottom -80px
  display flex
  width 100%
  justify-content center

  a, span
    color #eee
    font-size 50px
    user-select none

  a
    text-decoration none

  span
    margin 0 10px
</style>
