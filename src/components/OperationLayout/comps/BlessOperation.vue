<script setup lang="ts">


import {usePlayerStore} from "@/store/player-store";
import {useGameStateStore} from "@/store/game-state-store";
import {checkProbability, getRandomElements} from "@/utils/math";
import {showEffect} from "@/components/Shared/FloatingEffect/EffectManager";
import {ref} from "vue";
import {BlessStatus} from "@/constants/status-info/bless-status";
import type {StatusEffect} from "@/types";

const emit = defineEmits(['cancel']);
const props = defineProps({
  disabled: Boolean,
})
const playerStore = usePlayerStore();
const gameStateStore = useGameStateStore()
const StrengthenBtnRef = ref()
const taken = ref(false)
/** 選擇 **/
// 強化函數
const strengthen = (): void => {
  taken.value = true
  // 1. 判定強化種類 (50% 機率)
  const isAtkBoost = checkProbability(0.5);

  if (isAtkBoost) {
    // 強化攻擊：基礎 AD + 2
    playerStore.info.ad += 2

    // 如果有傳入 DOM 元素，顯示特效
    showEffect(StrengthenBtnRef.value?.$el, "⚔️ AD +2", "buff")
  } else {
    // 強化血量：基礎 HP 與 HP 上限同時 + 25
    playerStore.info.hpLimit += 25
    playerStore.info.hp += 25

    showEffect(StrengthenBtnRef.value?.$el, "❤️ HP +25", "buff")
  }
  gameStateStore.transitionToNextState()
}
const BlessBtnRef = ref()
const bless = (): void => {
  taken.value = true
  const b: StatusEffect[] = [BlessStatus.ShieldBless, BlessStatus.WindBless, BlessStatus.HealLight,
    BlessStatus.AccurateLight, BlessStatus.FightingSpirit]
  const bless = getRandomElements(b)[0]
  playerStore.addStatus(bless)
  const text = `獲得 ${bless.icon}${bless.name}`
  showEffect(StrengthenBtnRef.value?.$el, text, "buff")
  gameStateStore.transitionToNextState()
}

const cancel = (): void => {
  emit('cancel');
}
</script>

<template>
  <div class="flex">
    <el-button ref="StrengthenBtnRef" type="success" :disabled="props.disabled||taken" @click="strengthen">
      強化
    </el-button>
    <el-button ref="BlessBtnRef" type="warning" :disabled="props.disabled||taken" @click="bless">
      祝福
    </el-button>
    <el-button type="info" :disabled="props.disabled" @click="cancel">
      繼續前進
    </el-button>
  </div>
</template>

<style scoped>
</style>