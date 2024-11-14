<script setup lang="ts">
import { onMounted, ref } from "vue";
import DropletComponent from "./DropletComponent.vue";
import Droplet from "@/classes/droplet";
import { isColliding } from "@/utils/collision";

let droplets = ref<Droplet[]>([]);
let posts = ref([
  {
    content: "Hello, World!",
    id: 1,
  },
  {
    content: "Hello, Vue!",
    id: 2,
  },
  {
    content: "Hello, vent!",
    id: 3,
  },
  {
    content: "A very long post that is at the limits of our maximum characters",
    id: 4,
  },
]);

onMounted(() => {
  let container = document.querySelector(".cloud-container") as HTMLElement;
  for (const post of posts.value) {
    droplets.value.push(new Droplet(post.content, post.id, container));
  }
});

// Check Collision Controller
setInterval(() => {
  for (let i = 0; i < droplets.value.length; i++) {
    for (let j = i + 1; j < droplets.value.length; j++) {
      if (isColliding(droplets.value[i], droplets.value[j])) {
        let updated = droplets.value[i].collide(droplets.value[j]);
        droplets.value[i] = updated[0];
        droplets.value[j] = updated[1];
      }
    }
  }

  for (let i = 0; i < droplets.value.length; i++) {
    const dropletElement = document.getElementById(
      `droplet-${droplets.value[i].id}`
    ) as HTMLElement;
    if (!dropletElement) {
      continue;
    }
    droplets.value[i].update();
    dropletElement.style.left = `${droplets.value[i].position.x}px`;
    dropletElement.style.top = `${droplets.value[i].position.y}px`;
  }
}, 1000 / 60);
</script>

<template>
  <div class="cloud-container">
    <DropletComponent
      v-for="post in droplets"
      :key="post.id"
      :droplet="post"
      :posts="posts"
    />
  </div>
</template>

<style scoped>
.cloud-container {
  position: relative;
  width: 50%;
  height: 50%;
}
</style>
