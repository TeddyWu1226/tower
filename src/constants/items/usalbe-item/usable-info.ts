import {PotionType} from "@/types";

export const Usable = {
    campfire: {
        name: '簡易營火包',
        quality: 3,
        description: '讓你可以在選擇線路階段復原生命以及消除Debuff',
        icon: '🏕️',
        usable: true,
        skill: 'campfire'
    } as PotionType,
};