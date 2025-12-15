<script setup lang="ts">
import {useGameStateStore} from "@/store/game-state-store";
import {UserInfo} from "@/storage/userinfo-storage";

const gameStateStore = useGameStateStore()
</script>

<template>
<el-card class="test">
  <p v-for="key in Object.keys(gameStateStore.$state)">
    {{key}}:  {{gameStateStore.$state[key]}}
  </p>
  <p>USERINFO</p>
  <p v-for="key in Object.keys(UserInfo)">
    {{key}}:  {{UserInfo[key]}}
  </p>
</el-card>
</template>

<style scoped>
.test{
  position: absolute;
  right: 50px;
  z-index: 6000;
  width: 400px;
}
</style>