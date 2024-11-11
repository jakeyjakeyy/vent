<script setup lang="ts">
import { ref } from "vue";
import Droplet from "./Droplet.vue";
import type { droplet } from "@/types";
import { twoDimensionalCollision } from "@/utils/collision";

let posts = ref([
  {
    content: "Hello, World!",
    id: 1,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    mass: 0,
    dropletWidth: 0,
    dropletHeight: 0,
  },
  {
    content: "Hello, Vue!",
    id: 2,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    mass: 0,
    dropletWidth: 0,
    dropletHeight: 0,
  },
  {
    content: "Hello, vent!",
    id: 3,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    mass: 0,
    dropletWidth: 0,
    dropletHeight: 0,
  },
  {
    content: "A very long post that is at the limits of our maximum characters",
    id: 4,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    mass: 0,
    dropletWidth: 0,
    dropletHeight: 0,
  },
]);

function updatePost(updatedDroplet: droplet) {
  const index = posts.value.findIndex((post) => post.id === updatedDroplet.id);
  posts.value[index] = updatedDroplet;

  // Check for collisions
  for (const post of posts.value) {
    if (post.id === updatedDroplet.id) continue;

    // Check for collisions
    if (post.id === updatedDroplet.id) continue;
    if (
      updatedDroplet.x < post.x + post.dropletWidth &&
      updatedDroplet.x + updatedDroplet.dropletWidth > post.x &&
      updatedDroplet.y < post.y + post.dropletHeight &&
      updatedDroplet.y + updatedDroplet.dropletHeight > post.y
    ) {
      // Calculate new velocities
      const vels = twoDimensionalCollision(updatedDroplet, post);
      posts.value[index] = vels[0];
      posts.value[posts.value.findIndex((p) => p.id === post.id)] = vels[1];
    }
  }
}
</script>

<template>
  <div class="cloud-container">
    <Droplet
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :posts="posts"
      @update="updatePost"
    />
  </div>
</template>

<style scoped>
.cloud-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
