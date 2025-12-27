import {StatusEffect} from "@/types";

export const UserStatus = {
    torchBurn: {
        name: '燃燒',
        icon: '🔥',
        duration: 3,
        description: '火把燃燒效果,使目標受到 2 點傷害',
        type: 'damage',
        value: 2
    } as StatusEffect,
    SmokeBomb: {
        name: '煙霧迷漫',
        icon: '💨',
        duration: 1,
        isBuff: true,
        description: '煙霧迷漫狀態下,獲得必定逃跑效果',
        bonus: {
            dodge: 1000000000000
        }
    } as StatusEffect,
}