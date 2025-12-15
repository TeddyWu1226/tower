<script setup lang="ts">
import './event-room.css'

const props = defineProps({
  title: {type: String, required: true},
  titleClass: {type: String, required: false},
  class: {type: String, required: false},
})
</script>

<template>
  <el-card :class="props.class">
    <div class="title" :class="props.titleClass">
      {{ props.title }}
    </div>
    <slot name="default"></slot>
  </el-card>
  <slot name="button"></slot>
</template>

<style scoped>
.title {
  font-size: 1.2rem;
}
</style>