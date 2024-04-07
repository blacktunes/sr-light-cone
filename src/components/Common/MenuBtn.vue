<template>
  <div class="menu-btn">
    <Icon
      name="ring"
      class="ring"
    />
    <Icon
      :name="name"
      class="icon"
      color="#000"
    />
  </div>
</template>

<script lang="ts" setup>
import Icon from './Icon.vue'

defineProps<{
  name: string
}>()
</script>

<style lang="stylus" scoped>
.menu-btn
  display flex
  justify-content center
  align-items center
  width 90px
  height 90px
  border-radius 50%
  background #f2f2f4
  transition 0.2s

  &:hover
    box-shadow 0 0 0px 5px rgba(255, 255, 255, 0.5)

  .ring
    position absolute
    z-index 1

  .icon
    z-index 2
    margin 5px 5px 0 0
</style>
