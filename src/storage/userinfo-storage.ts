import {StorageSerializers, useStorage} from "@vueuse/core";
import {UserType} from "@/types";
import {DEFAULT_USER_INFO} from "@/assets/default-const";


export const UserInfo = useStorage<UserType>('user-info',
    DEFAULT_USER_INFO,
    // 2. 新增第三個參數：指定 storage 類型 (默認是 localStorage，可選)
    localStorage,
    // 3. 新增第四個參數：配置選項
    {serializer: StorageSerializers.object} // <--- 4. 關鍵：使用 JSON 序列化器
)