<template>
  <div class="index">
    <div class="left">
      <GroupBtn
        v-for="name in groupList"
        :key="name"
        :type="name"
        :highlight="select === name"
        @click="select = name"
      />
    </div>
    <div class="right">
      <Card
        v-for="card in data.lightCone"
        :key="card.id"
        :name="card.name || '未知光锥'"
        :image="card.image || ''"
        :level="card.level"
        :type="card.type"
        @click="setting.lightConeID = card.id"
      />
      <Card
        name="添加光锥"
        @click="addLightCone"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GroupBtn from './Common/GroupBtn.vue'
import Card from './Common/Card.vue'
import { data, setting } from '@/store/data'
import { fateList, imageCropper } from '@/assets/scripts/images'

const select = ref('全部')
const groupList: ('全部' | Fate)[] = ['全部', ...fateList]

const addLightCone = () => {
  imageCropper({ aspectRatio: 0.7, maxWidth: 1280 }).then((res) => {
    const id = Date.now()
    data.lightCone.push({
      id,
      name: res.raw.name.split('.')[0] ?? '未知光锥' ?? '未知光锥',
      image: res.base64,
      type: '欢愉',
      level: 5
    })
    setting.lightConeID = id
  })
}
</script>

<style lang="stylus" scoped>
.index
  display flex
  box-sizing border-box
  overflow hidden
  position absolute
  width 100%
  height 100%
  padding 100px 60px 60px 60px
  background #000
  background-image url('https://patchwiki.biligame.com/images/sr/2/29/tjd2rlq7gbac4k46mnum5fvtt1218r8.png')
  background-repeat no-repeat
  background-size cover
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
    height 100%
    padding 15px
    margin-right 150px

  .right
    overflow auto
    flex 1
    display flex
    flex-wrap wrap
    align-content flex-start
    height 98%
    margin-right 50px
</style>
@/store/data
@/assets/scripts/images