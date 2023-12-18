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
  box-sizing border-box
  display flex
  align-items center
  height 150px
  padding 10px 30px
  margin-bottom 30px
  color #b4b5b9
  user-select none

  &:hover
    .icon
      background-color #3d414d
      border-color #86888f

    .name
      color #e6e6e8

  &:active
    .icon
      margin-right 30px
      background-color #030306
      border-color #fccf73

    .name
      color #fccf73

  .icon
    position relative
    display flex
    align-items center
    justify-content center
    width 110px
    height 110px
    margin-right 25px
    border-radius 50%
    border 3px solid transparent

    .img
      width 85px
      height 85px

    .svg
      color #fff
      transform rotate(90deg)
      margin 5px 0 0 5px

  .name
    font-size 44px

.highlight
  &:hover
    .icon
      background-color #fff

    .name
      color #e6e6e8

  .icon
    background-color #fff
    margin-right 30px

    &:after
      content ''
      position absolute
      left 50%
      bottom 50%
      height 140%
      width 140%
      border-radius 50%
      transform translate(-50%, 50%)
      background url('@/assets/images/边框.webp')
      background-size 100%
      animation highlight-rotate 30s linear infinite
      filter invert(1)

    .img, .svg
      filter invert(1)

  .name
    color #fff

@keyframes highlight-rotate
  from
    transform translate(-50%, 50%) rotate(0deg)

  to
    transform translate(-50%, 50%) rotate(360deg)
</style>
