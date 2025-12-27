<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps<{
  text: string;
  type: 'buff' | 'debuff' | 'fullscreen';
  x: number;
  y: number;
  onComplete: () => void;
}>();

onMounted(() => {
  const duration = props.type === 'fullscreen' ? 1000 : 800;
  setTimeout(() => {
    props.onComplete();
  }, duration);
});
</script>

<template>
  <div
      class="floating-effect"
      :class="type"
      :style="type !== 'fullscreen' ? { left: x + 'px', top: y + 'px' } : {}"
  >
    <span class="text-content">{{ text }}</span>
  </div>
</template>

<style scoped>
.floating-effect {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  font-family: "Microsoft JhengHei", "Arial Black", sans-serif;
  font-weight: 900;
  white-space: nowrap;
  will-change: transform, opacity; /* 提升渲染效能 */
}

/* 基礎樣式優化 */
.buff { color: #52ff7e; text-shadow: 0 0 10px rgba(82, 255, 126, 0.5); animation: floatUp 0.8s ease-out forwards; }
.debuff { color: #ff4d4d; text-shadow: 0 0 10px rgba(255, 77, 77, 0.5); animation: floatUp 0.8s ease-out forwards; }

/* 全螢幕特效：流暢衝擊感 */
.fullscreen {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 3rem;
  /* 使用複合動畫：彈入 + 爆炸消失 */
  animation:
      impactPop 0.3s cubic-bezier(0.17, 0.89, 0.32, 1.2) forwards,
      shining 0.3s ease-in-out infinite alternate,
      burstOut 0.7s 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards;
}

/* 1. 彈入衝擊動畫 */
@keyframes impactPop {
  0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0; letter-spacing: -10px; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 1; letter-spacing: 2px; }
}

/* 2. 微光呼吸 (增加靈動感) */
@keyframes shining {
  from { filter: brightness(1) drop-shadow(0 0 10px #ffcc00); color: #fff; }
  to { filter: brightness(1.5) drop-shadow(0 0 25px #ffcc00); color: #ffcc00; }
}

/* 3. 核心優化：急速擴張消失 */
@keyframes burstOut {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    filter: blur(0px) brightness(1.5);
  }
  40% {
    opacity: 1;
    filter: blur(2px) brightness(2);
  }
  100% {
    /* 這裡 scale 不宜過大，搭配字距散開效果更好 */
    transform: translate(-50%, -50%) scale(4);
    opacity: 0;
    letter-spacing: 40px;
    filter: blur(20px) brightness(3);
  }
}

/* 常規浮動動畫 */
@keyframes floatUp {
  0% { transform: translateY(0) scale(0.8); opacity: 0; }
  20% { opacity: 1; transform: translateY(-10px) scale(1.1); }
  100% { transform: translateY(-60px) scale(1); opacity: 0; }
}
</style>