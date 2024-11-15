<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
var container = ref<HTMLElement | null>(null);
var canvas: HTMLCanvasElement | null;
var ctx = null;
onMounted(async () => {
  container.value = document.querySelector(
    ".universe-container"
  ) as HTMLElement;
  await nextTick(); // canvas is null without this
  canvas = <HTMLCanvasElement>document.getElementById("universe-canvas");
  console.log(canvas);
  if (!canvas) return;
  ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, 150, 75);
});
</script>

<template>
  <div class="universe-container">
    <canvas
      v-if="container"
      id="universe-canvas"
      :width="container?.clientWidth"
      :height="container?.clientHeight"
    ></canvas>
  </div>
</template>

<style scoped>
.universe-container {
  position: relative;
  width: 99%;
  height: 99%;
}
</style>
