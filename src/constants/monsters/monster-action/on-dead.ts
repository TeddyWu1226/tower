// 定義所有怪物的特殊行為
import {UnitStatus} from "@/constants/status/unit-status";
import {MonsterActionParams} from "@/types";
import {checkProbability} from "@/utils/math";
import {showEffect} from "@/components/Shared/FloatingEffect/EffectManager";
import {useEpicSubtitle} from "@/components/Shared/EpicSubtitle/useEpicSubtitle";
import {SpecialItem} from "@/constants/items/special-item-info";
import EvnStatus from "@/constants/status/evn-status";
import {getEffectiveStats} from "@/store/game-state-store";


export const MonsterOnDead: Record<string, (params: MonsterActionParams) => void> = {
    mandragoraOnDead: ({playerStore, targetElement, logStore}) => {
        playerStore.addStatus(UnitStatus.MandragoraScared)
        logStore.logger.add(`你受到驚嚇了。`);
        showEffect(targetElement, "阿!~~~~", "debuff");
    },
    twilightOnDead: ({playerStore, gameStateStore, targetElement}) => {
        useEpicSubtitle("「希望...與汝再...舞一曲...」", 3000);
        // 清掉休止符
        playerStore.removeItem(SpecialItem.PauseToken.name, -1)
    },
    duneBeastOnDead: ({playerStore, targetElement, logStore}) => {
        logStore.logger.add(`沙塵暴平息了。`);
        playerStore.removeStatus(EvnStatus.Sandstorm.name)

    },
    mummyOnDead: ({monster, playerStore, targetElement, logStore}) => {
        if (monster.apDefend <= 0) {
            return
        }
        showEffect(targetElement, "🧻", "buff");
        logStore.logger.add('木乃伊又復活了')
        monster.hp = getEffectiveStats(monster).hpLimit
        monster.adDefend -= 10
        monster.apDefend -= 10
    },
};