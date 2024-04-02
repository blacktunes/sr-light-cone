<template>
  <div
    class="details-view"
    v-if="currentLightCone"
    @click.stop
    ref="viewDom"
  >
    <div class="bg"></div>
    <LightCone
      class="light-cone"
      :image="currentLightCone.image"
      @click.stop="onImageClick"
    >
      <div class="card-info">
        <div
          class="card-type"
          @click.stop="onTypeClick"
        >
          <img
            :src="fateIcon[currentLightCone.type]"
            alt=""
          />
        </div>
        <div
          class="card-level"
          @click.stop="onLevelClick"
        >
          <Icon
            v-for="(_, index) in currentLightCone.level"
            :key="index"
            name="star"
            width="100"
            height="100"
            stroke="#825b2c"
            stroke-width="5"
          />
        </div>
      </div>
    </LightCone>
    <Transition
      name="box-slide-bottom"
      appear
    >
      <div class="details-box">
        <Icon
          name="back"
          class="back-btn"
          @click.stop="$emit('close')"
        />
        <div
          class="name"
          @click.stop="onNameClick"
        >
          {{ currentLightCone.name }}
        </div>
        <div
          class="type"
          @click.stop="onTypeClick"
        >
          <img
            :src="fateIcon[currentLightCone.type]"
            alt=""
          />
          <span>{{ currentLightCone.type }}</span>
        </div>
        <div
          class="stage"
          :class="{ 'initial-stage': isInitial }"
        >
          <div
            v-for="(_, index) in 6"
            :key="index"
          ></div>
        </div>
        <div class="level">
          <span>等级 </span>
          <span class="num">{{ isInitial ? 1 : 80 }}/</span>
          <span
            class="num"
            style="color: #687993"
            >{{ isInitial ? 20 : 80 }}</span
          >
        </div>
        <div
          class="state hp"
          @click.stop="onStateClick('hp')"
        >
          <div class="label">
            <div>
              <img
                src="@/assets/images/hp.webp"
                alt=""
              />
            </div>
            <span>生命值</span>
          </div>
          <span class="num">{{ currentLightCone.details.state[isInitial ? 0 : 1].hp }}</span>
        </div>
        <div
          class="state atk"
          @click.stop="onStateClick('atk')"
        >
          <div class="label">
            <div>
              <img
                src="@/assets/images/atk.webp"
                alt=""
              />
            </div>
            <span>攻击力</span>
          </div>
          <span class="num">{{ currentLightCone.details.state[isInitial ? 0 : 1].atk }}</span>
        </div>
        <div
          class="state def"
          @click.stop="onStateClick('def')"
        >
          <div class="label">
            <div>
              <img
                src="@/assets/images/def.webp"
                alt=""
              />
            </div>
            <span>防御力</span>
          </div>
          <span class="num">{{ currentLightCone.details.state[isInitial ? 0 : 1].def }}</span>
        </div>
        <div class="tip">光锥技能</div>
        <div class="line"></div>
        <div class="info">
          <div class="type-tip">
            <div class="icon">
              <img
                :src="fateIcon[currentLightCone.type]"
                alt=""
              />
            </div>
            <div>
              <span>以下效果</span>
              <span style="letter-spacing: -5px">对</span>
              <span style="color: #ed9c38">【{{ currentLightCone.type }}</span>
              <span style="color: #ed9c38; letter-spacing: -5px">】</span>
              <span>命途角色生效</span>
            </div>
          </div>
          <div
            class="overlap"
            :class="{ 'initial-overlap': isInitial }"
          >
            <div class="icon">{{ isInitial ? 'I' : 'V' }}</div>
            <span>叠影{{ isInitial ? 1 : 5 }}阶</span>
          </div>
          <div
            class="skill-name"
            @click.stop="onSkillNameClick"
          >
            {{ currentLightCone.details.name || '光锥' }}
          </div>
          <div
            class="skill"
            @click.stop="onSkillClick"
            v-dompurify-html="
              processText(currentLightCone.details.state[isInitial ? 0 : 1].skill, true) ||
              '没有效果'
            "
          ></div>
          <div class="sep"></div>
          <div
            class="info-text"
            @click.stop="onInfoClick"
            v-dompurify-html="processText(currentLightCone.details.info) || '一张普通的光锥'"
          ></div>
        </div>
        <div
          class="change"
          @click.stop="isInitial = !isInitial"
        >
          <Icon
            name="loop"
            :class="{ 'initial-icon': isInitial }"
          />
        </div>
        <div class="change-bg">
          <div class="ring-1"></div>
          <div class="ring-2"></div>
          <div class="ring-3"></div>
          <div class="ring-4"></div>
          <Icon
            name="triangle"
            class="triangle"
          />
        </div>
        <div
          class="change-flag"
          :class="{ initial: isInitial }"
        >
          <div class="ring"></div>
        </div>
        <span
          class="level-max"
          :class="{ 'highlight-text': !isInitial }"
          >满级</span
        >
        <span
          class="level-initial"
          :class="{ 'highlight-text': isInitial }"
          >初始</span
        >
      </div>
    </Transition>
    <Transition
      name="share"
      appear
    >
      <div class="share-btn">
        <Share
          v-show="!isLoading()"
          @click.stop="onShareClick(viewDom)"
        ></Share>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import LightCone from '@/components/Common/LightCone.vue'
