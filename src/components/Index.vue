<template>
  <div
    class="index"
    @click.stop
  >
    <Transition
      name="box-slide-bottom"
      appear
    >
      <div
        class="left"
        v-show="!currentLightCone"
      >
        <GroupBtn
          type="全部"
          :highlight="select === '全部'"
          @click="select = '全部'"
        />
        <div class="group-list">
          <GroupBtn
            v-for="name in fateList"
            :key="name"
            :type="name"
            :highlight="select === name"
            @click="select = name"
          />
        </div>
      </div>
    </Transition>
    <Transition
      name="box-slide-bottom"
      appear
    >
      <div
        class="right"
        v-show="!currentLightCone"
      >
        <Card
          v-for="card in lightConeList"
          :key="card.id"
          :name="card.name || '未知光锥'"
          :image="card.image || ''"
          :level="card.level"
          :type="card.type"
          :viewed="!card.new"
          @click="handleClick(card.id)"
          @delete="handleDelete(card.id)"
        />
        <Card
          name="添加光锥"
          @click="addLightCone"
        />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import GroupBtn from './Common/GroupBtn.vue'
import Card from './Common/Card.vue'
import { currentLightCone, data, setting } from '@/store/data'
import { fateList } from '@/assets/scripts/images'
import { openWindow } from '@/assets/scripts/popup'
import { getDetails } from '@/assets/scripts/lightcone'

const select = ref<'全部' | Fate>('全部')

const lightConeList = computed(() => {
  let list
  if (select.value === '全部') {
    list = [...data.lightCone]
  } else {
    list = data.lightCone.filter((item) => item.type === select.value)
  }
  list.sort((a, b) => b.time - a.time).sort((a, b) => b.level - a.level)
  return list
})

const addLightCone = () => {
  openWindow('cropper', { aspectRatio: 0.7, maxWidth: 1280 }).then((res) => {
    const id = Date.now()
    data.lightCone.push({
      id,
      name: res.raw.name.split('.')[0] ?? '未知光锥',
      image: res.base64,
      type: select.value === '全部' ? '开拓' : select.value,
      level: 5,
      time: id,
      new: true,
      details: getDetails()
    })
    openWindow('show', id)
  })
}

const handleClick = (id: number) => {
  openWindow('show', id)
  if (setting.details && currentLightCone.value) currentLightCone.value.new = false
}

const handleDelete = (id: number) => {
  const index = data.lightCone.findIndex((item) => item.id === id)
  if (id !== -1) {
    openWindow('confirm', {
      title: '删除光锥',
      text: ['是否删除该光锥？'],
      fn: () => {
        data.lightCone.splice(index, 1)
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
$top = 50px

.index
  position absolute
  display flex
  overflow hidden
  box-sizing border-box
  padding 30px 60px
  width 100%
  height 100%
  background #000
  background-image url('https://patchwiki.biligame.com/images/sr/2/29/tjd2rlq7gbac4k46mnum5fvtt1218r8.png')
  background-position 100% 0
  background-size 103%
  background-repeat no-repeat
  box-shadow 0 0 20px 20px rgba(0, 0, 0, 0.7) inset

  &:before
    position absolute
    top 20px
    right 50px
    bottom 40px
    left 50px
    border 5px solid rgba(100, 100, 100, 0.3)
    border-radius 5px
    content ''
    pointer-events none

  .left
    display flex
    flex-direction column
    margin $top 150px $top 15px
    width 350px
    height s('calc(100% - %s)', $top * 2)

    .group-list
      display flex
      flex 1
      flex-direction column
      overflow-x hidden
      overflow-y auto
      overflow-y overlay
      scrollbar-gutter stable
      scrollbar-width none
      mask-image linear-gradient(to bottom, transparent, #000 25px, #000 calc(100% - 25px), transparent)

      &::-webkit-scrollbar
        width 0
        height 0

  .right
    display flex
    flex 1
    flex-wrap wrap
    align-content flex-start
    overflow-x hidden
    overflow-y auto
    overflow-y overlay
    box-sizing border-box
    margin $top 35px $top + 30px 0
    height s('calc(100% - %s)', $top * 2 + 30px)
    scrollbar-gutter stable
    scrollbar-width none
    mask-image linear-gradient(to bottom, transparent, #000 30px, #000, #000 calc(100% - 30px), transparent), linear-gradient(to left, black, transparent 50px)
    mask-size 100% 100%
    mask-position 0 0, 100% 0
    mask-repeat no-repeat, no-repeat

    &::-webkit-scrollbar
      width 12px
      height 12px

    &::-webkit-scrollbar-track
      margin 0
      background #545454

    &::-webkit-scrollbar-thumb
      background #c1c8d2
</style>
