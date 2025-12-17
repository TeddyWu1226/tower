<script setup lang="ts">
import {ref} from 'vue'


const activeName = ref('item')
</script>

<template>
  <el-card>
    <el-tabs
        v-model="activeName"
        stretch
    >
      <el-tab-pane label="道具" name="item">
        <span>無任何道具</span>
      </el-tab-pane>
      <el-tab-pane label="其他" name="other">
        <span>無任何物品</span>
      </el-tab-pane>
      <el-tab-pane label="裝備" name="equipment">
        <el-scrollbar height="7rem">
          <span>無任何裝備</span>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </el-card>

</template>

<style scoped>

.level {
  font-size: 16px;
  font-weight: bold;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

:deep(.el-tabs__item) {
  padding: 0;
}


:deep(.el-card__body) {
  padding: 0.5rem 1rem;
}

</style>