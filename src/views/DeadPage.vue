<script setup lang="ts">
import {useGameStateStore} from "@/store/game-state-store";

import {getEnumColumn} from "@/utils/enum";
import {StageEnum} from "@/enums/stage-enum";

const emit = defineEmits(['restart']);
const gameStateStore = useGameStateStore()

const restartGame = async () => {
  gameStateStore.init()
  emit('restart')
}

</script>

<template>
  <el-card
      class="dead"
      body-class="flex items-center justify-center flex-column"
  >
    <h1 style="color:var(--el-color-danger)">
      🪦YOU DIED🪦
    </h1>
    <h1 style="color:var(--el-color-danger);text-align: center">
      你倒在了第 {{ gameStateStore.currentStage }} 階段 - {{
        getEnumColumn(StageEnum, gameStateStore.currentStage)
      }} 的旅途上
    </h1>
    <el-button type="danger" style="width: 100%;height: 5rem" @click="restartGame">
      重新開始
    </el-button>
  </el-card>
</template>


<style scoped>

.dead {
  height: 82vh;
  padding-bottom: 15vh;
}
</style>
