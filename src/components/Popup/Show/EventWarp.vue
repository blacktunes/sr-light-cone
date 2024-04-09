<template>
  <div
    class="show-view"
    v-if="currentLightCone"
    @click.stop="elementShow.mask = !elementShow.mask"
    ref="viewDom"
  >
    <div
      class="effects"
      ref="effectsDOm"
    >
      <div class="star-view"></div>
      <Transition name="mask">
        <div
          class="mask-view"
          v-show="currentLightCone.image && elementShow.mask"
        ></div>
      </Transition>
      <div class="light-view"></div>
      <Transition
        name="rainbow"
        appear
      >
        <img
          src="@/assets/images/彩虹.webp"
          alt=""
          class="rainbow"
        />
      </Transition>
    </div>
    <Transition
      name="info"
      appear
    >
      <div
        class="info"
        @click.stop
        v-if="currentLightCone.image"
      >
        <img
          src="@/assets/images/光锥.webp"
          alt=""
          class="label"
        />
        <div class="name-box">
          <img
            :src="fateFullIcon[currentLightCone.type]"
            alt=""
            class="type"
            @click.stop="onTypeClick"
          />
          <div class="name-content">
            <div class="name">
              <span @click.stop="onNameClick">
                {{ currentLightCone.name }}
              </span>
              <img
                class="new"
                src="@/assets/images/new.webp"
                alt=""
                :class="[currentLightCone.new ? 'show' : 'hide']"
                @click.stop="onNewFlagClick"
              />
            </div>
            <div
              class="level"
              @click.stop="onLevelClick"
            >
              <Icon
                v-for="(_, index) in currentLightCone.level"
                :key="index"
                name="star"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <Transition
      name="extra"
      appear
    >
      <div class="extra">
        <img
          :src="extraImage"
          alt=""
          :class="[elementShow.extra ? 'show' : 'hide']"
          @click.stop="elementShow.extra = !elementShow.extra"
        />
      </div>
    </Transition>
    <Transition
      name="light-cone"
      appear
    >
      <div class="light-cone-box">
        <LightCone
          class="light-cone"
          @click.stop="onImageClick"
          :image="currentLightCone.image"
        />
      </div>
    </Transition>
    <MenuBtn
      v-show="!isLoading()"
      class="share-btn"
      name="share"
      @click.stop="onShareClick(viewDom)"
    />
    <Close
      v-show="!isLoading()"
      class="close-btn"
      @click.stop="$emit('close')"
      color="#fff"
    />
  </div>
</template>

<script lang="ts" setup>
import LightCone from '@/components/Common/LightCone.vue'
import Icon from '@/components/Common/Icon.vue'
import MenuBtn from '@/components/Common/MenuBtn.vue'
import Close from '@/components/Common/Close.vue'
import { currentLightCone } from '@/store/data'
import { fateFullIcon } from '@/assets/scripts/images'
import r from '@/assets/images/r.webp'
import sr from '@/assets/images/sr.webp'
import ssr from '@/assets/images/ssr.webp'
import { emitter } from '@/assets/scripts/event'
import { isLoading } from '@/assets/scripts/popup'
import { onNameClick, onTypeClick, onLevelClick, onImageClick, onShareClick } from './utils'

defineEmits<{
  (event: 'close'): void
}>()

const viewDom = ref<HTMLElement | null>(null)
const effectsDOm = ref<HTMLElement | null>(null)

const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

const triangleColor = computed(() => {
  switch (currentLightCone.value?.level) {
    case 4:
      return '#af86fe'
    case 5:
      return '#ffcf70'
    default:
      return '#fff'
  }
})

