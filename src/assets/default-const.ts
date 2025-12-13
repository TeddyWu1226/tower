// 人物初始值
import {CharEnum} from "@/enums/char-enum";
import {FloorStorageType, RoomWeights, UserType} from "@/types";
import {WorldDefault} from "@/assets/const";

export const DEFAULT_USER_INFO: UserType = {
    ad: 10,
    adDefend: 0,
    critIncrease: WorldDefault.critIncrease,
    critRate: WorldDefault.critRate,
    dodge: 0,
    hit: 0,
    hp: 100,
    hpLimit: 100,
    sp: 100,
    spLimit: 100,
    level: 1,
    char: CharEnum.Beginner.value
}

// 房間類型權重
export const DEFAULT_ROOM_WEIGHTS: RoomWeights = {
    0: 5, // 休息
    1: 70, // 戰鬥
    2: 15, // 菁英戰鬥
    3: 5, // 特殊事件
    4: 5, // 商店
};

export const DEFAULT_FLOOR: FloorStorageType = {
    currentStage: 1,
    currentRoom: [1, 0],
    currentStageRooms: []
}