<template>
  <div
    class="index"
    @click.stop
  >
    <div class="left">
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
    <div class="right">
      <Card
        v-for="card in lightConeList"
        :key="card.id"
        :name="card.name || '未知光锥'"
        :image="card.image || ''"
        :level="card.level"
        :type="card.type"
        :viewed="!card.new"
        @click="openWindow('show', card.id)"
        @delete="handelDelete(card.id)"
      />
      <Card
        name="添加光锥"
        @click="addLightCone"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import GroupBtn from './Common/GroupBtn.vue'
import Card from './Common/Card.vue'
import { data } from '@/store/data'
import { fateList } from '@/assets/scripts/images'
import { openWindow } from '@/assets/scripts/popup'

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
      name: res.raw.name.split('.')[0] ?? '未知光锥' ?? '未知光锥',
      image: res.base64,
      type: select.value === '全部' ? '开拓' : select.value,
      level: 5,
      time: id,
      new: true
    })
    openWindow('show', id)
  })
}

const handelDelete = (id: number) => {
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
  display flex
  box-sizing border-box
  overflow hidden
  position absolute
  width 100%
  height 100%
  padding 30px 60px
  background #000
  background-image url('https://patchwiki.biligame.com/images/sr/2/29/tjd2rlq7gbac4k46mnum5fvtt1218r8.png')
  background-repeat no-repeat
  background-position 100% 0
  background-size 103%
  box-shadow 0 0 20px 20px rgba(0, 0, 0, 0.7) inset

  &:before
    content ''
    position absolute
    top 20px
    right 50px
    bottom 40px
    left 50px
    border 5px solid rgba(100, 100, 100, 0.3)
    border-radius 5px
    pointer-events none

  .left
    display flex
    flex-direction column
    width 350px
    height s('calc(100% - %s)', $top * 2)
    margin $top 150px $top 15px

    .group-list
      flex 1
      display flex
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
    box-sizing border-box
    overflow-x hidden
    overflow-y auto
    overflow-y overlay
    scrollbar-gutter stable
    scrollbar-width none
    flex 1
    display flex
    flex-wrap wrap
    align-content flex-start
    height s('calc(100% - %s)', $top * 2 + 30px)
    margin $top 35px $top + 30px 0
    mask-image linear-gradient(to bottom, transparent, #000 30px, #000, #000 calc(100% - 30px), transparent), linear-gradient(to left, black, transparent 50px)
    mask-size 100% 100%
    mask-position 0 0, 100% 0
    mask-repeat no-repeat, no-repeat

    &::-webkit-scrollbar
      width 12px
      height 12px

    &::-webkit-scrollbar-track
      background #545454
      margin 0

    &::-webkit-scrollbar-thumb
      background #c1c8d2
</style>
@/assets/scripts/image