onMounted(async () => {
  if (!currentLightCone.value) return
  await nextTick()
  if (effectsDOm.value) {
    const starView = effectsDOm.value.querySelector('.star-view')
    if (starView) {
      for (let i = 0; i < 30; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        star.style.left = `${getRandom(5, 90)}%`
        star.style.top = `${getRandom(5, 90)}%`
        star.style.transform = `scale(${Math.random()})`
        star.style.animationDelay = `${Math.random() * 3}s`
        star.style.animationDuration = `${getRandom(2, 5)}s`
        starView.appendChild(star)
      }
    }

    if (starView) {
      for (let i = 0; i < 10; i++) {
        const triangleBox = document.createElement('div')
        triangleBox.className = 'triangle'
        triangleBox.style.left =
          Math.random() > 0.5 ? `${getRandom(10, 40)}%` : `${getRandom(60, 90)}%`
        triangleBox.style.top =
          Math.random() > 0.5 ? `${getRandom(10, 40)}%` : `${getRandom(60, 90)}%`
        triangleBox.style.transform = `scale(${Math.random()}) rotate(${getRandom(0, 90)}deg)`

        const triangle = document.createElement('div')
        triangle.style.animationDelay = `${Math.random() * 2}s`
        triangle.style.animationDuration = `${getRandom(6, 10)}s`

        triangleBox.appendChild(triangle)
        starView.appendChild(triangleBox)
      }
    }

    // TODO 随机光效
    // const lightView = effectsDOm.value.querySelector('.light-view')
    // if (lightView) {
    //   let first = true
    //   for (let i = 0; i < 5; i++) {
    //     const light = document.createElement('div')
    //     light.className = 'light'
    //     const setLight = () => {
    //       const delay = first ? getRandom(1000, 2000) : getRandom(2000, 5000)
    //       first = false
    //       const duration = getRandom(3000, 4000)
    //       light.style.width = `${getRandom(50, 90)}px`
    //       light.style.height = `${getRandom(40, 70)}%`
    //       light.style.left = `${getRandom(5, 95)}%`
    //       if (light.style.animationName === 'flash') {
    //         light.style.animationName = 'flash-2'
    //       } else {
    //         light.style.animationName = 'flash'
    //       }
    //       light.style.animationDelay = `${delay}ms`
    //       light.style.animationDuration = `${duration}ms`
    //       setTimeout(() => {
    //         setLight()
    //       }, delay + duration)
    //     }
    //     setLight()
    //     lightView.appendChild(light)
    //   }
    // }
  }
})

const extraImage = computed(() => {
  if (!currentLightCone.value) return ''

  switch (currentLightCone.value.level) {
    case 3:
      return r
    case 4:
      return sr
    case 5:
      return ssr
    default:
      return ''
  }
})

const elementShow = reactive({
  mask: true,
  extra: true
})

const onNewFlagClick = () => {
  if (!currentLightCone.value) return

  if (currentLightCone.value.new) {
    currentLightCone.value.new = false
  } else {
    currentLightCone.value.new = true
  }
}

onMounted(() => {
  emitter.on('screenshot', () => onShareClick(viewDom.value))
})

onUnmounted(() => {
  emitter.off('screenshot')
})
</script>

