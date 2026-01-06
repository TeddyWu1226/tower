import {StatusEffect} from "@/types";

const EvnStatus = {
    Sandstorm: {
        name: '沙塵暴',
        icon: '🌪️',
        duration: -1,
        description: '沙塵暴的影響下,你的命中降低 20 點,並每次行動扣 3 HP',
        bonus: {
            hit: -20
        },
        type: 'damage',
        value: 3
    } as StatusEffect,
}
export default EvnStatus