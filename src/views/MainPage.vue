<script setup>
import {ref} from 'vue';
import {EnemyLayout} from "@/components/EnemyLayout";
import {UserLayout} from "@/components/UserLayout";
import {OperationLayout} from "@/components/OperationLayout";

const cardConfig = ref({
  shadow: 'never',
})
const buttonConfig = ref({
  autoInsertSpace: true,
})
</script>

<template>
  <el-config-provider :card="cardConfig" :button="buttonConfig">
    <div class="common-layout">
      <el-container>
        <el-header class="header">
          這裡是標題區
        </el-header>
        <el-main>
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
  background-color: #2c3e50;

}

.el-main > * {
  margin-top: .5rem;
  margin-bottom: .5rem;
}

.header {
  height: 5vh;
}

.operation-layout {
  height: 10vh;
}

.enemy-layout {
  height: 40vh;
}

.user-layout {
  height: 30vh;
}

</style>
