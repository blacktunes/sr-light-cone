<template>
  <div class="shadow"></div>
</template>

<script lang="ts" setup></script>

<style lang="stylus" scoped>
.shadow
  position absolute
  z-index 999
  box-shadow 0 0 20px 20px rgba(0, 0, 0, 0.7) inset
  pointer-events none
  inset -5px
</style>
