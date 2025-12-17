// 👕 BODY (身體) - 高生命與高防禦
import {EquipmentType} from "@/types";
import {EquipmentPosition} from "@/enums/enums";

export const Armor: Record<string, EquipmentType> = {
    TatteredRags: {
        name: '破爛衣衫',
        description: '幾乎沒有防禦力。',
        icon: '👕',
        position: EquipmentPosition.BODY,
        quality: 0,
        adDefend: 1
    },
    TravellerTunic: {
        name: '旅人長袍',
        description: '耐磨且通風。',
        icon: '🥋',
        position: EquipmentPosition.BODY,
        quality: 1,
        adDefend: 8,
        dodge: 3
    },
    ChainMail: {
        name: '鎖子甲',
        description: '有效抵禦揮砍。',
        icon: '⛓️',
        position: EquipmentPosition.BODY,
        quality: 1,
        adDefend: 20,
        hpLimit: 50
    },
    SilverBreastplate: {
        name: '白銀胸甲',
        description: '華麗且堅固。',
        icon: '🛡️',
        position: EquipmentPosition.BODY,
        quality: 2,
        adDefend: 35,
        hpLimit: 100
    },
    RuneRobe: {
        name: '符文長袍',
        description: '刻滿了防護咒語。',
        icon: '👗',
        position: EquipmentPosition.BODY,
        quality: 2,
        adDefend: 15,
        spLimit: 200
    },
    PaladinArmor: {
        name: '聖騎士重鎧',
        description: '為了守護而存在的防具。',
        icon: '🧱',
        position: EquipmentPosition.BODY,
        quality: 3,
        adDefend: 50,
        hpLimit: 200
    },
    GuardianPlate: {
        name: '守護者全身甲',
        description: '戰場上的移動堡壘。',
        icon: '🏰',
        position: EquipmentPosition.BODY,
        quality: 4,
        adDefend: 70,
        hpLimit: 400
    },
    PhoenixVest: {
        name: '鳳凰羽衣',
        description: '擁有強大的生命力。',
        icon: '🔥',
        position: EquipmentPosition.BODY,
        quality: 4,
        adDefend: 30,
        hpLimit: 500
    },
    WraithArmor: {
        name: '幽魂鎧甲',
        description: '觸摸不到的虛擬防衛。',
        icon: '👻',
        position: EquipmentPosition.BODY,
        quality: 5,
        dodge: 50,
        hpLimit: -200
    },
    VoidCarapace: {
        name: '虛空甲殼',
        description: '吞噬一切光芒。',
        icon: '🕳️',
        position: EquipmentPosition.BODY,
        quality: 5,
        adDefend: 120,
        spLimit: -100
    }
};