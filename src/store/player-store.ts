import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import type {UserType, Equipment, EquipmentType} from '@/types';
import {DEFAULT_USER_INFO} from '@/constants/default-const';

export const usePlayerStore = defineStore('player-info', () => {
    // --- State: 原始數據 ---
    const info = ref<UserType>(DEFAULT_USER_INFO);
    // --- Getters: 屬性計算 ---
    /**
     * 1. 裝備加成總和 (純裝備提供的屬性)
     */
    const equipBonus = computed(() => {
        const bonus: Record<string, number> = {
            ad: 0, critIncrease: 0, critRate: 0, adDefend: 0,
            dodge: 0, hit: 0, hpLimit: 0, spLimit: 0
        };

        if (!info.value.equips) return bonus;

        // 遍歷當前穿戴的所有裝備
        Object.values(info.value.equips).forEach((item: EquipmentType | undefined) => {
            if (item) {
                // 將裝備中有的數值累加到 bonus 中
                Object.keys(bonus).forEach(key => {
                    const value = item[key as keyof typeof bonus];
                    if (typeof value === 'number') {
                        bonus[key] += value;
                    }
                });
            }
        });
        return bonus;
    });

    /**
     * 2. 面板最終屬性 (基礎值 + 裝備加成)
     */
    const finalStats = computed(() => {
        return {
            ...info.value, // 包含名稱、圖示、職業等
            // 覆蓋需要累加的屬性
            ad: info.value.ad + equipBonus.value.ad,
            critRate: info.value.critRate + equipBonus.value.critRate,
            critIncrease: info.value.critIncrease + equipBonus.value.critIncrease,
            adDefend: info.value.adDefend + equipBonus.value.adDefend,
            dodge: info.value.dodge + equipBonus.value.dodge,
            hit: info.value.hit + equipBonus.value.hit,
            hpLimit: info.value.hpLimit + equipBonus.value.hpLimit,
            spLimit: info.value.spLimit + equipBonus.value.spLimit,
        };
    });

    // --- Actions: 行為邏輯 ---

    /**
     * 裝備物品
     * @param slot 指定 Equipment 介面中的 key (如 head, weapon)
     * @param item 裝備物件
     */
    const equipItem = (slot: keyof Equipment, item: EquipmentType) => {
        if (!info.value.equips) info.value.equips = {};
        info.value.equips[slot] = item;
    };

    /**
     * 更新金錢 (正值增加, 負值扣除)
     */
    const addGold = (amount: number) => {
        if (!info.value.gold) {
            info.value.gold = amount;
        } else {
            info.value.gold += amount;
        }
    };

    /**
     * 獲得物品 (存入 items 背包)
     */
    const gainItem = (item: any) => {
        if (!info.value.items) info.value.items = [];
        info.value.items.push(item);
    };
    const init = () => {
        info.value = DEFAULT_USER_INFO
    }

    return {
        info,
        equipBonus,
        finalStats,
        equipItem,
        addGold,
        gainItem,
        init
    };
}, {
    // 開啟持久化 (需安裝 pinia-plugin-persistedstate)
    persist: {
        key: 'player-data',
        storage: localStorage,
    }
});