import Share from '@/components/Common/Share.vue'
import Icon from '@/components/Common/Icon.vue'
import { emitter } from '@/assets/scripts/event'
import { openWindow, isLoading } from '@/assets/scripts/popup'
import { fateIcon } from '@/assets/scripts/images'
import { currentLightCone } from '@/store/data'
import {
  updateTime,
  onNameClick,
  onTypeClick,
  onLevelClick,
  onImageClick,
  onShareClick
} from './utils'

defineEmits<{
  (event: 'close'): void
}>()

onMounted(() => {
  if (currentLightCone.value) currentLightCone.value.new = false
})

const viewDom = ref<HTMLElement | null>(null)

const isInitial = ref(true)

const onStateClick = async (type: 'hp' | 'atk' | 'def') => {
  if (!currentLightCone.value) return

  let title: string = `修改${isInitial.value ? '初始' : '满级'}`
  if (type === 'hp') {
    title += '生命值'
  } else if (type === 'atk') {
    title += '攻击力'
  } else if (type === 'def') {
    title += '防御力'
  } else {
    title += '属性'
  }
  const str = await openWindow('input', {
    title,
    required: true,
    defaultText: currentLightCone.value.details.state[isInitial.value ? 0 : 1][type]
  })
  if (str && currentLightCone.value.details.state[isInitial.value ? 0 : 1][type] !== str) {
    currentLightCone.value.details.state[isInitial.value ? 0 : 1][type] = str
    updateTime()
  }
}

const onSkillNameClick = async () => {
  if (!currentLightCone.value) return

  const name = await openWindow('input', {
    title: '修改光锥技能名',
    required: false,
    defaultText: currentLightCone.value.details.name,
    placeholder: ''
  })
  if (name !== null && currentLightCone.value.details.name !== name) {
    currentLightCone.value.details.name = name
    updateTime()
  }
}

const onSkillClick = async () => {
  if (!currentLightCone.value) return

  const skill = await openWindow('input', {
    title: '修改光锥技能',
    required: false,
    defaultText: currentLightCone.value.details.state[isInitial.value ? 0 : 1].skill,
    placeholder: '',
    textarea: true
  })
  if (skill !== null) {
    if (currentLightCone.value.details.state[isInitial.value ? 0 : 1].skill !== skill) {
      currentLightCone.value.details.state[isInitial.value ? 0 : 1].skill = skill
      updateTime()
    }
    if (!currentLightCone.value.details.state[isInitial.value ? 1 : 0].skill) {
      currentLightCone.value.details.state[isInitial.value ? 1 : 0].skill = skill
    }
  }
}

const onInfoClick = async () => {
  if (!currentLightCone.value) return

  const info = await openWindow('input', {
    title: '修改光锥介绍',
    required: false,
    defaultText: currentLightCone.value.details.info,
    placeholder: '',
    textarea: true
  })
  if (info !== null && currentLightCone.value.details.info !== info) {
    currentLightCone.value.details.info = info
    updateTime()
  }
}

const processText = (text: string, color?: boolean) => {
  if (!text) return
  if (color) {
    text = text.replace(/<(\S+)>/g, '<span style="color: #ed9c38">$1</span>')
  }
  return text.replace(/\n/g, '<br>')
}

