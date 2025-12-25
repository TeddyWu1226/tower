// ⚔️ WEAPON (武器) - 主力輸出
import {EquipmentType} from "@/types";
import {EquipmentPosition} from "@/enums/enums";

export const Weapon = {
    RustyDagger: {
        name: '生鏽匕首',
        description: '雖然破舊，但依舊鋒利。',
        icon: '🔪',
        position: EquipmentPosition.WEAPON,
        quality: 0,
        ad: 5,
    } as EquipmentType,
    IronSword: {
        name: '鐵劍',
        description: '標準的士兵配劍。',
        icon: '⚔️',
        position: EquipmentPosition.WEAPON,
        quality: 1,
        ad: 12,
        hit: 5
    } as EquipmentType,
    HeavyAxe: {
        name: '重型戰斧',
        description: '威力巨大但難以操控。',
        icon: '🪓',
        position: EquipmentPosition.WEAPON,
        quality: 1,
        ad: 25,
        hit: -5
    } as EquipmentType,
    SpikeSpear: {
        name: '尖刺木槍',
        icon: '🪾',
        description: '從枯死的魔樹枝幹削製而成的尖刺長槍,但使用時會奪去部分生命。',
        position: EquipmentPosition.WEAPON,
        ad: 8,
        hpLimit: -50,
        hit: 5,
        quality: 5
    }
};