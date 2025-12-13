<script setup>
import {Floor} from "@/storage/floor-storage.ts";
import MapDialog from "@/components/FloorInfoLayout/comps/MapDialog.vue";
import {ref} from "vue";
import {getEnumColumn} from "@/utils/enum.ts";
import {StageEnum} from "@/enums/stage-enum.ts";

const isShowMapDialog = ref(false);
</script>

<template>
  <el-card body-class="flex justify-between items-center">
    <span style="font-size: 16px">第 {{ Floor.currentStage }} 階段 - {{getEnumColumn(StageEnum,Floor.currentStage)}}</span>
    <el-button @click="()=>{isShowMapDialog = true}">地圖</el-button>
  </el-card>
  <MapDialog v-model="isShowMapDialog"></MapDialog>
</template>

<style scoped>

</style>