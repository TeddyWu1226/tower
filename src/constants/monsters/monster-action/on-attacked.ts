// 定義所有怪物的特殊行為
import {UnitStatus} from "@/constants/status/unit-status";
import {MonsterActionParams} from "@/types";
import {checkProbability} from "@/utils/math";
import {showEffect} from "@/components/Shared/FloatingEffect/EffectManager";
import {SpecialItem} from "@/constants/items/special-item-info";


export const MonsterOnAttacked: Record<string, (params: MonsterActionParams) => void> = {
	poisonSlimeOnAttacked: ({monster, playerStore, targetElement, logStore}) => {
		// 使攻擊者中毒
		playerStore.addStatus(UnitStatus.SlimePoison)
		logStore.logger.add(`你中毒了。`);
		// 防禦增加
		showEffect(targetElement, "🛡️⬆️", "buff");
		monster.adDefend += 5
	},
	mushroomManOnAttacked: ({playerStore, logStore}) => {
		if (checkProbability(0.5)) {
			// 使攻擊者中毒
			playerStore.addStatus(UnitStatus.MushroomManPoison)
			logStore.logger.add(`你中毒了。`);
		}
	},
	twilightOnAttacked: ({monster, playerStore, targetElement, logStore}) => {
		const chance = 0.3 + (((monster.ad - 10) / 2) * 0.1)
		if (checkProbability(chance)) {
			// 使攻擊者中毒
			playerStore.gainItem(SpecialItem.PauseToken)
			logStore.logger.add(`你得到了一個神秘的符號`);
		}

	},
};