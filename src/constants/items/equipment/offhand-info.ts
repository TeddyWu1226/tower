import {EquipmentType} from "@/types";
import {EquipmentPosition} from "@/enums/enums";

export const Offhand = {
    Shield0: {
        name: '殘破木門',
        description: '從廢墟拆下來的門板，笨重但聊勝於無。',
        icon: '🚪',
        position: EquipmentPosition.OFFHAND,
        quality: 0,
        defendIncrease: 5,
        dodge: -10
    } as EquipmentType,
    Shield1: {
        name: '鐵製鳶盾',
        description: '標準的軍用防護。',
        icon: '🛡️',
        position: EquipmentPosition.OFFHAND,
        quality: 1,
        adDefend: 5,
        defendIncrease: 4,
    } as EquipmentType,

    Shield2: {
        name: '合金圓盾',
        description: '輕便且靈活。',
        icon: '🛡️',
        position: EquipmentPosition.OFFHAND,
        quality: 2,
        adDefend: 10,
        defendIncrease: 4,
        dodge: 5
    } as EquipmentType,
    Shield3: {
        name: '強化重盾',
        description: '加固過的盾牌，防禦力顯著。',
        icon: '🛡️',
        position: EquipmentPosition.OFFHAND,
        quality: 3,
        adDefend: 15,
        dodge: -8,
        defendIncrease: 6
    } as EquipmentType,
    Shield4: {
        name: '鋼鐵巨塔',
        description: '如牆壁般厚重，但也限制了動作。',
        icon: '🛡️',
        position: EquipmentPosition.OFFHAND,
        quality: 4,
        adDefend: 20,
        dodge: -30,
        defendIncrease: 8
    } as EquipmentType,
    Shield5: {
        name: '守望者之盾',
        description: '古代衛兵留下的盾牌，充滿韌性。',
        icon: '🛡️',
        position: EquipmentPosition.OFFHAND,
        quality: 5,
        adDefend: 25,
        dodge: 5,
        defendIncrease: 10
    } as EquipmentType,

    Book0: {
        name: '學徒筆記',
        description: '寫有一些基礎法術文字的筆記，稍微拓寬了魔力的流向。',
        icon: '📝',
        position: EquipmentPosition.OFFHAND,
        quality: 0,
        spLimit: 50,
    } as EquipmentType,
    Book1: {
        name: '學徒之書',
        description: '記載了法術施放的竅門，能更有效地儲存精神能量。',
        icon: '📗',
        position: EquipmentPosition.OFFHAND,
        quality: 1,
        spLimit: 100,
    } as EquipmentType,
    Book2: {
        name: '導師典籍',
        description: '書中紀錄著祕法之力的運用，大幅提昇了魔力的容納上限。',
        icon: '📙',
        position: EquipmentPosition.OFFHAND,
        quality: 2,
        spLimit: 150,
    } as EquipmentType,
    Book3: {
        name: '法術篇章',
        description: '紀錄大量祕法的卷軸，散發著幽幽藍光，保護心智並提供龐大的魔力。',
        icon: '📜',
        position: EquipmentPosition.OFFHAND,
        quality: 3,
        spLimit: 200,
        defendIncrease: 5,
    } as EquipmentType,
    Book4: {
        name: '魔力之書',
        description: '唯有意志堅定者方能閱讀，魔力如潮汐般湧動，額外提供持有者一定保護。',
        icon: '📘',
        position: EquipmentPosition.OFFHAND,
        quality: 4,
        spLimit: 250,
        defendIncrease: 10,
    } as EquipmentType,
    Book5: {
        name: '祕法典籍',
        description: '世間法術的詳細記錄，書頁中流淌著純粹的以太，賦予佩戴者大量智慧與保護。',
        icon: '📓',
        position: EquipmentPosition.OFFHAND,
        quality: 5,
        spLimit: 300,
        defendIncrease: 15,
    } as EquipmentType,
};