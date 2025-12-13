<script setup lang="ts">
import {ref} from 'vue';
import {EnemyLayout} from "@/components/EnemyLayout";
import {UserLayout} from "@/components/UserLayout";
import {OperationLayout} from "@/components/OperationLayout";
import {FloorInfoLayout} from "@/components/FloorInfoLayout";
import {gameStateManager} from "@/manager/game-state-manager";
import {GameState} from "@/enums/enums";
import {initAll} from "@/storage/init";
import {ElMessage} from "element-plus";

const cardConfig = ref({
  shadow: 'never',
})
const buttonConfig = ref({
  autoInsertSpace: true,
})

const startGame = async () => {
  await initAll()
  gameStateManager.startCycle()
}

/** 觸發 **/
const EnemyLayoutRef = ref()
const onAttack = () => {
  EnemyLayoutRef.value?.onAttack()
}
</script>

<template>
  <el-config-provider :card="cardConfig" :button="buttonConfig" :message="{max:3}">
    <div class="common-layout">
      <el-card
          v-if="gameStateManager.is(GameState.INITIAL)"
          style="padding: 5rem;margin: 2rem"
          body-class="flex items-center justify-center flex-column"
          aaa
      >
        <h1>🏛️ 神之塔 🏛️</h1>
        <span>不斷的挑戰神之旅途</span>
        <el-button style="width: 8rem;height: 5rem" @click="startGame">
          開始遊戲
        </el-button>
      </el-card>
      <el-container v-else>
        <el-header class="header">
          <span>🏛️ 神之塔 🏛️</span>
        </el-header>
        <el-main>
          <FloorInfoLayout></FloorInfoLayout>
          <EnemyLayout ref="EnemyLayoutRef" class="enemy-layout"></EnemyLayout>
          <OperationLayout class="operation-layout" @attack="onAttack"></OperationLayout>
          <UserLayout class="user-layout"></UserLayout>
        </el-main>
      </el-container>
    </div>
  </el-config-provider>
</template>


<style scoped>
.common-layout {
  background-color: #303133;

}

.el-main {
  padding-top: 0 !important;
}

.el-main > * {
  margin-top: .5rem;
  margin-bottom: .5rem;
}


.enemy-layout {
  height: 40vh;
}

.operation-layout {
  height: 5vh;
}

.user-layout {
  height: 30vh;
}

.header {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
}

</style>
