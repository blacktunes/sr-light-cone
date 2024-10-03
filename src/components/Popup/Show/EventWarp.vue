<template>
  <div
    class="show-view"
    v-if="currentLightCone"
    @click.stop="elementShow.effects = !elementShow.effects"
    ref="viewDom"
  >
    <div class="bg"></div>
    <div
      class="effects"
      ref="effectsDOm"
    >
      <Transition name="fade">
        <div
          class="star-view"
          v-show="currentLightCone.image && elementShow.effects"
        >
          <div
            class="star"
            v-for="(item, index) in star"
            :key="`star-${index}`"
            :style="item"
          ></div>
        </div>
      </Transition>
      <Transition name="fade">
        <div
          class="triangle-view"
          v-show="currentLightCone.image && elementShow.effects"
        >
          <div
            class="triangle"
            v-for="(item, index) in triangle"
            :key="`triangle-${index}`"
            :style="item.pos"
          >
            <div :style="item.style"></div>
          </div>
        </div>
      </Transition>
      <template v-if="!gold">
        <Transition
          name="mask"
          appear-active-class="mask-appear-active"
          appear
        >
          <div
            class="mask"
            v-show="currentLightCone.image && elementShow.effects"
          ></div>
        </Transition>
        <Transition name="fade">
          <div
            class="light-view"
            v-show="currentLightCone.image && elementShow.effects"
          >
            <div
              class="light"
              v-for="(item, index) in light"
              :key="`light-${index}`"
              :style="item"
            ></div>
          </div>
        </Transition>
        <div
          class="ray-view"
          v-if="animation"
        >
          <img
            v-if="currentLightCone.level !== 5"
            class="figure"
            src="@/assets/images/figure.webp"
            alt=""
          />
          <div class="ring"></div>
          <img
            class="ray_1"
            src="@/assets/images/ray.webp"
            alt=""
          />
          <img
            class="ray_2"
            src="@/assets/images/ray.webp"
            alt=""
          />
        </div>
        <div
          class="figure-view"
          v-if="animation && currentLightCone.level === 5"
        >
          <img
            class="figure"
            src="@/assets/images/figure.webp"
            alt=""
          />
        </div>
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
      </template>
    </div>
    <template v-if="!gold">
      <Transition
        name="info"
        appear
        @after-appear="animation = false"
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
    </template>
    <Transition
      name="gold"
      appear
      @after-appear="gold = false"
      :duration="{ enter: 1000, leave: 0 }"
    >
      <div
        class="gold-animation-view"
        v-if="gold"
      >
        <div class="gold-animation">
          <img
            :src="fateFullIcon[currentLightCone.type]"
            alt=""
            class="animation-type"
          />
          <div class="light-group-1">
            <div class="animation-light"></div>
            <div class="animation-light"></div>
          </div>
          <div class="light-group-2">
            <div class="animation-light"></div>
            <div class="animation-light"></div>
          </div>
          <div class="light-group-3">
            <div class="animation-light"></div>
          </div>
          <div class="star-group-1">
            <Icon
              name="star"
              class="animation-star"
            />
            <Icon
              name="star"
              class="animation-star"
            />
          </div>
          <div class="star-group-2">
            <Icon
              name="star"
              class="animation-star"
            />
            <Icon
              name="star"
              class="animation-star"
            />
          </div>
          <div class="star-group-3">
            <Icon
              name="star"
              class="animation-star"
            />
          </div>
        </div>
      </div>
    </Transition>
    <MenuBtn
      :style="{ opacity: popupManager.isLoading() || animation ? 0 : undefined }"
      class="share-btn"
      name="share"
      @click.stop="createScreenshot(viewDom)"
    />
    <Close
      :style="{ opacity: popupManager.isLoading() || animation ? 0 : undefined }"
      class="close-btn"
      @click.stop="$emit('close')"
      color="#fff"
    />
  </div>
</template>

<script lang="ts" setup>
import r from '@/assets/images/r.webp'
import sr from '@/assets/images/sr.webp'
import ssr from '@/assets/images/ssr.webp'
import { emitter } from '@/assets/scripts/event'
import { createScreenshot } from '@/assets/scripts/file'
import { fateFullIcon } from '@/assets/scripts/images'
import { popupManager } from '@/assets/scripts/popup'
import Icon from '@/components/Common/Icon.vue'
import LightCone from '@/components/Common/LightCone.vue'
import MenuBtn from '@/components/Common/MenuBtn.vue'
import { currentLightCone } from '@/store/data'
import { Close } from 'star-rail-vue'
import { onImageClick, onLevelClick, onNameClick, onTypeClick } from './utils'

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

const rayColor = computed(() => {
  switch (currentLightCone.value?.level) {
    case 4:
      return '#cc00ff'
    case 5:
      return '#ffa900'
    default:
      return '#004eff'
  }
})

const getStarStyle = () => ({
  left: `${getRandom(5, 90)}%`,
  top: `${getRandom(5, 90)}%`,
  transform: `scale(${Math.random()})`,
  animationDelay: `${Math.random() * 3}s`,
  animationDuration: `${getRandom(2, 5)}s`
})
const star: ReturnType<typeof getStarStyle>[] = []
for (let i = 0; i < 30; i++) {
  star.push(getStarStyle())
}

