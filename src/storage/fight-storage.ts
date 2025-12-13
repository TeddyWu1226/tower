import {useStorage} from "@vueuse/core";
import {operationStatusEnum} from "@/enums/enums";
import {MonsterType} from "@/types";

interface FightStorageType {
    currentMonsters: MonsterType[]
}

export const Fight = useStorage<FightStorageType>('fight',
    {
        currentMonsters: []
    }
)