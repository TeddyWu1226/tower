import {FusionListType, UsableType} from "@/types";
import {Potions} from "@/constants/items/usalbe-item/potion-info";
import {MATERIAL} from "@/constants/items/material/material-info";

const FusionItem = {
    WormBloodCure: {
        name: '血腥活化劑',
        description: '聞起來像雜草，效果微乎其微。',
        icon: '🧪',
        quality: 0,
        heal: 25,
        usable: true
    } as UsableType
}


export const FusionUsableList = [
    {
        target: Potions.Heal2,
        requirements: [
            {item: MATERIAL.DesertRabbitMeat, count: 3},
            {item: MATERIAL.SandWormBloodClot, count: 3},

        ]
    } as FusionListType,
    {
        target: Potions.Magic2,
        requirements: [
            {item: MATERIAL.DesertRabbitMeat, count: 3},
            {item: MATERIAL.CactusMeat, count: 3},
        ]
    } as FusionListType,
]