// 定義所有怪物的特殊行為
import {UnitStatus} from "@/constants/status/unit-status";
import {MonsterActionParams} from "@/types";
import {checkProbability} from "@/utils/math";
import {showEffect} from "@/components/Shared/FloatingEffect/EffectManager";
import {GameState} from "@/enums/enums";


export const ItemSkill: Record<string, (params: MonsterActionParams) => void> = {
    campfire: ({playerStore, gameStateStore}) => {
        if (!gameStateStore.stateIs(GameState.SELECTION_PHASE)) {
            return
        }
        playerStore.healFull()
    },
};