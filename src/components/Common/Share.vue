<template>
  <div class="share">
    <Icon
      name="ring"
      class="ring"
    />
    <Icon
      name="share"
      class="icon"
      color="#000"
    />
  </div>
</template>

<script lang="ts" setup>
import Icon from './Icon.vue'
</script>

<style lang="stylus" scoped>
.share
  display flex
  justify-content center
  align-items center
  width 90px
  height 90px
  border-radius 50%
  background #f2f2f4
  box-shadow 0 0 5px rgba(255, 255, 255, 0.8)
  transition 0.2s

  .ring
    z-index 1
    position absolute

  .icon
    z-index 2
    margin 5px 5px 0 0
</style>
