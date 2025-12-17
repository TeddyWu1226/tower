import {MonsterType} from "@/types";
import {WorldDefault} from "@/assets/const";

export const Monster = {
    Slime: {
        icon: '🟢',
        name: '史萊姆',
        description: '閃避率較高的初級魔物',
        ad: 5,
        critIncrease: WorldDefault.critIncrease,
        critRate: WorldDefault.critRate,
        adDefend: 0,
        dodge: 5,
        hit: 1,
        hp: 20,
        hpLimit: 20,
        level: 1,
        dropGold: 5
    } as MonsterType
}