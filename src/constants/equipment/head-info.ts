// 🪖 HEAD (頭部) - 防禦與法力
import {EquipmentType} from "@/types";
import {EquipmentPosition} from "@/enums/enums";

export const Head: Record<string, EquipmentType> = {
    ClothHood: {
        name: '布質兜帽',
        description: '簡單的遮風避雨工具。',
        icon: '🧤',
        position: EquipmentPosition.HEAD,
        quality: 0,
        adDefend: 2
    },
    LeatherCap: {
        name: '皮製軟帽',
        description: '輕便且具有基本防護。',
        icon: '🧢',
        position: EquipmentPosition.HEAD,
        quality: 1,
        adDefend: 5,
        dodge: 2
    },
    IronHelmet: {
        name: '鐵製頭盔',
        description: '扎實的物理防護。',
        icon: '🪖',
        position: EquipmentPosition.HEAD,
        quality: 1,
        adDefend: 12,
        hpLimit: 30
    },
    SageCirclet: {
        name: '賢者頭飾',
        description: '提升思維的清晰度。',
        icon: '👑',
        position: EquipmentPosition.HEAD,
        quality: 2,
        adDefend: 4,
        spLimit: 50
    },
    ShadowVeil: {
        name: '暗影面紗',
        description: '讓你消失在敵人的視線中。',
        icon: '🌑',
        position: EquipmentPosition.HEAD,
        quality: 3,
        adDefend: 6,
        dodge: 15
    },
    GoldenCrown: {
        name: '黃金王冠',
        description: '權力的象徵，帶有神聖加持。',
        icon: '👑',
        position: EquipmentPosition.HEAD,
        quality: 4,
        adDefend: 15,
        hpLimit: 100,
        spLimit: 100
    },
    DragonScaleHelm: {
        name: '龍鱗頭盔',
        description: '由巨龍鱗片打造。',
        icon: '🦎',
        position: EquipmentPosition.HEAD,
        quality: 4,
        adDefend: 35,
        hpLimit: 150
    },
    TitanHelmet: {
        name: '泰坦神盔',
        description: '如山嶽般沉重的防禦。',
        icon: '🏛️',
        position: EquipmentPosition.HEAD,
        quality: 4,
        adDefend: 50,
        hpLimit: 300
    },
    MadKingsMask: {
        name: '瘋王面具',
        description: '聽得見瘋狂的低語。',
        icon: '🤡',
        position: EquipmentPosition.HEAD,
        quality: 5,
        ad: 30,
        adDefend: -20,
        spLimit: 200
    },
    SkullGaze: {
        name: '死亡凝視',
        description: '直視深淵的代價。',
        icon: '💀',
        position: EquipmentPosition.HEAD,
        quality: 5,
        critRate: 15,
        hpLimit: -50
    }
};