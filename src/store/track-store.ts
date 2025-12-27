import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useTrackerStore = defineStore('tracker', () => {
    // --- State ---
    // 當階段數據紀錄
    const currentKills = ref<Record<string, number>>({})
    const totalKills = ref<Record<string, number>>({})

    // --- Actions ---

    /**
     * 增加擊殺計數
     * @param monsterName 怪物名稱
     * @param amount 增加數量 (預設 1)
     */
    function recordKill(monsterName: string, amount: number = 1) {
        // 紀錄特定怪物
        currentKills.value[monsterName] = (currentKills.value[monsterName] || 0) + amount
        currentKills.value['TOTAL'] = (currentKills.value['TOTAL'] || 0) + amount
        totalKills.value[monsterName] = (totalKills.value[monsterName] || 0) + amount
        totalKills.value['TOTAL'] = (totalKills.value['TOTAL'] || 0) + amount
    }


    /**
     * 獲取特定目標的進度
     */
    function getKillCount(monsterName: string = 'TOTAL', type: 'current' | 'total'): number {
        if (type === 'current') {
            return currentKills.value[monsterName] || 0
        }
        return totalKills.value[monsterName] || 0
    }


    /**
     * 跨關卡重置 (如果你的任務是每關重新計算)
     */
    function init(all = true) {
        if (all) {
            totalKills.value = {}
        }
        currentKills.value = {}
    }


    return {
        currentKills,
        totalKills,
        recordKill,
        getKillCount,
        init
    }
}, {
    persist: {
        key: 'tracker',
        storage: localStorage,
    }
})