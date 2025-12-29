<script setup lang="ts">
import MainPage from "@/views/MainPage.vue";
import TestDiv from "@/views/testDiv.vue";
const isDev = import.meta.env.DEV;
</script>

<template>
  <TestDiv v-if="isDev"/>
  {{ import.meta.env}}
  <MainPage/>
</template>