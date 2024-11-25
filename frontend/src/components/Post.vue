<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
defineProps<{
  post: {
    x: number;
    y: number;
    content: string;
    size: number;
    id: number;
  };
}>();
let hovering = ref(false);
</script>

<template>
  <div
    class="post"
    :id="'post-' + post.id"
    @mouseover="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="post-content">{{ post.content }}</div>
  </div>
</template>

<style scoped>
.post {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  left: 50%;
  top: 50%;
  background-color: #d4ebff;
  box-shadow: 0px 0px 10px 5px #747de8;
  border: 1px solid #000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  padding: 2rem;
  font-size: 12px;
  animation: glow 2s ease-in-out infinite alternate;
  transition: transform 0.2s;
  cursor: pointer;
}

.post:hover {
  transform: scale(1.1);
}

@keyframes glow {
  to {
    box-shadow: 0px 0px 20px 10px #535fed;
  }
}
</style>
