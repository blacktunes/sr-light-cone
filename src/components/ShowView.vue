<template>
  <Transition name="fade">
    <div
      v-if="setting.lightConeIndex !== -1"
      class="show-view"
      @click.stop="elementShow.mask = !elementShow.mask"
      ref="viewDom"
    >
      <div
        class="effects"
        ref="effectsDOm"
      >
        <div class="star-view"></div>
        <Transition name="slide-top">
          <div
            class="mask-view"
            v-show="data.lightCone[setting.lightConeIndex].image && elementShow.mask"
          ></div>
        </Transition>
        <div class="light-view">\</div>
        <Transition
          appear
          appearActiveClass="fade-delay-enter-active"
          appearFromClass="fade-delay-enter-from"
        >
          <img
            src="@/assets/images/彩虹.webp"
            alt=""
            class="rainbow"
          />
        </Transition>
      </div>
      <Transition
        name="fade"
        appear
      >
        <div
          class="info"
          @click.stop
          v-if="data.lightCone[setting.lightConeIndex].image"
        >
          <img
            src="@/assets/images/光锥.webp"
            alt=""
            class="label"
          />
          <div class="name-box">
            <img
              :src="fateFullIcon[data.lightCone[setting.lightConeIndex].type]"
              alt=""
              class="type"
              @click.stop="onTypeClick"
            />
            <div class="name-content">
              <div class="name">
                <span @click.stop="onNameClick">
                  {{ data.lightCone[setting.lightConeIndex].name }}
                </span>
                <img
                  class="new"
                  src="@/assets/images/new.webp"
                  alt=""
                  :class="[elementShow.new ? 'show' : 'hide']"
                  @click.stop="elementShow.new = !elementShow.new"
                />
              </div>
              <div
                class="level"
                @click.stop="onLevelClick"
              >
                <Icon
                  v-for="(_, index) in data.lightCone[setting.lightConeIndex].level"
                  :key="index"
                  name="star"
                />
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <Transition
        name="slide-left"
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
      <div
        v-show="!setting.loading"
        class="share"
        @click.stop="onShareClick"
      >
        <Icon
          name="ring"
          class="ring"
        />
        <Icon
          name="share"
          class="icon"
        />
      </div>
      <LightCone
        class="light-cone"
        @click.stop="onImageClick"
        :image="data.lightCone[setting.lightConeIndex].image"
      />
      <div
        v-show="!setting.loading"
        class="back"
        @click.stop="setting.lightConeID = undefined"
      >
        <Close color="#fff" />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed, nextTick, reactive, ref, watch } from 'vue'
import LightCone from './Common/LightCone.vue'
import Close from './Common/Close.vue'
import { data, setting } from '@/store/data'
import { fateFullIcon, fateList, imageCropper } from '@/assets/scripts/images'
import { screenshot } from '@/assets/scripts/screenshot'
import r from '@/assets/images/r.webp'
import sr from '@/assets/images/sr.webp'
import ssr from '@/assets/images/ssr.webp'
import Icon from './Common/Icon.vue'
import { emitter } from '@/assets/scripts/event'
import { showInput, showSelect } from '@/store/popup'

const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const viewDom = ref<HTMLElement | null>(null)
const effectsDOm = ref<HTMLElement | null>(null)

const triangleColor = computed(() => {
  switch (data.lightCone[setting.lightConeIndex]?.level) {
    case 4:
      return '#af86fe'
    case 5:
      return '#ffcf70'
    default:
      return '#fff'
  }
})

watch(
  () => setting.lightConeIndex,
  async () => {
    if (setting.lightConeIndex === -1) return
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
  }
)

