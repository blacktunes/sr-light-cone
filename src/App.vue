<template>
  <div
    id="main"
    :style="{
      width: `${viewport.width * viewport.scale}px`,
      height: `${(viewport.height + viewport.bottom) * viewport.scale}px`
    }"
  >
    <div
      id="home"
      :style="{
        transform: `scale(${viewport.scale})`,
        width: `${viewport.width}px`,
        height: `${viewport.height}px`
      }"
    >
      <Component
        v-for="(item, index) in components"
        :key="index"
        :is="item"
      />
      <Component
        v-for="(item, key) in popupComponents"
        :index="item.index"
        :name="key"
        :is="item.compontnt"
        :key="key"
        @close="closeWindow"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Component } from 'vue'
import { viewport } from './store/viewport'
import { closeWindow, popupComponents } from './assets/scripts/popup'

// 动态加载所有组件
const components: Component[] = []
const modules = {
  ...import.meta.glob<{ default: Component }>(
    [
      // 组件位置
      './components/*.vue'
    ],
    {
      eager: true,
      import: 'default'
    }
  )
}
for (const i in modules) {
  components.push(defineComponent<{}>(modules[i]))
}
</script>

<style lang="stylus" scoped>
#main
  #home
    position relative
    width 100%
    height 100%
    transform-origin left top
</style>
