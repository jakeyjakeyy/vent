<script setup lang="ts">
const { post } = defineProps(["post"]);
const id = `droplet-${post.id}`;

// random num 1-10 to determine delay for droplet display
const delay = Math.floor(Math.random() * 10000) + 1000;

// random position on screen
const x = Math.floor(Math.random() * 100);
const y = Math.floor(Math.random() * 100);

// random initial velocity
const vx = Math.floor(Math.random() * 10) - 5;
const vy = Math.floor(Math.random() * 10) - 5;

// layer (1, 2, or 3) to determine z-index
const layer = Math.floor(Math.random() * 3) + 1;

// show droplet after delay
setTimeout(() => {
  const droplet = document.getElementById(id);
  if (!droplet) return;
  droplet.style.left = `${x}%`;
  droplet.style.top = `${y}%`;
  droplet.classList.remove("hidden");
  droplet.classList.add("fade-in");
  console.log(
    `Droplet ${id} displayed after ${
      delay / 1000
    } seconds; x: ${x}, y: ${y}; vx: ${vx}, vy: ${vy}`
  );
}, delay);
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