const extraImage = computed(() => {
  switch (data.lightCone[setting.lightConeIndex].level) {
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
  new: false,
  extra: true
})

const updateTime = () => {
  data.lightCone[setting.lightConeIndex].time = Date.now()
}

const onNameClick = async () => {
  const name = await showInput({
    title: '修改光锥名',
    required: false,
    defaultText: data.lightCone[setting.lightConeIndex].name,
    placeholder: '未知光锥'
  })
  if (name && data.lightCone[setting.lightConeIndex].name !== name) {
    data.lightCone[setting.lightConeIndex].name = name
    updateTime()
  }
}

const onTypeClick = async () => {
  const type = await showSelect('修改命途', fateList, data.lightCone[setting.lightConeIndex].type)
  if (type) {
    data.lightCone[setting.lightConeIndex].type = type
    updateTime()
  }
}

const onLevelClick = () => {
  data.lightCone[setting.lightConeIndex].level += 1
  if (data.lightCone[setting.lightConeIndex].level > 5) {
    data.lightCone[setting.lightConeIndex].level = 3
  }
  updateTime()
}

const onImageClick = () => {
  imageCropper({ aspectRatio: 0.7, maxWidth: 1280 }).then((res) => {
    data.lightCone[setting.lightConeIndex].image = res.base64
    updateTime()
  })
}

const onShareClick = () => {
  if (setting.loading) return

  setting.loading = true
  nextTick(() => {
    if (viewDom.value) {
      screenshot(viewDom.value, data.lightCone[setting.lightConeIndex].name)
      setTimeout(() => {
        setting.loading = false
      }, 200)
    }
  })
}
emitter.on('screenshot', onShareClick)
</script>

<style lang="stylus" scoped>
@import '../assets/images/image.styl'

.show-view
  z-index 9
  overflow hidden
  position relative
  width 100%
  height 100%
  display flex
  justify-content center
  align-items center
  background rgb(0, 0, 15)
  box-shadow 0 0 20px 20px rgba(0, 0, 0, 0.7) inset

  &:hover
    .share
      opacity 1

    .back
      opacity 0.9

  &:before
    z-index 1
    content ''
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    background #000
    background-image $background
    background-repeat no-repeat
    background-size cover
    opacity 0.4

  .effects
    z-index 2
    position absolute
    top 0
    right 0
    bottom 0
    left 0

    .star-view
      position absolute
      top 50%
      left 50%
      width 100%
      height 0
      padding-bottom 100%
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
    z-index 3
    display flex
    flex-direction column
    position absolute
    top 45%
    left 280px

    &:hover
      .new
        opacity 0.3

    .label
      width 210px
      margin 0 0 5px 285px

    .name-box
      display flex
      justify-content center
      align-items center
      height 170px
      padding 5px 100px
      background linear-gradient(to right, transparent 0%, #000, #000, transparent)

      .type
        width 170px
        height 170px
        filter invert(1)

      .name-content
        display flex
        flex-direction column
        margin-left 10px

        .name
          display flex
          align-items center
          user-select none

          span
            height 85px
            font-size 60px
            min-width 30px
            max-width 550px
            color #fff
            overflow hidden
            text-overflow ellipsis
            white-space nowrap

            &:hover
              color #fccf73

          .new
            width 100px
            margin 5px 0 0 10px
            transition 0.2s

        .level
          margin 10px 0 5px 0

  .extra
    z-index 4
    position absolute
    right 0
    bottom 20%

    img
      transition 0.2s

    &:hover
      img
        opacity 0.3

  .share
    position relative
    z-index 4
    display flex
    justify-content center
    align-items center
    position absolute
    right 5%
    bottom 5%
    border-radius 50%
    background #f2f2f4
    width 90px
    height 90px
    box-shadow 0 0 5px rgba(255, 255, 255, 0.8)
    opacity 0
    transition 0.2s

    .ring
      position absolute
      z-index -1

    .icon
      margin 5px 5px 0 0

  .light-cone
    z-index 4
    transform rotate3d(1, -1, 1, 15deg) scale(0.7)

    &:hover
      transform rotate3d(1, -1, 1, 10deg) scale(0.7)

      :deep(.top)
        .front
          &:after
            top 0
            left 0

  .back
    z-index 9
    position absolute
    color #eee
    top 30px
    right 50px
    opacity 0
    transition 0.2s

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
  background-color #fff
  border-radius 50%
  opacity 0
  box-shadow 0 0 5px 5px rgba(255, 255, 255, 0.7)
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
  // animation-timing-function linear

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
