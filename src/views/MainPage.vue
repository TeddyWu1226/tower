<script setup lang="ts">
import {ref} from 'vue';
import {EnemyLayout} from "@/components/EnemyLayout";
import {UserLayout} from "@/components/UserLayout";
import {OperationLayout} from "@/components/OperationLayout";
import {FloorInfoLayout} from "@/components/FloorInfoLayout";
import {gameStateManager} from "@/manager/game-state-manager";

const cardConfig = ref({
  shadow: 'never',
})
const buttonConfig = ref({
  autoInsertSpace: true,
})

gameStateManager.startCycle()
</script>

<template>
  <el-config-provider :card="cardConfig" :button="buttonConfig">
    <div class="common-layout">
      <el-container>
        <el-header class="header">
          <span>🏛️ 神之塔 🏛️</span>
        </el-header>
        <el-main>
          <FloorInfoLayout></FloorInfoLayout>
          <EnemyLayout class="enemy-layout"></EnemyLayout>
          <OperationLayout class="operation-layout"></OperationLayout>
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
