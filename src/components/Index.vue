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
      <Card name="添加光锥" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GroupBtn from './Common/GroupBtn.vue'
import Card from './Common/Card.vue'

const groupList: ('全部' | Fate)[] = [
  '全部',
  '毁灭',
  '巡猎',
  '智识',
  '同谐',
  '虚无',
  '存护',
  '丰饶',
  '欢愉',
  '繁育'
]

const select = ref('全部')
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
  background-image url('@/assets/背景.webp')
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
