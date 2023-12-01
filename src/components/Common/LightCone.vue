<template>
  <div class="light-cone">
    <div class="top">
      <div class="front"></div>
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
        backgroundColor: image ? '' : 'transparent'
      }"
    >
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        v-if="!image"
      >
        <path
          d="M409.6 409.6V102.4a102.4 102.4 0 1 1 204.8 0V409.6h307.2a102.4 102.4 0 1 1 0 204.8H614.4v307.2a102.4 102.4 0 1 1-204.8 0V614.4H102.4a102.4 102.4 0 1 1 0-204.8H409.6z"
          fill="#5F5F5F"
        ></path>
      </svg>
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
defineProps<{
  image?: string
}>()
</script>

<style lang="stylus" scoped>
.light-cone
  position relative
  width 850px
  height 1200px
  transform-style preserve-3d
  transition 0.4s
  cursor pointer

  &:hover
    .image
      mask-position top
      -webkit-mask-position top

  .top
    top -20px
    left 15px

    [class^='border']
      background rgba(255, 255, 255, 0.5)

    .front
      background-color rgba(255, 255, 255, 0.1)

    .back
      position absolute
      top 50%
      left 50%
      width 96%
      height 97%
      transform translate(-50%, -50%)
      border 5px solid #786f57
      border-radius 15px
      box-sizing border-box
      transform translate3d(calc(-50% - 50px), calc(-50% - 20px), 50px)

  .bottom
    top 70px
    left 75px
    transform translateZ(-150px) scaleX(0.95)

    [class^='border']
      background rgba(255, 255, 255, 0.7)

    .front
      background-color rgba(0, 0, 0, 0.2)

  .top, .bottom
    position absolute
    width 100%
    height 100%
    transform-style preserve-3d

    .front
      width 100%
      height 100%
      clip-path polygon(0% 2%, 2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%)

    .front, [class^='border']
      position absolute
      top -20px
      left -50px
      backface-visibility inherit
      box-sizing border-box

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
      transform translate3d(807px, 5px, 75px) rotateY(-90deg) rotateX(-45deg)
      transform-origin top

  .mask
    display flex
    justify-content center
    align-items center
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-color #000
    transform-style preserve-3d
    transform translateZ(-50px)

  .image
    z-index 5
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    border 15px solid #d8cdd2
    box-sizing border-box
    // backface-visibility hidden
    -webkit-mask linear-gradient(135deg, #000c 40%, #000, #000c 60%) 100% 100% / 250% 250%
    mask-position bottom
    -webkit-mask-position bottom
    transition 0.4s

    img
      width 100%
      height 100%
      object-fit cover
</style>
