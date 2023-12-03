<template>
  <div
    v-if="setting.lightConeIndex !== -1"
    class="show-view"
    @click="elementShow.mask = !elementShow.mask"
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
      <!-- <div class="light-view">\</div> -->
    </div>
    <Transition name="fade">
      <div
        class="info"
        @click.stop
        v-if="data.lightCone[setting.lightConeIndex].image"
      >
        <img
          src="@/assets/光锥.webp"
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
              <span
                contenteditable
                @keydown.enter.esc="blur"
                @blur="updateName"
              >
                {{ data.lightCone[setting.lightConeIndex].name }}
              </span>
              <img
                src="@/assets/new.webp"
                alt=""
                :class="[elementShow.new ? 'show' : 'hide']"
                @click.stop="elementShow.new = !elementShow.new"
              />
            </div>
            <div
              class="level"
              @click.stop="onLevelClick"
            >
              <img
                v-for="(_, index) in data.lightCone[setting.lightConeIndex].level"
                :key="index"
                src="@/assets/星.webp"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <LightCone
      class="light-cone"
      @click.stop="onImageClick"
      :image="data.lightCone[setting.lightConeIndex].image"
    />
    <div
      class="back"
      @click.stop="setting.lightConeID = undefined"
    >
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4215"
        width="100"
        height="100"
        fill="currentColor"
      >
        <path
          d="M648 307.2H217.6l128-128c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L118.4 315.2c-6.4 6.4-9.6 14.4-9.6 22.4s3.2 16 9.6 22.4l180.8 180.8c12.8 12.8 32 12.8 44.8 0 12.8-12.8 12.8-32 0-44.8l-124.8-124.8h428.8c120 0 216 96 216 216s-96 216-216 216H320c-17.6 0-32 14.4-32 32s14.4 32 32 32h328c155.2 0 280-124.8 280-280s-124.8-280-280-280z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref, watch } from 'vue'
import LightCone from './Common/LightCone.vue'
import { data, setting } from '@/stpre/data'
import { fateFullIcon, fateList } from '@/assets/images'

const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const compressImage = (file: File | Blob, width?: number) => {
  return new Promise<string>((reslove) => {
    const src = URL.createObjectURL(file)
    const img = new Image()
    img.src = src
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reslove('')
        return
      }

      width = width ? (img.width < width ? img.width : width) : img.width
      canvas.width = width
      canvas.height = width * (img.height / img.width)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      reslove(canvas.toDataURL('image/webp'))
      URL.revokeObjectURL(src)
    }
  })
}

const effectsDOm = ref<HTMLElement | null>(null)

watch(
  () => setting.lightConeIndex,
  async () => {
    if (setting.lightConeIndex === -1) return
    await nextTick()
    if (effectsDOm.value) {
      const screenW = effectsDOm.value.offsetWidth
      const screenH = effectsDOm.value.offsetHeight

      const starView = effectsDOm.value.querySelector('.star-view')
      if (starView) {
        for (let i = 0; i < 30; i++) {
          const star = document.createElement('div')
          star.className = 'star'
          star.style.left = `${(Math.random() * screenW) | 0}px`
          star.style.top = `${(Math.random() * screenH) | 0}px`
          star.style.transform = `scale(${Math.random()})`
          star.style.animationDelay = `${Math.random() * 3}s`
          star.style.animationDuration = `${getRandom(2, 5)}s`
          starView.appendChild(star)
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

const elementShow = reactive({
  mask: true,
  new: false
})

const blur = (e: Event) => {
  ;(e.target as HTMLElement).blur()
}

const updateName = (e: Event) => {
  const name = (e.target as HTMLElement).innerText
  data.lightCone[setting.lightConeIndex].name = name.length > 0 ? name : '未知光锥'
}

const onTypeClick = () => {
  let index = fateList.findIndex((item) => item === data.lightCone[setting.lightConeIndex].type)
  if (index === -1) {
    data.lightCone[setting.lightConeIndex].type = '欢愉'
  } else {
    index += 1
    if (index > fateList.length - 1) {
      data.lightCone[setting.lightConeIndex].type = fateList[0]
    } else {
      data.lightCone[setting.lightConeIndex].type = fateList[index]
    }
  }
}

const onLevelClick = () => {
  data.lightCone[setting.lightConeIndex].level += 1
  if (data.lightCone[setting.lightConeIndex].level > 5) {
    data.lightCone[setting.lightConeIndex].level = 3
  }
}

const onImageClick = () => {
  setTimeout(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      if (input.files?.[0]) {
        if (data.lightCone[setting.lightConeIndex].name === '') {
          data.lightCone[setting.lightConeIndex].name =
            input.files?.[0].name.split('.')[0] ?? '未知光锥'
        }
        data.lightCone[setting.lightConeIndex].image = await compressImage(input.files[0])
      }
    }
    input.click()
  }, 0)
}
</script>

<style lang="stylus" scoped>
.show-view
  overflow hidden
  position relative
  width 100%
  height 100%
  display flex
  justify-content center
  align-items center
  background #000
  box-shadow 0 0 20px 20px rgba(0, 0, 0, 0.7) inset

  &:hover
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
    background-image url('@/assets/背景.webp')
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
      top 0
      right 0
      bottom 0
      left 0
      animation rotate 300s linear infinite

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

  .info
    z-index 3
    display flex
    flex-direction column
    position absolute
    top 45%
    left 280px

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
        cursor pointer

      .name-content
        display flex
        flex-direction column
        margin-left 10px

        .name
          display flex
          align-items center

          &:hover
            img
              opacity 0.3

          span
            font-size 60px
            min-width 30px
            max-width 600px
            color #fff
            overflow hidden
            text-overflow ellipsis
            white-space nowrap

          img
            width 80px
            margin 5px 0 0 10px
            transition 0.1s
            cursor pointer

        .level
          margin 10px 0 5px 0
          cursor pointer

          img
            width 38px
            height 38px

  .light-cone
    z-index 4
    transform rotate3d(1, -1, 1, 15deg) scale(0.7)

    &:hover
      transform rotate3d(1, -1, 1, 10deg) scale(0.7)

  .back
    z-index 9
    position absolute
    color #eee
    top 30px
    right 50px
    opacity 0
    cursor pointer
    transition 0.2s

@keyframes rotate
  0%
    transform rotate(0deg)

  100%
    transform rotate(360deg)
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
</style>