emitter.on('screenshot', () => onShareClick(viewDom.value))
</script>

<style lang="stylus" scoped>
.details-view
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  z-index 21
  color #fff

  &:hover
    .share-btn
      div
        opacity 1

  .bg
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    background-image url('@/assets/images/智库.webp')
    background-size contain
    background-repeat no-repeat

  .light-cone
    position absolute
    top 17%
    left 38%
    transform rotateX(5deg) rotateY(-5deg) rotate(8deg) scale(0.8)

    &:hover
      transform rotateX(1deg) rotateY(-1deg) rotate(8deg) scale(0.8)

      :deep(.top)
        .front
          &:after
            top 0
            left 0

    :deep(.top)
      top -20px
      left -10px

      .back
        width 90%
        height 95%

    :deep(.bottom)
      top 80px
      left 85px

    .card-info
      position absolute
      bottom 0
      display flex
      align-items center
      padding 0 80px 35px
      width 700px
      pointer-events auto

      .card-type
        position relative
        display flex
        justify-content center
        align-items center
        margin 0 20px 10px 0
        width 100px
        height 100px
        border 5px solid #b4b1a4
        border-radius 50%
        background #4b4945

        &:before
          position absolute
          top -15px
          right -15px
          bottom -15px
          left -15px
          border 10px solid rgba(182, 177, 165, 0.5)
          border-radius 50%
          content ''

        img
          width 90%

      .card-level
        flex 1

      :deep(path)
        fill #f9b83a

  .details-box
    position absolute
    top 0
    right 20px
    width 700px
    height 100%

    .back-btn
      position absolute
      top 80px
      right 40px
      color #eee
      transition 0.2s

      &:hover
        color #f19d38

      &:active
        transform scale(0.8)

    .name
      position absolute
      top 190px
      left 0
      overflow hidden
      width 650px
      color #fff
      text-overflow ellipsis
      white-space nowrap
      font-size 56px

      &:hover
        color #fccf73

    .type
      position absolute
      top 282px
      left 0
      display flex
      align-items center
      width 660px
      height 50px
      background rgba(200, 200, 200, 0.1)

      &:hover
        img
          filter invert(10%) sepia(24%) saturate(1041%) hue-rotate(329deg) brightness(97%) contrast(103%)

        span
          color #fccf73

      img
        height 100%

      span
        margin-left 10px
        color #fff
        font-size 36px

    .stage
      position absolute
      top 350px
      left 0
      display flex
      gap 3px

      div
        width 40px
        height 40px
        background #ffdf99
        transition background 0.2s
        clip-path polygon(50% 0%, 80% 50%, 50% 100%, 20% 50%)

    .level
      position absolute
      top 380px
      left 0
      font-size 38px

      .num
        font-size 46px

    .state
      position absolute
      left 0
      display flex
      justify-content space-between
      align-items center
      box-sizing border-box
      padding-left 15px
      width 660px
      height 60px
      font-size 34px

      &:hover
        img
          filter invert(10%) sepia(24%) saturate(1041%) hue-rotate(329deg) brightness(97%) contrast(103%)

        span
          color #fccf73

      .label
        display flex

        div
          display flex
          justify-content center
          align-items center
          margin 5px 20px 0 0
          width 40px

          img
            width 100%

      .num
        margin-right 10px
        font-size 42px

    .hp
    .def
      background rgba(0, 0, 0, 0.15)

    .hp
      top 470px

    .atk
      top 530px

    .def
      top 590px

    .tip
      position absolute
      top 680px
      left 0
      color #ced2d8
      font-size 40px

    .line
      position absolute
      top 710px
      right 50px
      width 470px
      height 4px
      background rgba(200, 200, 200, 0.3)

      &:after
        position absolute
        top -2.5px
        right -10px
        width 10px
        height 10px
        border-radius 50%
        background rgba(200, 200, 200, 0.3)
        content ''

    .info
      position absolute
      top 750px
      left 0
      overflow-x hidden
      overflow-y auto
      overflow-y overlay
      box-sizing border-box
      padding 0px 15px 30px 0
      width 670px
      height 720px
      scrollbar-gutter stable
      mask-image linear-gradient(to bottom, transparent, #000 10px, #000, #000 calc(100% - 50px), transparent)
      mask-size 100%
      mask-position 0 0
      mask-repeat no-repeat

      &::-webkit-scrollbar
        width 8px
        height 0

      &::-webkit-scrollbar-track
        margin 10px 0
        background rgba(200, 200, 200, 0.3)

      &::-webkit-scrollbar-thumb
        background #c6c6c6

      .type-tip
        display flex
        align-items flex-start
        margin-bottom 20px
        color #fff
        font-size 40px

        .icon
          position relative
          display flex
          justify-content center
          align-items center
          margin 0 20px 10px 0
          margin 5px 10px 0 5px
          width 55px
          height 55px
          border-radius 50%
          background #000

          &:before
            position absolute
            top -5px
            right -5px
            bottom -5px
            left -5px
            border 3px solid #000
            border-radius 50%
            content ''

          img
            width 90%

      .overlap
        display flex
        align-items center
        margin-bottom 20px

        .icon
          display flex
          justify-content center
          align-items center
          margin-right 10px
          margin-left 5px
          width 55px
          height 55px
          border-radius 50%
          background #ffcf70
          color #000
          font-size 35px
          font-family auto
          transition 0.1s

        span
          color #d8c08f
          font-size 42px

      .skill-name
      .skill
      .info-text
        &:hover
          color #fccf73

      .skill-name
        color #fff
        font-size 40px

      .skill
      .info-text
        color #d0d3d8
        font-size 40px

      .sep
        margin 20px 0 15px
        width 100%
        height 3px
        background rgba(200, 200, 200, 0.2)

    .change
      position absolute
      right 85px
      bottom 140px
      display flex
      justify-content center
      align-items center
      width 130px
      height 130px
      border-radius 50%
      transition background 0.1s

      &:hover
        background rgba(200, 180, 140, 0.3)

      svg
        transition transform 0.5s
        transform rotateY(180deg) rotate(0deg)

    .change-bg
      position absolute
      right 60px
      bottom 115px
      width 170px
      height 170px
      border 5px solid rgba(200, 200, 200, 0.1)
      border-radius 50%
      pointer-events none

      .ring-1
      .ring-2
      .ring-3
      .ring-4
      .triangle
        position absolute
        top 50%
        left 50%
        border-radius 50%
        transform translate(-50%, -50%)

      .ring-1
        width 135px
        height 135px
        border 5px solid rgba(200, 200, 200, 0.1)

      .ring-2
        width 120px
        height 120px
        border 3px solid rgba(200, 200, 200, 0.1)

      .ring-3
        width 80px
        height 80px
        border 3px solid rgba(200, 200, 200, 0.1)

      .ring-4
        width 45px
        height 45px
        border 3px solid rgba(200, 200, 200, 0.1)

      .triangle
        padding-bottom 10px
        color rgba(200, 200, 200, 0.1)

    .change-flag
      position absolute
      right 65px
      bottom 120px
      transition transform 0.2s
      pointer-events none

      &:after
        position absolute
        top 15px
        left -5px
        width 15px
        height 15px
        background-color #fff
        content ''
        transform rotate(-54deg)
        clip-path polygon(50% 15%, 0% 100%, 100% 100%)

      .ring
        box-sizing border-box
        width 172px
        height 172px
        border 5px solid #fff
        border-radius 50%
        clip-path polygon(50% 50%, 25% 0, -150% 0)

    .level-max
    .level-initial
      position absolute
      color #4c4d62
      font-size 40px
      transition color 0.2s

    .level-max
      right 250px
      bottom 250px

    .level-initial
      right 270px
      bottom 160px

  .share-btn
    position absolute
    bottom 5%
    left 80px

    div
      width 80px
      height 80px
      opacity 0

.highlight-text
  color #fff !important

.initial-stage
  div
    background rgba(200, 200, 200, 0.3) !important

.initial-overlap
  .icon
    background #252525 !important
    color #d8c08f !important

.initial
  transform rotate(-47deg)

.initial-icon
  transform rotateY(180deg) rotate(360deg) !important

.share-enter-active
.share-leave-active
  transition all 0.5s

.share-enter-from
.share-leave-to
  opacity 0
  transform translateY(-50%)
</style>
