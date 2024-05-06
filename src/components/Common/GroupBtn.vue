<template>
  <div
    class="group"
    :class="{ highlight }"
  >
    <div class="icon">
      <Icon
        v-if="type === '全部'"
        class="svg"
        name="all"
      />
      <img
        v-else
        class="img"
        :src="fateIcon[type]"
        alt=""
      />
    </div>
    <div class="name">{{ type }}</div>
  </div>
</template>

<script lang="ts" setup>
import { fateIcon } from '@/assets/scripts/images'
import Icon from './Icon.vue'

defineProps<{
  type: '全部' | Fate
  highlight?: boolean
}>()
</script>

<style lang="stylus" scoped>
.group
  display flex
  align-items center
  box-sizing border-box
  margin 15px 0
  padding 10px 30px
  height 150px
  color #b4b5b9
  font-weight bold
  user-select none

  &:hover
    .icon
      border-color #86888f
      background-color #3d414d

    .name
      color #e6e6e8

  &:active
    .icon
      margin-right 30px
      border-color #fccf73
      background-color #030306

    .name
      color #fccf73

  .icon
    position relative
    display flex
    justify-content center
    align-items center
    margin-right 25px
    width 110px
    height 110px
    border 3px solid transparent
    border-radius 50%

    .img
      width 85px
      height 85px

    .svg
      margin 5px 0 0 5px
      color #fff
      transform rotate(90deg)

  .name
    font-size 44px

.highlight
  &:hover
    .icon
      background-color #fff

    .name
      color #e6e6e8

  .icon
    margin-right 30px
    background-color #fff

    &:after
      position absolute
      bottom 50%
      left 50%
      width 140%
      height 140%
      border-radius 50%
      background url('@/assets/images/边框.webp')
      filter invert(1)
      background-size 100%
      content ''
      transform translate(-50%, 50%)
      animation highlight-enter-rotate 1s, highlight-rotate 30s linear 1s infinite

    .img
    .svg
      filter invert(1)

  .name
    color #fff

@keyframes highlight-enter-rotate
  0%
    transform translate(-50%, 50%) rotate(0deg)

  100%
    transform translate(-50%, 50%) rotate(340deg)

@keyframes highlight-rotate
  from
    transform translate(-50%, 50%) rotate(-20deg)

  to
    transform translate(-50%, 50%) rotate(360deg)
</style>
