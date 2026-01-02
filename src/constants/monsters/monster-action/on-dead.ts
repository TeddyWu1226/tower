// 定義所有怪物的特殊行為
import {UnitStatus} from "@/constants/status/unit-status";
import {MonsterActionParams} from "@/types";
import {checkProbability} from "@/utils/math";
import {showEffect} from "@/components/Shared/FloatingEffect/EffectManager";
import {useEpicSubtitle} from "@/components/Shared/EpicSubtitle/useEpicSubtitle";
import {SpecialItem} from "@/constants/items/special-item-info";


export const MonsterOnDead: Record<string, (params: MonsterActionParams) => void> = {
	mandragoraOnDead: ({playerStore, targetElement, logStore}) => {
		playerStore.addStatus(UnitStatus.MandragoraScared)
		logStore.logger.add(`你受到驚嚇了。`);
		showEffect(targetElement, "阿!~~~~", "debuff");
	},
	twilightOnDead: ({playerStore, gameStateStore, targetElement}) => {
		useEpicSubtitle("「希望...與汝再...舞一曲...」", 3000);
		// 清掉休止符
		playerStore.info.items = playerStore.info.items.filter(item => item.name !== SpecialItem.PauseToken.name)
	}
};