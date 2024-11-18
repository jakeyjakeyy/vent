<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import { drawCoordinateGrid } from "@/utils/universe";
const FRAMERATE = 144;
let container = ref<HTMLElement | null>(null);
let canvas: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;
let zoom = 1;
let dragging = false;
let dragStart = { x: 0, y: 0 };
let dragEnd = { x: 0, y: 0 };
let dragDelta = { x: 0, y: 0 };

onMounted(async () => {
  // When the component is mounted, initialize the container and canvas
  container.value = document.querySelector(
    ".universe-container"
  ) as HTMLElement;
  await nextTick(); // canvas is null without this
  canvas = <HTMLCanvasElement>document.getElementById("universe-canvas");
  ctx = canvas.getContext("2d");
  if (!ctx || !container.value) return;

  // Event listeners
  // mousedown
  canvas?.addEventListener("mousedown", (e) => {
    if (!canvas || !ctx) return;
    dragging = true;
    dragStart = { x: e.offsetX - dragDelta.x, y: e.offsetY - dragDelta.y };
  });
  // mousemove
  canvas?.addEventListener("mousemove", (e) => {
    if (!canvas || !ctx || !dragging) return;
    dragDelta.x = e.offsetX - dragStart.x;
    dragDelta.y = e.offsetY - dragStart.y;
    console.log(e.offsetX - dragDelta.x, e.offsetY - dragDelta.y); // This calculates grid coordinates based on the drag
  });
  // mouseup
  canvas?.addEventListener("mouseup", (e) => {
    if (!canvas || !ctx) return;
    dragging = false;
    dragEnd.x += dragDelta.x;
    dragEnd.y += dragDelta.y;
  });

  window.addEventListener("resize", () => {
    if (!canvas || !container.value) return;
    canvas.width = container.value.clientWidth;
    canvas.height = container.value.clientHeight;
  });
});

// Ticker
setInterval(() => {
  if (!ctx || !container.value) return;
  ctx.clearRect(
    0,
    0,
    container.value.clientWidth,
    container.value.clientHeight
  );
  drawCoordinateGrid(container.value, ctx, dragDelta);
}, 1000 / FRAMERATE);
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
