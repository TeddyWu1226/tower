// 定義所有怪物的特殊行為
import {UnitStatus} from "@/constants/status/unit-status";
import {MonsterOnAttackParams} from "@/types";
import {checkProbability} from "@/utils/math";
import {showEffect} from "@/components/Shared/FloatingEffect/EffectManager";
import {MistyForestMonster} from "@/constants/monsters/monster-info/misty-forest-monster";
import {create} from "@/utils/create";


export const MonsterOnAttack: Record<string, (params: MonsterOnAttackParams) => void> = {
    slimeOnAttack: ({playerStore, logStore}) => {
        playerStore.addStatus(UnitStatus.SlimeSlow)
        logStore.logger.add(`你沾滿了黏液。`);
    },
    beeOnAttack: ({playerStore, logStore}) => {
        if (checkProbability(0.5)) {
            playerStore.addStatus(UnitStatus.BeePoison)
            logStore.logger.add(`你中毒了。`);
        }
    },
    poisonSlimeOnAttack: ({monster, playerStore, targetElement, logStore}) => {
        // 防禦減少
        showEffect(targetElement, "🛡️⬇️", "debuff");
        monster.adDefend -= 2
        if (monster.adDefend < 0) {
            monster.adDefend = 0
        }
    },
    smallSpiderOnAttack: ({playerStore, logStore}) => {
        if (checkProbability(0.2)) {
            playerStore.addStatus(UnitStatus.SmallSpiderStuck)
            logStore.logger.add(`你被綑綁了。`);
        }
    },
    spiderOnAttack: ({gameStateStore, monsterIndex, playerStore}) => {
        // 獲得針對被綑綁的玩家必定爆擊的一回合效果
        if (playerStore.statusEffects?.find(e => e.name === '綑綁')) {
            gameStateStore.addEffectToMonster(monsterIndex, UnitStatus.SpiderHunter)
        }
    }
};