<template>
  <div
    v-if="false"
    class="index"
    @click="isMaskShow = !isMaskShow"
  >
    <div
      class="effects"
      ref="effectsDOm"
    >
      <div class="star-view"></div>
      <Transition name="slide-top">
        <div
          class="mask-bg"
          v-if="image && isMaskShow"
        ></div>
      </Transition>
      <!-- <div class="light-view">\</div> -->
    </div>
    <Transition name="fade">
      <div
        class="info"
        v-if="image"
      >
        <img
          src="@/assets/光锥.webp"
          alt=""
          class="label"
        />
        <div class="name-box">
          <img
            :src="imageList[data.type]"
            alt=""
            class="type"
            @click.stop="onTypeClick"
          />
          <div class="name-content">
            <div
              class="name"
              contenteditable
              @click.stop
              @input="updateName"
            >
              {{ data.name }}
            </div>
            <div
              class="level"
              @click.stop="onLevelClick"
            >
              <img
                v-for="(_, index) in data.level"
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
      class="card"
      @click.stop="onImageClick"
      :image="image"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw, watch } from 'vue'
import LightCone from './Common/LightCone.vue'

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

onMounted(() => {
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

const imageList = [
  'https://patchwiki.biligame.com/images/sr/7/7f/q9b09m1w8qsmmsx50gk36ruzi2t4njy.png',
  'https://patchwiki.biligame.com/images/sr/c/cd/2zjsly4r0sjvl81p7u5v0kafsk5jfn2.png',
  'https://patchwiki.biligame.com/images/sr/3/3e/517a28zga8ufjxcujfqcs5ycsq75n8w.png',
  'https://patchwiki.biligame.com/images/sr/4/44/l84guf6iv5iltvetpb6x53jlpo3340s.png',
  'https://patchwiki.biligame.com/images/sr/5/54/oi1xyd1qyboiwrjjr405xfk0eyc3tox.png',
  'https://patchwiki.biligame.com/images/sr/e/ee/poj7ygfrfv3ncutemra1g1md892p78r.png',
  'https://patchwiki.biligame.com/images/sr/5/53/1okpzbf8i1jh38zh61oupczeytz45rg.png'
]

const isMaskShow = ref(true)

const image = ref('')
const data = reactive({
  name: '',
  type: 0,
  level: 3
})

const updateName = (e: Event) => {
  data.name = (e.target as HTMLElement).innerText
}

const onTypeClick = () => {
  data.type += 1
  if (data.type > 6) {
    data.type = 0
  }
}

const onLevelClick = () => {
  data.level += 1
  if (data.level > 5) {
    data.level = 3
  }
}

const onImageClick = () => {
  setTimeout(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      if (input.files?.[0]) {
        image.value = await compressImage(input.files[0])
      }
    }
    input.click()
  }, 0)
}

watch(data, () => {
  localStorage.setItem('sr-light-cone-data', JSON.stringify(toRaw(data)))
})

image.value = localStorage.getItem('sr-light-cone-image') || ''
watch(image, () => {
  localStorage.setItem('sr-light-cone-image', image.value)
})
;(() => {
  try {
    const temp = JSON.parse(localStorage.getItem('sr-light-cone-data') || '{}')
    data.name = temp?.name ?? '光锥'
    data.type = temp?.type ?? 0
    data.level = temp?.level ?? 3
  } catch {
    console.warn('数据读取失败')
  }
})()
</script>

<style lang="stylus" scoped>
.index
  overflow hidden
  position relative
  width 100%
  height 100%
  display flex
  justify-content center
  align-items center
  box-shadow 0 0 20px 20px rgba(0, 0, 0, 0.7) inset

  &:before
    z-index -1
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

    .mask-bg
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
          font-size 60px
          min-width 200px
          max-width 600px
          color #fff
          overflow hidden
          text-overflow ellipsis
          white-space nowrap

        .level
          margin 10px 0 5px 0
          cursor pointer

          img
            width 38px
            height 38px

.card
  transform rotate3d(1, -1, 1, 15deg) scale(0.7)

  &:hover
    transform rotate3d(1, -1, 1, 10deg) scale(0.7)

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
