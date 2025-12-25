import {
    AncientRootsWeights,
    BeginForestWeights,
    FairyBarrierWeights, GuardiansDenWeights,
    SunkenGroveWeights
} from "@/constants/stage-monster-weights";
import {EquipmentType} from "@/types";
import {Weapon} from "@/constants/equipment/weapon-info";
import {Armor} from "@/constants/equipment/armor-info";

export const stageMonsterWeightsMap: Record<number, Record<string, number>> = {
    1: BeginForestWeights,
    2: SunkenGroveWeights,
    3: AncientRootsWeights,
    4: FairyBarrierWeights,
    5: GuardiansDenWeights
}


export const stageShopSaleEquipmentMap: Record<number, EquipmentType[]> = {
    1: [Weapon.RustyDagger,Armor.TatteredRags],
    2: [],
    3: [],
    4: [],
    5: [],
}