<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
const { post } = defineProps(["post"]);
const id = `droplet-${post.id}`;

// TODO create emits for velocity to be passed to cloud's array of droplets
// We then check the array for collisions with other droplets and adjust velocity accordingly

// TODO mass of droplet to be used in collision calculations
// calculate mass based on length of post content

// random num 1-10 to determine delay for droplet display
const delay = Math.floor(Math.random() * 10000) + 1000;

const SPEED = 2;
const parentContainer = ref(null);
let containerWidth = 0;
let containerHeight = 0;
let dropletWidth = 0;
let dropletHeight = 0;

// Initial position in pixels
let currentX = 0;
let currentY = 0;
let vx = (Math.random() - 0.5) * SPEED;
let vy = (Math.random() - 0.5) * SPEED;

onMounted(() => {
  const container = document.querySelector(".cloud-container");
  const droplet = document.getElementById(id);
  if (!container || !droplet) return;

  containerWidth = container.clientWidth;
  containerHeight = container.clientHeight;
  dropletWidth = droplet.offsetWidth;
  dropletHeight = droplet.offsetHeight;

  // Random starting position within container bounds
  currentX = Math.floor(Math.random() * (containerWidth - dropletWidth));
  currentY = Math.floor(Math.random() * (containerHeight - dropletHeight));

  // Initial position
  setTimeout(() => {
    if (!droplet) return;
    droplet.style.left = `${currentX}px`;
    droplet.style.top = `${currentY}px`;
    droplet.classList.remove("hidden");
    droplet.classList.add("fade-in");
  }, delay);

  // Movement loop
  setInterval(() => {
    if (!droplet) return;

    // Bounce off walls
    if (currentX <= 0 || currentX >= containerWidth - dropletWidth) {
      vx *= -1;
    }
    if (currentY <= 0 || currentY >= containerHeight - dropletHeight) {
      vy *= -1;
    }

    // Update position
    currentX += vx;
    currentY += vy;

    // Apply new position
    droplet.style.left = `${currentX}px`;
    droplet.style.top = `${currentY}px`;
  }, 1000 / 60);
});
</script>

<template>
  <div :id="id" class="droplet-container hidden">
    <div class="card">
      <div class="card-content">
        <div class="content">
          {{ post.content }}
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
