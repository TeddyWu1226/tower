import {PotionType} from "@/types";

const Heal = {
    heal0: {
        name: '粗製藥水',
        description: '聞起來像雜草，效果微乎其微。',
        icon: '🧪',
        quality: 0,
        heal: 25,
        usable: true
    } as PotionType,

    heal1: {
        name: '初級生命藥水',
        description: '冒險者的基本必備品。',
        icon: '🧪',
        quality: 1,
        heal: 50,
        usable: true
    } as PotionType,

    heal2: {
        name: '中級生命萃取液',
        description: '口感苦澀但恢復效果顯著。',
        icon: '',
        quality: 2,
        heal: 100,
        usable: true
    } as PotionType,
};


const Magic = {
    magic0: {
        name: '混濁果汁',
        description: '感覺放了很久，只能稍微提神。',
        icon: '🍷',
        quality: 0,
        magic: 10,
        usable: true
    } as PotionType,
    magic1: {
        name: '初級法力藥水',
        description: '淡淡的藍色液體。',
        icon: '🍷',
        quality: 1,
        magic: 20,
        usable: true
    } as PotionType,
    magic2: {
        name: '清澈法力藥水',
        description: '精煉過的魔力液體，恢復感極強。',
        icon: '🍷',
        quality: 2,
        magic: 50
    } as PotionType,
};


export const Potions = {...Heal, ...Magic}