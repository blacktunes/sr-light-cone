<template>
  <Main
    :viewport="viewport({ width: 3200 })"
    :popup="popup"
  ></Main>
</template>

<script lang="ts" setup>
import Main from '@/utils/components/Main.vue'
import { viewport } from './utils/scripts/viewport'
import { popup } from './assets/scripts/popup'
</script>