const getTrianglePos = () => ({
  left: Math.random() > 0.5 ? `${getRandom(10, 40)}%` : `${getRandom(60, 90)}%`,
  top: Math.random() > 0.5 ? `${getRandom(10, 40)}%` : `${getRandom(60, 90)}%`,
  transform: `scale(${getRandom(50, 130) / 100}) rotate(${getRandom(0, 90)}deg)`
})
const getTriangleStyle = () => {
  return {
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${getRandom(6, 10)}s`
  }
}
const triangle: {
  pos: ReturnType<typeof getTrianglePos>
  style: ReturnType<typeof getTriangleStyle>
}[] = []
for (let i = 0; i < 7; i++) {
  triangle.push({
    pos: getTrianglePos(),
    style: getTriangleStyle()
  })
}

const getLightStyle = (i: number) => ({
  left: `${getRandom((i + 1) * 20, (i + 1) * 30)}%`,
  width: `${getRandom(45, 90)}px`,
  height: `${getRandom(50, 60)}%`,
  animationDuration: `${getRandom(4, 8)}s`,
  animationDelay: `${getRandom(10, 30) / 10}s`
})
const light: ReturnType<typeof getLightStyle>[] = []
const lightNum = getRandom(3, 5)
for (let i = 0; i < lightNum; i++) {
  light.push(getLightStyle(i))
}

const gold = ref(currentLightCone.value?.level === 5)
const animation = ref(true)

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
  effects: true,
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
  emitter.on('screenshot', () => createScreenshot(viewDom.value))
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

  .bg
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
    opacity 0.4

  .effects
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    z-index 2

    .star-view
    .triangle-view
      position absolute
      top 50%
      left 50%
      padding-bottom 100%
      width 100%
      height 0
      filter drop-shadow(0 0px 10px #fff)
      pointer-events none

    .star-view
      animation view-rotate 720s linear infinite

    .triangle-view
      animation view-rotate 360s linear infinite

    .mask
      position absolute
      bottom 0
      left 0
      width 100%
      height 40%
      background linear-gradient(to top, rgba(215, 225, 230, 0.7), rgba(90, 100, 135, 0.9) 45%, transparent)

    .light-view
      position absolute
      top 0
      right 0
      bottom 0
      left 0
      filter drop-shadow(0 0px 10px #fff)
      pointer-events none

    figure()
      .figure
        position absolute
        top 50%
        left 50%
        width 3200px
        height 3200px
        transform translate(-50%, -50%) scale(0)
        animation figure 1.4s forwards

    .ray-view
      position absolute
      top 0
      right 0
      bottom 0
      left 0
      filter drop-shadow(0 0px 10px v-bind(rayColor))
      pointer-events none
      figure()

      .ring
        position absolute
        top 50%
        left 50%
        width 0
        height 0
        border 0 solid rgba(255, 255, 255, 0.1)
        border-radius 50%
        transform translate(-50%, -50%)
        animation ring 1.5s forwards

      .ray_1
      .ray_2
        position absolute
        top 0
        left 0
        width 3200px
        height: (3200 / 16 * 9)px
        filter blur(10px)
        opacity 0
        animation ray 0.6s ease-out forwards

      .ray_1
        animation-delay 0.1s

      .ray_2
        transform rotateY(180deg)

    .figure-view
      position absolute
      top 0
      right 0
      bottom 0
      left 0
      filter drop-shadow(0 0px 10px #fff)
      pointer-events none
      figure()

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

  .gold-animation-view
    position absolute
    z-index 9
    display flex
    justify-content center
    align-items center
    background radial-gradient(farthest-corner at 50% 110%, #151c35, #000 45%)
    inset -5px

    .gold-animation
      display flex
      justify-content center
      align-items center
      width 100%
      height 100%

      .animation-type
        width 700px
        filter invert(1)
        opacity 0.3

      .animation-light
        height 100%
        background linear-gradient(to top, rgba(38, 45, 70, 0.5) 15%, transparent 50%, rgba(38, 45, 70, 0.5))
        transform scaleX(0.4)

      .light-group-1
      .light-group-2
      .light-group-3
        position absolute
        top 50%
        left 50%
        display flex
        height 100%
        transform translate(-50%, -50%)

      $group-gap-1 = 720px
      $group-width-1 = 140px
      $group-gap-2 = 360px
      $group-width-2 = 135px
      $group-width-3 = 330px

      .light-group-1
        gap $group-gap-1

        .animation-light
          width $group-width-1

      .light-group-2
        gap $group-gap-2

        .animation-light
          width $group-width-2

      .light-group-3
        .animation-light
          width $group-width-3

      .star-group-1
      .star-group-2
      .star-group-3
        position absolute
        top 50%
        left 50%
        display flex
        transform translate(-50%, -50%)

      .star-group-1
        gap $group-gap-1

        .animation-star
          width $group-width-1
          height $group-width-1
          filter drop-shadow(0 0 15px #fff)
          stroke-width 10px
          stroke rgba(255, 255, 255, 0.4)

          :deep(path)
            filter drop-shadow(0 0 15px #ffcf70)

      .star-group-2
        gap $group-gap-2

        .animation-star
          width $group-width-2
          height $group-width-2
          filter drop-shadow(0 0 15px #fff)
          stroke-width 10px
          stroke rgba(255, 255, 255, 0.4)

          :deep(path)
            filter drop-shadow(0 0 15px #ffcf70)

      .star-group-3
        animation animation-star 0.3s linear forwards
        animation-delay 0.3s

        .animation-star
          width 330px
          height 330px
          filter drop-shadow(0 0 20px #fff)
          stroke-width 10px
          stroke rgba(255, 255, 255, 0.4)

          :deep(path)
            filter drop-shadow(0 0 20px #ffcf70)

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

.star
  position absolute
  width 10px
  height 10px
  border-radius 50%
  background-color #ffcf70
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
    clip-path polygon(50% 50%, 20% 100%, 80% 100%)

.light
  position absolute
  bottom 0
  // background radial-gradient(ellipse at bottom, #fff, transparent)
  background linear-gradient(to top, rgba(255, 255, 255, 0.05) calc(100% - 100px), transparent)
  opacity 0
  animation light linear infinite

@keyframes view-rotate
  0%
    transform translate(-50%, -50%) rotate(0deg)

  100%
    transform translate(-50%, -50%) rotate(360deg)

@keyframes flash
  0%
    opacity 0

  50%
    opacity 0.7

  100%
    opacity 0

@keyframes light
  0%
    opacity 0
    transform scaleX(1)

  50%
    opacity 1
    transform scaleX(1)

  65%
    opacity 0
    transform scaleX(0.5)

  100%
    opacity 0
    transform scaleX(1)

@keyframes triangle
  0%
    opacity 0
    transform rotate(0deg) rotateY(0deg)

  50%
    opacity 0.5

  100%
    opacity 0
    transform rotate(90deg) rotateY(180deg)

@keyframes figure
  0%
    opacity 1
    transform translate(-50%, -50%) scale(0) rotate(0deg)

  15%
    opacity 1
    transform translate(-50%, -50%) scale(0.5) rotate(10deg)

  30%
    opacity 0.5
    transform translate(-50%, -50%) scale(0.9) rotate(20deg)

  80%
    opacity 0.1
    transform translate(-50%, -50%) scale(2.5) rotate(45deg)

  100%
    opacity 0
    transform translate(-50%, -50%) scale(2.5) rotate(45deg)

@keyframes ring
  0%
    width 0px
    height 0px

  30%
    width 1200px
    height 1200px
    border 800px solid rgba(255, 255, 255, 0.1)

  80%
    width 3000px
    height 3000px

  100%
    width 3000px
    height 3000px
    border 800px solid rgba(255, 255, 255, 0.1)
    opacity 0

@keyframes ray
  0%
    opacity 0

  50%
    opacity 0.5

  100%
    opacity 0

.light-cone-enter-active
  transition transform 0.35s

.light-cone-enter-from
  transform scale(2)

@keyframes animation-star
  0%
    filter brightness(1)

  50%
    filter brightness(2)

  100%
    filter brightness(1)

.gold-enter-active
  transition opacity 0.8s

.gold-leave-active
  transition opacity 0s

.gold-enter-from
.gold-leave-from
.gold-leave-to
  opacity 0

.gold-enter-active .animation-type
  transition all 0.5s

.gold-enter-from .animation-type
  opacity 0
  transform translateY(100px)

.gold-enter-active .light-group-1 .animation-light
.gold-enter-active .light-group-2 .animation-light
  transition all 0.4s

.gold-enter-active .light-group-3 .animation-light
  transition all 0.8s

.gold-enter-active .light-group-1 .animation-light
  transition-delay 0.1s

.gold-enter-active .light-group-2 .animation-light
  transition-delay 0.2s

.gold-enter-active .light-group-3 .animation-light
  transition-delay 0.35s

.gold-enter-to .light-group-1 .animation-light
.gold-enter-to .light-group-2 .animation-light
.gold-enter-to .light-group-3 .animation-light
  opacity 0
  transform scaleX(0) !important

.gold-enter-active .star-group-1
.gold-enter-active .star-group-2
.gold-enter-active .star-group-3
  transition all 0.3s

.gold-enter-active .star-group-1
  transition-delay 0.2s

.gold-enter-active .star-group-2
  transition-delay 0.25s

.gold-enter-active .star-group-3
  transition-delay 0.3s

.gold-enter-from .star-group-1
.gold-enter-from .star-group-2
.gold-enter-from .star-group-3
  opacity 0
  transform translate(-50%, 50%) !important

.gold-enter-active .gold-animation
  transition transform 0.3s, opacity 0.5s
  transition-delay 0.7s

.gold-enter-to .gold-animation
  opacity 0
  transform scale(0.8)

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

.mask-appear-active
  transition all 0.3s linear
  transition-delay 0.25s

.mask-enter-active
.mask-leave-active
  transition all 0.3s linear

.mask-enter-from
.mask-leave-to
  opacity 0
  transform translateY(50%)
</style>
