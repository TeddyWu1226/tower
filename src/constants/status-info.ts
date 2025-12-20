import {StatusEffect} from "@/types";

export const UnitStatus = {
    SlimeSlow: {
        name: '黏液阻饒',
        icon: '🟢',
        duration: 2,
        description: '降低 10 點 閃避值',
        bonus: {
            dodge: -10
        }
    } as StatusEffect,

    Poison: {
        name: '中毒',
        icon: '🤢',
        duration: 3,
        description: '每回合失去 5 點生命值',
        type: 'damage',
        value: 5
    } as StatusEffect
}