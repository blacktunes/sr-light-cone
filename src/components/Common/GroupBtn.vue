<template>
  <div
    class="group"
    :class="{ highlight }"
  >
    <div class="icon">
      <svg
        v-if="type === '全部'"
        class="svg"
        viewBox="0 0 1029 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="70"
        height="70"
        fill="#fff"
      >
        <path
          d="M995.744138 345.104972L797.733088 543.116022c-33.944751 33.944751-90.519337 33.944751-124.464089 0L480.915408 345.104972c-33.944751-33.944751-33.944751-90.519337 0-124.464088L678.926458 22.629834c33.944751-33.944751 90.519337-33.944751 124.464088 0L995.744138 226.298343c33.944751 28.287293 33.944751 84.861878 0 118.806629z m-50.917128-90.519337l-175.381215-175.381215c-16.972376-16.972376-39.60221-16.972376-56.574586 0L537.489994 254.585635c-16.972376 16.972376-16.972376 39.60221 0 56.574586l175.381215 175.381215c16.972376 16.972376 39.60221 16.972376 56.574586 0l175.381215-175.381215c11.314917-16.972376 11.314917-39.60221 0-56.574586zM362.108778 1024H84.893309c-45.259669 0-84.861878-39.60221-84.861879-84.861878v-277.21547c0-45.259669 39.60221-84.861878 84.861879-84.861879h277.215469c45.259669 0 84.861878 39.60221 84.861879 84.861879v277.21547c0 45.259669-33.944751 84.861878-84.861879 84.861878z m0-514.828729H84.893309C39.63364 509.171271 0.03143 469.569061 0.03143 424.309392v-282.872928C0.03143 96.176796 39.63364 56.574586 84.893309 56.574586h277.215469c45.259669 0 84.861878 39.60221 84.861879 84.861878v277.21547c0 50.917127-33.944751 90.519337-84.861879 90.519337z m237.61326 62.232044h277.21547c45.259669 0 84.861878 39.60221 84.861878 84.861878v277.21547c0 45.259669-39.60221 84.861878-84.861878 84.861878h-277.21547c-45.259669 0-84.861878-39.60221-84.861878-84.861878v-277.21547c0-45.259669 39.60221-84.861878 84.861878-84.861878z m0 0"
        ></path>
      </svg>
      <img
        v-else
        class="img"
        :src="fateIcon[type]"
        alt=""
      />
    </div>
    <div class="name">{{ type }}</div>
  </div>
</template>

<script lang="ts" setup>
import { fateIcon } from '@/assets/images'

defineProps<{
  type: '全部' | Fate
  highlight?: boolean
}>()
</script>

<style lang="stylus" scoped>
.group
  box-sizing border-box
  display flex
  align-items center
  height 150px
  padding 10px 30px
  margin-bottom 30px
  color #b4b5b9
  user-select none
  cursor pointer

  .icon
    display flex
    align-items center
    justify-content center
    width 110px
    height 110px
    margin-right 25px
    border-radius 50%

    .img
      width 85px
      height 85px

    .svg
      transform rotate(90deg)
      margin 5px 0 0 5px

  .name
    font-size 42px

.highlight
  .icon
    background-color #fff

    .img, .svg
      filter invert(1)

  .name
    color #fff
</style>
