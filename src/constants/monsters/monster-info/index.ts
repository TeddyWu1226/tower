import {MistyForestMonster} from "@/constants/monsters/monster-info/misty-forest-monster";
import {EndLessMonster} from "@/constants/monsters/monster-info/endless-monster";
import {ScorchedSandsMonster} from "@/constants/monsters/monster-info/scorched-sands-monster";


export const Monster = {
    ...MistyForestMonster,
    ...ScorchedSandsMonster,
    ...EndLessMonster
}