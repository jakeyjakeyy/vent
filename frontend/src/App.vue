<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div id="app-content">
    <nav></nav>
    <div class="browser">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
#app-content,
.browser {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
