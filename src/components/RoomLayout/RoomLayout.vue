<script setup lang="ts">

import {getEnumColumn} from "@/utils/enum";
import {RoomEnum} from "@/enums/room-enum";
import {computed, ref, watch} from "vue";
import {useGameStateStore} from "@/store/game-state-store";
import RestRoom from "@/components/RoomLayout/comps/RestRoom.vue";
import FightRoom from "@/components/RoomLayout/comps/FightRoom.vue";
import EventRoomCard from "@/components/RoomLayout/comps/EventRoomCard.vue";

const emit = defineEmits(['playerDead', 'runFailed'])
const gameStateStore = useGameStateStore()

const currentRoomValue = computed(() => {
      return gameStateStore.currentRoomValue
    }
)
const onPlayerDead = () => {
  emit('playerDead', true)
}
const onRunFailed = () => {
  emit('runFailed', true)
}
/** 戰鬥房間 **/
const FightRoomRef = ref()
// 攻擊
const onAttack = () => {
  FightRoomRef.value.onAttack()
}

const onRun = () => {
  FightRoomRef.value?.onRun()
}

/** 休息房間 **/
const RestRoomRef = ref()
const onRest = () => {
  RestRoomRef.value?.onRest()
}


/** 綜合取消 **/
const onCancel = () => {
  switch (currentRoomValue.value) {
    case RoomEnum.Rest.value:
      gameStateStore.transitionToNextState()
      break;
  }
}

defineExpose({
  onAttack,
  onRun,
  onRest,
  onCancel
})

/** 初始化刷新 **/
const roomKeyCounter = ref(0)

watch(() => gameStateStore.currentRoom,
    () => {
      roomKeyCounter.value++
    },
    {
      immediate: true,
      deep: true
    }) // 確保在組件第一次加載時也能觸發計數
</script>

<template>
  <EventRoomCard v-if="currentRoomValue === RoomEnum.Event.value"/>
  <el-card v-else>
    <div class="title">
      {{ getEnumColumn(RoomEnum, currentRoomValue, 'icon') }}
      {{ getEnumColumn(RoomEnum, currentRoomValue) }}
    </div>
    <FightRoom
        ref="FightRoomRef"
        v-if="currentRoomValue === RoomEnum.Fight.value ||currentRoomValue === RoomEnum.EliteFight.value"
        @player-dead="onPlayerDead"
        @run-failed="onRunFailed"
        :key="roomKeyCounter"
    />
    <RestRoom ref="RestRoomRef" v-if="currentRoomValue === RoomEnum.Rest.value" :key="roomKeyCounter"/>
  </el-card>
</template>

<style scoped>
.title {
  font-size: 1.2rem;
}
</style>