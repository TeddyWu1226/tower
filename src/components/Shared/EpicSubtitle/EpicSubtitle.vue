<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';

const props = defineProps({
  message: {type: String, required: true},
  duration: {type: Number, default: 3000}, // 設定為 3 秒
});

const isVisible = ref(false);

const animationStyle = computed(() => ({
  '--total-duration': `${props.duration}ms`
}));

onMounted(() => {
  isVisible.value = true;
  // 3秒的特效，我們在最後 0.8 秒開始觸發 Vue 的 leave transition
  setTimeout(() => {
    isVisible.value = false;
  }, props.duration - 800);
});
</script>

<template>
  <transition name="cinema-fade">
    <div v-if="isVisible" class="cinema-overlay" :style="animationStyle">
      <div class="content-box">
        <h1 class="cinema-text">
          {{ message }}
        </h1>
      </div>
    </div>
  </transition>
</template>

<style scoped>
:root {
  --total-duration: 3000ms
}

.cinema-overlay {
  position: fixed;
  inset: 0;
  background: #000000; /* 純黑電影底色 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

.cinema-text {
  color: rgba(255, 255, 255, 0.9);
  font-family: "Times New Roman", serif;
  font-size: 2rem;
  font-weight: 200;
  text-align: center;
  margin: 0;

  /* 核心動畫：關鍵字間距與模糊 */
  animation: cinema-reveal var(--total-duration) cubic-bezier(0.4, 0, 0.2, 1) forwards;

  /* 微弱的環境光暈 */
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.1);
}

/* 🎬 電影感關鍵幀 */
@keyframes cinema-reveal {
  0% {
    opacity: 0;
    filter: blur(15px);
    letter-spacing: 2.5rem; /* 起始字距極寬 */
    transform: scale(0.95);
  }
  40% {
    opacity: 1;
    filter: blur(0);
    letter-spacing: 1rem; /* 回歸正常優雅字距 */
    transform: scale(1);
  }
  70% {
    opacity: 1;
    filter: blur(0);
    letter-spacing: 1.05rem; /* 極微小的撐開 */
    transform: scale(1);
  }
  100% {
    opacity: 0;
    filter: blur(10px);
    letter-spacing: 1.2rem;
    transform: scale(1.05);
  }
}

/* Vue Transition：處理整體的柔和切換 */
.cinema-fade-enter-active {
  transition: opacity 1.2s ease-out;
}

.cinema-fade-leave-active {
  transition: opacity 0.8s ease-in;
}

.cinema-fade-enter-from, .cinema-fade-leave-to {
  opacity: 0;
}

/* 手機版適配 */
@media (max-width: 767px) {
  .cinema-text {
    font-size: 1.2rem;
    letter-spacing: 0.8rem;
  }
}
</style>