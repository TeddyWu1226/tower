<script setup lang="ts">

import {Floor, getNextAvailableRooms, getRoomValue} from "@/storage/floor-storage";
import {getEnumColumn} from "@/utils/enum";
import {RoomEnum} from "@/enums/room-enum";
import {computed, Reactive, ref, watch} from "vue";
import {createMonster, Monster} from "@/assets/monster-info";
import {MonsterType} from "@/types";
import MonsterCard from "@/components/EnemyLayout/comps/MonsterCard.vue";
import {ElMessage} from "element-plus";
import {applyDamage, triggerDamageEffect} from "@/assets/fight-func";
import {UserInfo} from "@/storage/userinfo-storage";
import {MonsterCardExposed} from "@/components/EnemyLayout/comps/types";

const currentRoomValue = computed(() => {
      return getRoomValue(Floor.value.currentRoom)
    }
)
const monsters = ref<Reactive<MonsterType>[]>([])
const monsterCardRefs = ref<MonsterCardExposed[]>([]);
/** 生成對應怪物
 *
 */
const genMonster = (layer: number) => {
  monsters.value.push(createMonster(Monster.Slime))
}
// ⭐️ 關鍵修改 1: 追蹤當前選中的怪物索引
const selectedMonsterIndex = ref<number | null>(null);

/**
 * 處理 MonsterCard 的點擊事件，實現單選邏輯。
 * @param index 被點擊怪物的索引
 */
const handleMonsterSelect = (index: number) => {
  // 如果點擊的是已經選中的怪物，則取消選中 (設為 null)
  if (selectedMonsterIndex.value === index) {
    selectedMonsterIndex.value = null;
  } else {
    // 否則，選中這個新的怪物索引
    selectedMonsterIndex.value = index;
  }
  console.log(`選中怪物索引: ${selectedMonsterIndex.value}`);
}

/**
 * 怪物行動
 */

const monsterMove = () => {

}

/**
 * 階段計算
 */

const roundCalculate = () => {
  // 怪物是否死亡
}

/**
 * 玩家行動
 */
// 攻擊
const onAttack = () => {

  if (!selectedMonsterIndex.value) {
    selectedMonsterIndex.value = 0
  }
  const selectedMonster = monsters.value[selectedMonsterIndex.value];
  if (!selectedMonster) {
    ElMessage.warning('無攻擊目標!')
    return
  }
  // 傷害計算
  const damageOutput = applyDamage(UserInfo.value, selectedMonster);
  const targetElement = monsterCardRefs.value[selectedMonsterIndex.value];
  console.log('targetElement', targetElement)
  triggerDamageEffect(damageOutput, targetElement.$el)
  if (damageOutput.isHit) {
    targetElement?.shake()
  }
  // 戰階計算
  roundCalculate()
  // 怪物行動
  monsterMove()
}

defineExpose({
  onAttack
})
/**
 * 追蹤變化
 */
watch(() => Floor.value.currentRoom,
    (val) => {
      console.log('偵測切換房間', val)
      monsters.value = []; // ⭐️ 切換房間時清空怪物列表
      selectedMonsterIndex.value = null; // ⭐️ 切換房間時，清除選中狀態

      switch (currentRoomValue.value) {
        case RoomEnum.Fight.value:
          genMonster(val[0])
          break
        case RoomEnum.EliteFight.value:
          genMonster(val[0])
          genMonster(val[0])
          break
      }
    },
    {
      immediate: true,
    }
)


</script>

<template>
  <el-card>
    <div class="title">
      {{ getEnumColumn(RoomEnum, currentRoomValue, 'icon') }}
      {{ getEnumColumn(RoomEnum, currentRoomValue) }}
    </div>
    <div class="fight"
         v-if="currentRoomValue === RoomEnum.Fight.value ||
         currentRoomValue === RoomEnum.EliteFight.value"
    >
      <MonsterCard
          :ref="(el) => { if (el) monsterCardRefs[index] = el as MonsterCardExposed }"
          v-for="(monster,index) in monsters"
          :key="index"
          :info="monster"
          :is-selected="selectedMonsterIndex === index"
          @select="handleMonsterSelect(index)"
      />
    </div>
  </el-card>
</template>

<style scoped>
.title {
  font-size: 1.2rem;
}

.fight {
  padding: 2rem;
  display: flex;
  justify-content: space-around;
}
</style>