<template>
  <div
    class="card"
    :class="[level ? `level-${level}` : undefined]"
    @contextmenu.prevent="image && type && level ? $emit('delete') : undefined"
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
        <Icon
          v-for="(_, index) in level"
          :key="index"
          name="star"
          width="32"
          height="32"
        />
      </div>
    </div>
    <div
      v-if="image && type && level"
      class="figure"
    >
      <div class="line-box">
        <div class="line"></div>
      </div>
    </div>
    <Icon
      v-if="image && type && level"
      class="del"
      name="delete"
      @click.stop="$emit('delete')"
    />
    <img
      v-if="image && type && level && !viewed"
      class="new"
      src="@/assets/images/new.webp"
      alt=""
    />
  </div>
</template>

<script lang="ts" setup>
import { fateIcon } from '@/assets/scripts/images'
import LightCone from './LightCone.vue'
import Icon from './Icon.vue'

defineProps<{
  name: string
  image?: string
  level?: number
  type?: Fate
  viewed?: boolean
}>()

defineEmits<{
  (event: 'delete'): void
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
  box-sizing border-box
  position relative
  margin 50px 20px 5px 20px
  height 645px
  width 360px
  background-color rgba(100, 100, 100, 0.1)
  border-top-right-radius 50px
  border 5px solid transparent

  &:nth-child(-n+6)
    margin-top 15px !important

  &:hover
    border-color #fff
    background-color rgba(100, 100, 100, 0.4)

    .del
      opacity 1

  .fate
    z-index 2
    position absolute
    top 30px
    left 30px
    width 65px

  .light-cone
    z-index 2
    position absolute
    top 43%
    left 50%
    transform translate(-50%, -50%) rotateX(5deg) rotateY(-5deg) rotate(15deg) scale(0.275)

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
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      color #fff
      width 90%
      text-align center
      font-size 46px
      margin-bottom 20px

    .level
      height 32px

  .figure
    overflow hidden
    position absolute
    bottom 0
    left 0
    width 100%
    height 100px

    .line-box
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

  .del
    z-index 5
    position absolute
    top 25px
    right 20px
    color #ddd
    opacity 0

    &:hover
      opacity 1

      +.new
        opacity 0

  .new
    z-index 9
    position absolute
    top -15px
    right -15px
    width 90px
    transition 0.2s
    pointer-events none
</style>
