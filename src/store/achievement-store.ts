import {defineStore} from 'pinia';
import {ref, h} from 'vue';
import {Achievement} from "@/constants/achievement";


export const useAchievementStore = defineStore('achievement', () => {
    // 1. 初始化資料 (合併本地緩存與初始定義)
    const currentAchievement = ref<typeof Achievement>(JSON.parse(JSON.stringify(Achievement)));

    const init = () => {
        currentAchievement.value = JSON.parse(JSON.stringify(Achievement))
    };
    return {
        currentAchievement,
        init
    };
}, {
    persist: true // 持久化依然有效
});