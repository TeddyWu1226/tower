import {ItemType, UsableType} from "@/types";


export const SpecialItem = {
	TwilightKey: {
		name: '月之鑰',
		icon: '🗝️',
		description: '神秘月亮形狀的鑰匙,可以打開暮光之林深處的大門',
		quality: 5,
		unsellable: true,
	} as ItemType,
	PauseToken: {
		name: '休止符',
		icon: '🎶',
		description: '從激烈舞動的能量中掉落的碎片,貌似因力量不完美而洩漏。使用後可以強制讓半神的攻擊節奏減緩',
		quality: 5,
		usable: true,
		unsellable: true,
		skill: 'usePauseToken'
	} as UsableType,
}