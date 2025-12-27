import {NoneMonsterItemSkillParams} from "@/types";
import {showEffect} from "@/components/Shared/FloatingEffect/EffectManager";
import {GameState} from "@/enums/enums";
import {RoomEnum} from "@/enums/room-enum";
import {UserStatus} from "@/constants/status/user-status";

export const ItemSkill: Record<string, (params: NoneMonsterItemSkillParams) => void> = {
    campfire: ({playerStore, gameStateStore, callback, targetElement}) => {
        if (!gameStateStore.stateIs(GameState.SELECTION_PHASE)) {
            showEffect(targetElement, "現在無法使用!", "debuff")
            callback(false);
            return
        }
        playerStore.healFull()
        callback(true)
    },
    smokeBomb: ({playerStore, gameStateStore, callback, targetElement}) => {
        const isFightRoom = gameStateStore.roomIs([RoomEnum.Fight.value, RoomEnum.EliteFight.value])
        if (isFightRoom && gameStateStore.stateIs(GameState.EVENT_PHASE)) {
            playerStore.addStatus(UserStatus.SmokeBomb)
            showEffect(targetElement, "💨", "fullscreen")
            callback(true)
            return
        }
        showEffect(targetElement, "現在無法使用!", "debuff")
        callback(false);


    },
};