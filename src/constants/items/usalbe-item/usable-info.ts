import {UsableType} from "@/types";

export const Usable = {
    campfire: {
        name: '簡易營火包',
        quality: 3,
        description: '讓你可以在「選擇路徑階段」復原生命以及消除Debuff',
        icon: '🏕️',
        usable: true,
        skill: 'campfire'
    } as UsableType,
    smokeBomb: {
        name: '煙霧彈',
        quality: 3,
        description: '讓你可以在「戰鬥階段」使用,使用後獲得1回合必定逃跑的效果(無法在BOSS房間使用)',
        icon: '💨',
        usable: true,
        skill: 'smokeBomb'
    } as UsableType,
};