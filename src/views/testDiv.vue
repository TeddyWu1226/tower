<script setup lang="ts">
import {useGameStateStore} from "@/store/game-state-store";
import {usePlayerStore} from "@/store/player-store";

const gameStateStore = useGameStateStore()
const playerInfo = usePlayerStore()
</script>

<template>
  <el-card class="test">
    <p v-for="key in Object.keys(gameStateStore.$state)">
      {{ key }}: {{ gameStateStore.$state[key] }}
    </p>
    <p>PLAYER</p>
    <p v-for="key in Object.keys(playerInfo.info)">
      {{ key }}: {{ playerInfo.info[key] }}
    </p>
  </el-card>
</template>

<style scoped>
.test {
  position: absolute;
  right: 50px;
  z-index: 6000;
  width: 400px;
}
</style>