<style lang="stylus" scoped>
.show-view
  position relative
  z-index 9
  display flex
  justify-content center
  align-items center
  overflow hidden
  width 100%
  height 100%
  background rgb(0, 0, 15)
  box-shadow 0 0 20px 20px rgba(0, 0, 0, 0.7) inset

  &:hover
    .share-btn
      opacity 1

    .close-btn
      opacity 0.9

  &:before
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    z-index 1
    background #000
    background-image url('@/assets/images/背景.webp')
    background-size cover
    background-repeat no-repeat
    content ''
    opacity 0.4

  .effects
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    z-index 2

    .star-view
      position absolute
      top 50%
      left 50%
      padding-bottom 100%
      width 100%
      height 0
      animation view-rotate 300s linear infinite

    .mask-view
      position absolute
      bottom 0
      left 0
      width 100%
      height 35%
      background linear-gradient(to top, #d7e1ed, #596688, transparent)

    .light-view
      position absolute
      top 0
      right 0
      bottom 0
      left 0

    .rainbow
      position absolute
      right 0
      bottom 400px
      bottom 300px
      opacity 0.5

  .info
    position absolute
    top 45%
    left 280px
    z-index 3
    display flex
    flex-direction column

    &:hover
      .new
        opacity 0.3

    .label
      margin 0 0 5px 285px
      width 210px

    .name-box
      display flex
      justify-content center
      align-items center
      padding 5px 100px
      height 170px
      background linear-gradient(to right, transparent 0%, #000, #000, transparent)

      .type
        width 170px
        height 170px
        filter invert(1)

        &:hover
          filter invert(90%) sepia(24%) saturate(1041%) hue-rotate(329deg) brightness(97%) contrast(103%)

      .name-content
        display flex
        flex-direction column
        margin-left 10px

        .name
          display flex
          align-items center
          user-select none

          span
            overflow hidden
            min-width 30px
            max-width 550px
            height 85px
            color #fff
            text-overflow ellipsis
            white-space nowrap
            font-size 60px

            &:hover
              color var(--text-highlight-color)

          .new
            width 100px
            transition 0.2s
            transform translate(10px, 5px)

        .level
          margin 10px 0 5px

  .extra
    position absolute
    right 0
    bottom 20%
    z-index 4

    img
      transition 0.2s

    &:hover
      img
        opacity 0.3

  .light-cone-box
    z-index 4

    .light-cone
      transform rotate3d(1, -1, 1, 15deg) scale(0.7)

      &:hover
        transform rotate3d(1, -1, 1, 10deg) scale(0.7)

        :deep(.top)
          .front
            &:after
              top 0
              left 0

  .share-btn
    position absolute
    right 5%
    bottom 5%
    z-index 4
    opacity 0

  .close-btn
    position absolute
    top 30px
    right 50px
    z-index 9
    color #eee
    opacity 0
    transition 0.2s

.light-cone-enter-active
  transition opacity 0.7s, transform 0.35s

.light-cone-enter-from
  opacity 0
  transform scale(3)

.rainbow-enter-active
  transition opacity 1s
  transition-delay 0.2s

.rainbow-enter-from
  opacity 0 !important

.info-enter-active
  transition opacity 0.5s, transform 0.35s
  transition-delay 0.5s

.info-enter-from
  opacity 0
  transform translateX(30%)

.extra-enter-active
  transition all 0.3s
  transition-delay 0.5s

.extra-enter-from
  transform translateX(100%)

.mask-enter-active
.mask-leave-active
  transition all 0.3s linear

.mask-enter-from
.mask-leave-to
  opacity 0
  transform translateY(50%)

@keyframes view-rotate
  0%
    transform translate(-50%, -50%) rotate(0deg)

  100%
    transform translate(-50%, -50%) rotate(360deg)
</style>

<style lang="stylus">
.star
  position absolute
  width 10px
  height 10px
  border-radius 50%
  background-color #fff
  box-shadow 0 0 5px 5px rgba(255, 255, 255, 0.7)
  opacity 0
  animation flash linear infinite alternate

.triangle
  position absolute

  div
    width 70px
    height 70px
    background-color v-bind(triangleColor)
    opacity 0
    animation triangle linear infinite alternate
    clip-path polygon(50% 50%, 0% 100%, 100% 100%)

.light
  position absolute
  bottom 0
  background linear-gradient(to top, rgba(255, 255, 255, 0.5) 50%, transparent)
  opacity 0
  //animation-timing-function linear

@keyframes flash
  0%
    opacity 0

  50%
    opacity 1

  100%
    opacity 0

@keyframes flash-2
  0%
    opacity 0

  50%
    opacity 1

  100%
    opacity 0

@keyframes triangle
  0%
    opacity 0
    transform rotate(0deg)

  50%
    opacity 0.5

  100%
    opacity 0
    transform rotate(90deg)
</style>
