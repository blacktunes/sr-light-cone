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
          src="@/assets/images/星.webp"
          alt=""
        />
      </div>
    </div>
    <div
      v-if="level"
      class="figure"
    >
      <div class="line"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fateIcon } from '@/assets/scripts/images'
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
    z-index 1
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
    z-index 1
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
    z-index 1
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
  overflow hidden
  box-sizing border-box
  position relative
  margin 30px 20px
  cursor pointer
  height 630px
  width 400px
  background-color rgba(255, 255, 255, 0.1)
  border-top-right-radius 50px
  border 5px solid transparent

  &:hover
    border-color #fff

  .fate
    z-index 2
    position absolute
    top 30px
    left 30px
    width 60px

  .light-cone
    z-index 2
    position absolute
    top 42%
    left 50%
    transform translate(-50%, -50%) rotate3d(0, -1, 1, 10deg) scale(0.3)

  .info
    z-index 2
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

  .figure
    box-sizing border-box
    position absolute
    right -60px
    bottom 5px
    width 200px
    height 40px
    transform rotate(-45deg)
    border 4px solid rgba(255, 255, 255, 0.1)
    border-left none
    border-right none

    .line
      position absolute
      right 0
      bottom 12px
      border-top 4px solid rgba(255, 255, 255, 0.1)
      width 100%
</style>
@/assets/scripts/images