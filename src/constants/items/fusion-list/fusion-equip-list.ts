import {FusionListType, UsableType} from "@/types";
import {Potions} from "@/constants/items/usalbe-item/potion-info";
import {MATERIAL} from "@/constants/items/material/material-info";
import {Accessory1, Accessory2} from "@/constants/items/equipment/accessories-info";
import {Offhand} from "@/constants/items/equipment/offhand-info";
import {Weapon} from "@/constants/items/equipment/weapon-info";


export const FusionEquipList = [
    // 一階
    {
        target: Accessory1.DefendRing1,
        requirements: [
            {item: MATERIAL.LowerNormal, count: 3},
        ]
    } as FusionListType,
    {
        target: Accessory1.HitRing1,
        requirements: [
            {item: MATERIAL.LowerNormal, count: 3},
        ]
    } as FusionListType,
    {
        target: Accessory2.PowerNecklace1,
        requirements: [
            {item: MATERIAL.LowerNormal, count: 3},
        ]
    } as FusionListType,
    {
        target: Accessory2.CritNecklace1,
        requirements: [
            {item: MATERIAL.LowerNormal, count: 3},
        ]
    } as FusionListType,
    // 二階
    {
        target: Accessory1.DefendRing2,
        requirements: [
            {item: MATERIAL.LowerNormal, count: 5},
            {item: MATERIAL.MandrakeRoot, count: 1},
        ]
    } as FusionListType,
    {
        target: Accessory1.HitRing2,
        requirements: [
            {item: MATERIAL.LowerNormal, count: 5},
            {item: MATERIAL.VultureFeather, count: 5},
        ]
    } as FusionListType,
    {
        target: Accessory2.PowerNecklace2,
        requirements: [
            {item: MATERIAL.LowerNormal, count: 5},
            {item: MATERIAL.WolfSkin, count: 1},
        ]
    } as FusionListType,
    {
        target: Accessory2.CritNecklace2,
        requirements: [
            {item: MATERIAL.LowerNormal, count: 5},
            {item: MATERIAL.ScorpionShell, count: 5},
        ]
    } as FusionListType,
]