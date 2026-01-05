<script setup lang="ts">
import '../event/event-room.css'
import {usePlayerStore} from "@/store/player-store";
import {FusionUsableList} from "@/constants/fusion-usable-list";
import {getEnumColumn} from "@/utils/enum";
import {QualityEnum} from "@/enums/quality-enum";
import {FusionListType, ItemType} from "@/types";
import {ElMessage} from "element-plus";

const playerStore = usePlayerStore();

// 檢查玩家背包是否滿足「所有」素材需求
const canCraft = (recipe: FusionListType): boolean => {
  return recipe.requirements.every(
      (req: {
        item: ItemType;
        count: number
      }) => {
        return playerStore.hasItem(req.item.name, req.count)[0];
      });
};

// 取得玩家當前擁有該素材的數量（用於介面顯示 x/y）
const getOwnedCount = (itemName: string) => {
  return playerStore.info.items?.filter(item => item.name === itemName).length || 0;
};

const onCraft = (recipe: FusionListType) => {
  if (!canCraft(recipe)) return;
  // 移除物品
  recipe.requirements.forEach(
      (req: {
        item: ItemType;
        count: number
      }) => {
        playerStore.removeItem(req.item.name, req.count);
      });
  // 給予合成物品
  playerStore.gainItem(recipe.target)
  ElMessage.success(`合成「${recipe.target.name}」`)
};

</script>

<template>
  <div class="craft-room">
    <div class="recipe-container">
      <div v-for="(recipe,index) in FusionUsableList" :key="index" class="recipe-row">
        <div class="target-block">
          <div class="target-icon">{{ recipe.target.icon }}</div>
          <div class="target-name"
               :style="{color:getEnumColumn(QualityEnum,recipe.target.quality,'color')}">
            {{ recipe.target.name }}
          </div>
        </div>

        <div class="materials-block">
          <div v-for="(req, idx) in recipe.requirements" :key="idx" class="material-tag">
            <span class="m-icon">{{ req.item.icon }}</span>
            <span
                class="m-name"
                :style="{color:getEnumColumn(QualityEnum,req.item.quality,'color')}"
            >
              {{ req.item.name }}
            </span>
            <span class="m-count" :class="{ 'insufficient': getOwnedCount(req.item.name) < req.count }">
                {{ getOwnedCount(req.item.name) }}/{{ req.count }}
              </span>
          </div>
        </div>

        <div class="action-block">
          <el-button
              type="primary"
              plain
              :disabled="!canCraft(recipe)"
              @click="onCraft(recipe)"
          >
            合成
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.craft-room {
  height: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recipe-container {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.recipe-row {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid #333;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 12px;
}

.target-block {
  text-align: center;
  min-width: 80px;
}

.target-icon {
  font-size: 1.5rem;
}

.target-name {
  font-size: 0.7rem;
  margin-top: 4px;
}

.materials-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.material-tag {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 2px 8px;
  border-radius: 4px;
}

.m-icon {
  margin-right: 6px;
}

.m-name {
  flex: 1;
}

.m-count {
  font-family: monospace;
  color: #2ecc71;
}

.m-count.insufficient {
  color: #ff4d4f;
}

.action-block {
  min-width: 70px;
}


.footer-action {
  margin-top: 24px;
  color: #555;
  font-size: 0.9rem;
  cursor: pointer;
}
</style>