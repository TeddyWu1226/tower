import {SpecialEventEnum} from "@/enums/enums";
import NoneEvent from "@/components/RoomLayout/event/NoneEvent.vue";
// ... 導入所有事件組件

export const eventComponentMap = {
    [SpecialEventEnum.None]: NoneEvent,
};