<script setup lang="ts">
import {ref} from "vue";
import {operationStatusEnum} from "@/enums/enums";
import {Operation} from "@/storage/operation-storage";

/**狀態紀錄**/
const isDisabled = ref<boolean>(false)
const changeStatus = (value: operationStatusEnum = operationStatusEnum.Default): void => {
  Operation.value.current = value
}
</script>

<template>
  <div v-if="Operation.current===operationStatusEnum.Skill" class="flex">
    <el-button type="info" plain :disabled="isDisabled" @click="changeStatus">
      返回
    </el-button>
  </div>
  <div v-else-if="Operation.current===operationStatusEnum.Package" class="flex">
    <el-button type="info" plain :disabled="isDisabled" @click="changeStatus">
      返回
    </el-button>
  </div>
  <div v-else class="flex">
    <el-button type="primary">
      攻擊
    </el-button>
    <el-button type="primary" :disabled="isDisabled" @click="changeStatus(operationStatusEnum.Skill)">
      技能
    </el-button>
    <el-button type="info" :disabled="isDisabled" @click="changeStatus(operationStatusEnum.Package)">
      背包
    </el-button>
    <el-button type="danger" :disabled="isDisabled">
      逃跑
    </el-button>
  </div>
</template>

<style scoped>
.el-button {
  height: 100%;
}

.flex > * {
  flex: 1;
}
</style>