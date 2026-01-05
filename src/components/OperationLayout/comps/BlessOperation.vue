<script setup lang="ts">
import {usePlayerStore} from "@/store/player-store";
import {useGameStateStore} from "@/store/game-state-store";
import {getRandomElements} from "@/utils/math";
import {showEffect} from "@/components/Shared/FloatingEffect/EffectManager";
import {ref} from "vue";
import type {UsableType} from "@/types";
import {Usable} from "@/constants/items/usalbe-item/usable-info";
import {useTrackerStore} from "@/store/track-store";

const emit = defineEmits(['cancel']);
const props = defineProps({
  disabled: Boolean,
})
const playerStore = usePlayerStore();
const gameStateStore = useGameStateStore()
const trackerStore = useTrackerStore()

const taken = ref(false)
/** 選擇 **/
const BlessBtnRef = ref()
const bless = (): void => {
  taken.value = true
  const b: UsableType[] = [Usable.SmokeBomb, Usable.Campfire]
  const time = 3
  const items = getRandomElements(b, time, true)
  items.forEach(item => {
    playerStore.gainItem(item)
  })
  const text = `獲得三個隨機有用的物品`
  showEffect(BlessBtnRef.value?.$el, text, "buff")
  trackerStore.achievementsCount.withOutBless = 0
  gameStateStore.transitionToNextState()
}

const MoneyBtnRef = ref()
const money = (): void => {
  taken.value = true
  const money = 25 + gameStateStore.currentStage * 25
  playerStore.info.gold += money
  const text = `獲得 💰${money}G`
  showEffect(MoneyBtnRef.value?.$el, text, "buff")
  trackerStore.achievementsCount.withOutBless = 0
  gameStateStore.transitionToNextState()
}

const cancel = (): void => {
  trackerStore.achievementsCount.withOutBless += 1
  emit('cancel');
}
</script>

<template>
  <div class="flex">
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