<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import Droplet from "@/classes/droplet";
const emit = defineEmits(["update"]);
const { droplet, posts } = defineProps(["droplet", "posts"]);
console.log(droplet);
const id = `droplet-${droplet.id}`;
var dropletElement: HTMLElement;

// random num 1-10 to determine delay for droplet display
const delay = Math.floor(Math.random() * 10) * 1000;

onMounted(() => {
  const container = document.querySelector(".cloud-container") as HTMLElement;
  console.log(droplet);
  dropletElement = document.getElementById(id) as HTMLElement;

  setTimeout(() => {
    // set initial position
    dropletElement.style.left = `${droplet.position.x}px`;
    dropletElement.style.top = `${droplet.position.y}px`;
    dropletElement.classList.remove("hidden");
    dropletElement.classList.add("fade-in");

    droplet.position.x = Math.floor(
      Math.random() * (container.clientWidth - dropletElement.clientWidth)
    );
    droplet.position.y = Math.floor(
      Math.random() * (container.clientHeight - dropletElement.clientHeight)
    );
    // set initial dimensions
    droplet.dimensions.width = dropletElement.clientWidth;
    droplet.dimensions.height = dropletElement.clientHeight;
  }, delay);
});
// tick
setInterval(() => {
  if (!droplet || !dropletElement) return;
  droplet.update();
  dropletElement.style.left = `${droplet.position.x}px`;
  dropletElement.style.top = `${droplet.position.y}px`;
}, 1000 / 60);
</script>

<template>
  <div :id="id" class="droplet-container hidden">
    <div class="card">
      <div class="card-content">
        <div class="content">
          {{ droplet.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.droplet-container {
  position: absolute;
  width: fit-content;
  max-width: 25%;
}

.card {
  width: fit-content;
  overflow: hidden;
  font-size: 0.8rem;
  padding: 0;
}

.card-content {
  text-align: center;
  padding: 1rem;
}

.fade-in {
  animation: fadeIn 1s;
}
@keyframes fadeIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
