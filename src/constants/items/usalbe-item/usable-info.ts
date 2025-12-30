import {UsableType} from "@/types";

export const Usable = {
    Campfire: {
        name: '簡易營火包',
        quality: 3,
        description: '讓你可以在「選擇路徑階段」復原生命以及消除Debuff',
        icon: '🏕️',
        usable: true,
        skill: 'useCampfire'
    } as UsableType,
    SmokeBomb: {
        name: '煙霧彈',
        quality: 3,
        description: '讓你可以在「戰鬥階段」使用,使用後獲得1回合必定逃跑的效果(無法在BOSS房間使用)',
        icon: '💨',
        usable: true,
        skill: 'useSmokeBomb'
    } as UsableType,
    GodLuckLeaf: {
        name: '女神之葉',
        quality: 8,
        description: '若受到致死攻擊後可以滿血復活',
        icon: '🍀',
        usable: false,
    } as UsableType,
    GodNotePage: {
        name: '神祗筆記殘頁',
        quality: 10,
        description: '神用來記錄人們愚蠢行徑的筆記殘頁,使用後可以記錄當下,當你死亡後可以有一次回檔機會',
        icon: '📜',
        usable: true,
    } as UsableType,
};