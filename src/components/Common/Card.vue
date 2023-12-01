<template>
  <div
    class="card"
    :class="[level ? `level-${level}` : undefined]"
  >
    <img
      :src="type ? fateIcon[type] : undefined"
      alt=""
      class="fate"
    />
    <LightCone
      :image="image"
      class="light-cone"
    />
    <div class="info">
      <div class="name">{{ name }}</div>
      <div class="level">
        <img
          class="level-star"
          v-for="(_, index) in level"
          :key="index"
          src="@/assets/星.webp"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fateIcon } from '@/assets/images'
import LightCone from './LightCone.vue'

defineProps<{
  name: string
  image?: string
  level?: number
  type?: Fate
}>()
</script>

<style lang="stylus" scoped>
.level-3
  &:before
    content ''
    box-sizing border-box
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    background linear-gradient(to top, #699ded94, transparent 30%)
    border-bottom 15px solid #699ded
    border-top-right-radius 50px

.level-4
  &:before
    content ''
    box-sizing border-box
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    background linear-gradient(to top, #af86fe94, transparent 30%)
    border-bottom 15px solid #af86fe
    border-top-right-radius 50px

.level-5
  &:before
    content ''
    box-sizing border-box
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    background linear-gradient(to top, #ffcf7094, transparent 30%)
    border-bottom 15px solid #ffcf70
    border-top-right-radius 50px

.card
  box-sizing border-box
  position relative
  margin 30px 20px
  cursor pointer
  height 630px
  width 400px
  background-color rgba(255, 255, 255, 0.1)
  border-top-right-radius 50px

  &:hover
    &:after
      content ''
      box-sizing border-box
      position absolute
      top -5px
      right -5px
      bottom -5px
      left -5px
      border 5px solid #fff
      border-top-right-radius 50px

  .fate
    position absolute
    top 30px
    left 30px
    width 60px

  .light-cone
    position absolute
    top 42%
    left 50%
    transform translate(-50%, -50%) rotate3d(0, -1, 1, 10deg) scale(0.3)

  .info
    display flex
    flex-direction column
    justify-content center
    align-items center
    position absolute
    bottom 30px
    left 50%
    transform translateX(-50%)
    width 100%

    .name
      color #fff
      font-size 46px
      margin-bottom 20px

    .level
      height 32px

      .level-star
        width 32px
        height 32px
</style>
