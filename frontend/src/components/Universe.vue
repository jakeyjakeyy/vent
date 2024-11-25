<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import { drawCoordinateGrid, drawPosts } from "@/utils/universe";
import Post from "./Post.vue";
const FRAMERATE = 144;
let container = ref<HTMLElement | null>(null);
let canvas: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;
let zoom = 1;
let zoomenabled = false;
let dragging = false;
let dragStart = { x: 0, y: 0 };
let dragEnd = { x: 0, y: 0 };
let dragDelta = { x: 0, y: 0 };
let centerX = 0;
let centerY = 0;

let posts = ref<any[]>([
  { x: 0, y: 0, content: "Hello, World!", size: 1, id: 1 },
]);

onMounted(async () => {
  // When the component is mounted, initialize the container and canvas
  container.value = document.querySelector(
    ".universe-container"
  ) as HTMLElement;
  await nextTick(); // canvas is null without this
  canvas = <HTMLCanvasElement>document.getElementById("universe-canvas");
  ctx = canvas.getContext("2d");
  centerX = container.value?.clientWidth / 2;
  centerY = container.value?.clientHeight / 2;

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
    // console.log(e.offsetX - dragDelta.x, e.offsetY - dragDelta.y); // This calculates grid coordinates based on the drag
  });
  // mouseup
  canvas?.addEventListener("mouseup", (e) => {
    if (!canvas || !ctx) return;
    dragging = false;
    dragEnd.x += dragDelta.x;
    dragEnd.y += dragDelta.y;
  });
  canvas?.addEventListener("wheel", (e) => {
    if (!canvas || !ctx || !zoomenabled) return;
    zoom += e.deltaY * -0.01;
    zoom = Math.min(Math.max(0.125, zoom), 4);
  });

  window.addEventListener("resize", () => {
    if (!canvas || !container.value) return;
    canvas.width = container.value.clientWidth;
    canvas.height = container.value.clientHeight;
    centerX = container.value.clientWidth / 2;
    centerY = container.value.clientHeight / 2;
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
  drawCoordinateGrid(container.value, ctx, dragDelta, zoom);
  // drawPosts(container.value, ctx, posts.value, dragDelta);
  for (const post of posts.value) {
    let postElement = document.getElementById(`post-${post.id}`);
    if (postElement) {
      postElement.style.left = `${
        post.x + centerX + dragDelta.x - postElement.clientWidth / 2
      }px`;
      postElement.style.top = `${
        post.y + centerY + dragDelta.y - postElement.clientHeight / 2
      }px`;
    }
  }
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
    <Post v-for="post in posts" :post="post" />
  </div>
</template>

<style scoped>
.universe-container {
  position: relative;
  width: 99%;
  height: 99%;
}
</style>
