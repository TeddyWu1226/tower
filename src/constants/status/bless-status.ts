import {StatusEffect} from "@/types";

export const BlessStatus = {
    WindBless: {
        name: '風之祝福',
        icon: '💨',
        duration: 30,
        description: '提升30點閃避值',
        isBuff: true,
        bonus: {
            dodge: 30
        }
    } as StatusEffect,
    ShieldBless: {
        name: '盾之守護',
        icon: '⛨',
        duration: 30,
        description: '提升2點防禦值',
        isBuff: true,
        bonus: {
            adDefend: 5
        }
    } as StatusEffect,
    HealLight: {
        name: '生命之光',
        icon: '💚',
        duration: 30,
        description: '每次行動回復3點生命',
        isBuff: true,
        type: 'heal',
        value: 5
    } as StatusEffect,
    AccurateLight: {
        name: '精準之光',
        icon: '🎯',
        duration: 30,
        description: '提升10點命中以及10%爆擊機率',
        isBuff: true,
        bonus: {
            hit: 10,
            critRate: 10,
        }
    } as StatusEffect,
    FightingSpirit: {
        name: '戰意',
        icon: '👊',
        duration: 30,
        description: '提升5點攻擊力',
        isBuff: true,
        bonus: {
            ad: 5
        }
    } as StatusEffect,
}