import {FusionListType, UsableType} from "@/types";
import {Potions} from "@/constants/items/usalbe-item/potion-info";
import {MATERIAL} from "@/constants/items/material/material-info";
import {Accessory2} from "@/constants/items/equipment/accessories-info";
import {SpecialItem} from "@/constants/items/special-item-info";


export const FusionOtherList = [
    {
        target: SpecialItem.ClearMirror,
        requirements: [
            {item: MATERIAL.CactusWater, count: 1},
            {item: MATERIAL.ScorpionBlackShell, count: 1}
        ]
    } as FusionListType,
    {
        target: SpecialItem.ClearMirror,
        requirements: [
            {item: SpecialItem.ClearMirrorFragment, count: 20}
        ]
    } as FusionListType,
]