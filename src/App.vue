<template>
  <Main
    :viewport="{ width: 3200 }"
    :popup="popupManager"
  >
    <Index />
    <Link />
  </Main>
</template>

<script lang="ts" setup>
import { Main } from 'star-rail-vue'
import { popupManager } from './assets/scripts/popup'
import Index from './components/Index.vue'
import Link from './components/Link.vue'
</script>
