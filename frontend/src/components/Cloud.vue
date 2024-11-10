<script setup lang="ts">
import { ref } from "vue";
import Droplet from "./Droplet.vue";

let posts = ref([
  { content: "Hello, World!", id: 1 },
  { content: "Hello, Vue!", id: 2 },
  { content: "Hello, vent!", id: 3 },
  {
    content: "A very long post that is at the limits of our maximum characters",
    id: 4,
  },
]);
</script>

<template>
  <div class="cloud-container">
    <Droplet v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<style scoped>
.cloud-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
