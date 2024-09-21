<template>
  <div class="light-cone">
    <div class="top">
      <div class="front">
        <slot></slot>
      </div>
      <div class="back"></div>
      <div class="border-1"></div>
      <div class="border-2"></div>
      <div class="border-3"></div>
      <div class="border-4"></div>
      <div class="border-5"></div>
      <div class="border-6"></div>
      <div class="border-7"></div>
      <div class="border-8"></div>
    </div>
    <div class="image">
      <img
        :src="image"
        alt=""
      />
    </div>
    <div
      class="mask"
      :style="{
        backgroundColor: image !== undefined ? '' : 'transparent'
      }"
    >
      <Icon
        name="add"
        v-if="image === undefined"
      />
    </div>
    <div class="bottom">
      <div class="front"></div>
      <div class="border-1"></div>
      <div class="border-2"></div>
      <div class="border-3"></div>
      <div class="border-4"></div>
      <div class="border-5"></div>
      <div class="border-6"></div>
      <div class="border-7"></div>
      <div class="border-8"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from './Icon.vue'

defineProps<{
  image?: string
}>()
</script>

<style lang="stylus" scoped>
.light-cone
  position relative
  width 850px
  height 1200px
  transition 0.4s
  transform-style preserve-3d

  .top
    top -20px
    left 15px
    z-index 4

    [class^='border']
      background rgba(255, 255, 255, 0.5)

    .front
      // background-color rgba(255, 255, 255, 0.1)
      position relative

      &:after
        position absolute
        top -100%
        left -100%
        width 200%
        height 200%
        background linear-gradient(-45deg, transparent, transparent, rgba(255, 255, 255, 0.2), transparent, transparent)
        content ''
        transition 0.3s

    .back
      position absolute
      top 50%
      left 50%
      box-sizing border-box
      width 96%
      height 97%
      border 8px solid #cec7b2
      border-radius 15px
      transform translate(-50%, -50%)
      transform translate3d(calc(-50% - 50px), calc(-50% - 20px), 50px)

  .bottom
    top 70px
    left 75px
    z-index 1
    transform translateZ(-150px) scaleX(0.95)

    [class^='border']
      background rgba(255, 255, 255, 0.7)

    .front
      background-color rgba(0, 0, 0, 0.2)

  .top
  .bottom
    position absolute
    width 100%
    height 100%
    pointer-events none
    transform-style preserve-3d

    .front
      width 100%
      height 100%
      clip-path polygon(0% 2%, 2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%)

    .front
    [class^='border']
      position absolute
      top -20px
      left -50px
      box-sizing border-box
      backface-visibility inherit

    .front
      position relative
      transform translateZ(100px)

    .border-1
      width 50px
      height 96%
      transform translate3d(830px, 2%, 75px) rotateY(90deg)

    .border-2
      width 50px
      height 32px
      transform translate3d(830px, 1175px, 75px) rotateY(-90deg) rotateX(45deg)
      transform-origin top

    .border-3
      width 96%
      height 50px
      transform translate3d(2%, 1175px, 75px) rotateX(-90deg)

    .border-4
      width 50px
      height 26px
      transform translate3d(-20px, 1175px, 75px) rotateY(-90deg) rotateX(-28deg)
      transform-origin top

    .border-5
      width 50px
      height 96%
      transform translate3d(-20px, 2%, 75px) rotateY(90deg)

    .border-6
      width 50px
      height 21px
      transform translate3d(-5px, 7px, 75px) rotateY(-90deg) rotateX(43deg)
      transform-origin top

    .border-7
      width 96%
      height 50px
      transform translate3d(2%, -20px, 75px) rotateX(-90deg)

    .border-8
      width 50px
      height 30px
      transform translate3d(807px, 5px, 75px) rotateY(-91deg) rotateX(-45deg)
      transform-origin top

  .mask
    position absolute
    top 0
    left 0
    z-index 2
    display flex
    justify-content center
    align-items center
    width 100%
    height 100%
    background-color #000
    transform translateZ(-50px)
    transform-style preserve-3d

  .image
    position absolute
    top 0
    left 0
    z-index 3
    box-sizing border-box
    width 100%
    height 100%
    border 15px solid #d8cdd2
    transition 0.4s
    transform translateZ(0)

    img
      width 100%
      height 100%
      object-fit cover
</style>
