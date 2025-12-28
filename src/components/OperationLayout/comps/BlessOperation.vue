<script setup lang="ts">


import {usePlayerStore} from "@/store/player-store";
import {useGameStateStore} from "@/store/game-state-store";
import {checkProbability, getRandomElements} from "@/utils/math";
import {showEffect} from "@/components/Shared/FloatingEffect/EffectManager";
import {ref} from "vue";
import {BlessStatus} from "@/constants/status/bless-status";
import type {StatusEffect, UsableType} from "@/types";
import {Usable} from "@/constants/items/usalbe-item/usable-info";

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
  const b: UsableType[] = [Usable.SmokeBomb, Usable.Campfire]
  const time = 3
  const items = getRandomElements(b, time, true)
  items.forEach(item => {
    playerStore.gainItem(item)
  })
  const text = `獲得三個隨機有用的物品!`
  showEffect(StrengthenBtnRef.value?.$el, text, "buff")
  gameStateStore.transitionToNextState()
}

const MoneyBtnRef = ref()
const money = (): void => {
  taken.value = true
  const money = 50
  playerStore.info.gold += money
  const text = `獲得 💰${money}G`
  showEffect(MoneyBtnRef.value?.$el, text, "buff")
  gameStateStore.transitionToNextState()
}

const cancel = (): void => {
  emit('cancel');
}
</script>

<template>
  <div class="flex">
    <el-button ref="StrengthenBtnRef" type="success" :disabled="props.disabled||taken" @click="strengthen">
      變得更強
    </el-button>
    <el-button ref="BlessBtnRef" type="primary" :disabled="props.disabled||taken" @click="bless">
      變得安全
    </el-button>
    <el-button ref="MoneyBtnRef" type="warning" :disabled="props.disabled||taken" @click="money">
      變得有錢
    </el-button>
    <el-button type="info" :disabled="props.disabled" @click="cancel">
      繼續前進
    </el-button>
  </div>
</template>

<style scoped>
</style>