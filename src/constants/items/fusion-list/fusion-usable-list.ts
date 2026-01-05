import {FusionListType, UsableType} from "@/types";
import {Potions} from "@/constants/items/usalbe-item/potion-info";
import {MATERIAL} from "@/constants/items/material/material-info";


export const FusionUsableList = [
    {
        target: Potions.Heal1,
        requirements: [
            {item: MATERIAL.DesertRabbitMeat, count: 2},
            {item: MATERIAL.SandWormBloodClot, count: 2},

        ]
    } as FusionListType,
    {
        target: Potions.Magic1,
        requirements: [
            {item: MATERIAL.DesertRabbitMeat, count: 2},
            {item: MATERIAL.CactusMeat, count: 2},
        ]
    } as FusionListType,
    {
        target: Potions.UnPoisonPotion,
        requirements: [
            {item: MATERIAL.BeeStinger, count: 2},
            {item: MATERIAL.SandWormBloodClot, count: 2},
        ]
    } as FusionListType,
]