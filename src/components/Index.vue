<template>
  <div
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
    <div
      class="card"
      @click.stop="onImageClick"
    >
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
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw, watch } from 'vue'

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
    position relative
    width 850px
    height 1200px
    transform rotate3d(1, -1, 1, 15deg) scale(0.7)
    transform-style preserve-3d
    transition 0.4s
    cursor pointer

    &:hover
      transform rotate3d(1, -1, 1, 10deg) scale(0.7)

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
