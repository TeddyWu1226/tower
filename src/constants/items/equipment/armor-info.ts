import {EquipmentPosition} from "@/enums/enums";
import {EquipmentType} from "@/types";

export const Armor = {
    Armor0: {
        name: '輕盈布甲',
        description: '輕盈到幾乎沒有重量，便於躲避。',
        icon: '👕',
        position: EquipmentPosition.BODY,
        quality: 0,
        dodge: 2,
        adDefend: 2
    } as EquipmentType,
    Armor1: {
        name: '填充棉甲',
        description: '雖然厚實，但防禦效果有限。',
        icon: '🧥',
        position: EquipmentPosition.BODY,
        quality: 1,
        dodge: 5,
        adDefend: 5
    } as EquipmentType,
    Armor2: {
        name: '鎖子甲',
        description: '基礎的鐵環編織，提供基本防護。',
        icon: '⛓️',
        position: EquipmentPosition.BODY,
        quality: 2,
        adDefend: 10
    } as EquipmentType,
    Armor3: {
        name: '精煉鋼甲',
        description: '經過多次鍛造的鋼片，防護性能顯著提升。',
        icon: '👔',
        position: EquipmentPosition.BODY,
        quality: 3,
        dodge: -5,
        adDefend: 20
    } as EquipmentType,
    Armor4: {
        name: '騎士板甲',
        description: '厚重的全身鋼製板甲，雖然沉重但極其可靠。',
        icon: '🦾',
        position: EquipmentPosition.BODY,
        quality: 4,
        dodge: -15,
        adDefend: 35
    } as EquipmentType,
    Armor5: {
        name: '要塞重鎧',
        description: '宛如移動城牆般的重型裝甲，能彈開絕大多數的物理攻擊。',
        icon: '🏰',
        position: EquipmentPosition.BODY,
        quality: 5,
        dodge: -25,
        adDefend: 40
    } as EquipmentType,
};