import {defineStore} from 'pinia';
import {ref, computed, nextTick} from 'vue';
import type {UserType, Equipment, EquipmentType, StatusEffect} from '@/types';
import {DEFAULT_USER_INFO} from '@/constants/default-const';
import {create} from "@/utils/create";
import {useLogStore} from "@/store/log-store";

export const usePlayerStore = defineStore('player-info', () => {
    // --- State ---
    const info = ref<UserType>(JSON.parse(JSON.stringify(DEFAULT_USER_INFO)));
    const stopValueChangeAnimation = ref<boolean>(false);
    const statusEffects = ref<StatusEffect[]>([]);

    // --- Getters ---
    const totalBonus = computed(() => {
        const bonus: Record<string, number> = {
            ad: 0, critIncrease: 0, critRate: 0, adDefend: 0,
            dodge: 0, hit: 0, hpLimit: 0, spLimit: 0
        };
        // 計算裝備加成
        if (info.value.equips) {
            Object.values(info.value.equips).forEach((item) => {
                if (item) {
                    Object.keys(bonus).forEach(key => {
                        const value = (item as any)[key];
                        if (typeof value === 'number') bonus[key] += value;
                    });
                }
            });
        }
        // 計算狀態 (Buff/Debuff) 加成
        statusEffects.value.forEach(effect => {
            if (effect.bonus) {
                Object.keys(effect.bonus).forEach(key => {
                    const val = effect.bonus[key];
                    if (typeof val === 'number') {
                        bonus[key] += val;
                    }
                });
            }
        });
        return bonus;
    });

    const finalStats = computed(() => {
        const b = totalBonus.value;
        return {
            ...info.value,
            ad: Math.max(0, info.value.ad + b.ad),
            adDefend: Math.max(0, info.value.adDefend + b.adDefend),
            dodge: info.value.dodge + b.dodge,
            critRate: info.value.critRate + b.critRate,
            critIncrease: info.value.critIncrease + b.critIncrease,
            hit: info.value.hit + b.hit,
            hpLimit: info.value.hpLimit + b.hpLimit,
            spLimit: info.value.spLimit + b.spLimit,
        };
    });

    // --- Actions ---
    /**
     * 獲得物品 (存入 items 背包)
     */
    const gainItem = (item: any) => {
        info.value.items = info.value.items || [];
        info.value.equipments = info.value.equipments || [];
        info.value.consumeItems = info.value.consumeItems || [];
        const newItem = create(item);
        // 分類加入
        if (item?.position) {
            info.value.equipments.push(newItem)
        } else if (item?.usable) {
            info.value.consumeItems.push(newItem)
        } else {
            info.value.items.push(newItem)
        }
    };

    /**
     * 通用的移除物品方法
     * @param type 背包類型
     * @param index 索引
     */
    const _removeItemFromBag = (type: 'items' | 'equipments' | 'consumeItems', index: number) => {
        const bag = info.value[type];
        if (bag && bag[index]) {
            bag.splice(index, 1);
        }
    };

    /**
     * 裝備物品 (從 equipments 背包移動到 equips 狀態)
     */
    const equipItem = (item: EquipmentType, inventoryIndex: number, targetSlot?: keyof Equipment) => {
        if (!info.value.equips) info.value.equips = {};
        // 決定位置 (優先使用指定位置，否則使用裝備預設位置)
        const slot = targetSlot || (item.position as keyof Equipment);

        // 紀錄更換前的「血量/魔力比例」
        const oldMaxHp = finalStats.value.hpLimit;
        const oldMaxSp = finalStats.value.spLimit;
        const hpRatio = info.value.hp / oldMaxHp;
        const spRatio = info.value.sp / oldMaxSp;

        // 如果該位置已有裝備，卸下 (unequipItem 會自動呼叫 gainItem 放回正確背包)
        if (info.value.equips[slot]) {
            unequipItem(slot);
        }

        // 穿上新裝備
        info.value.equips[slot] = item

        // 從「裝備背包」中移除
        _removeItemFromBag('equipments', inventoryIndex);
        stopValueChangeAnimation.value = true

        // 根據新上限等比縮放現有血量/魔力
        const newMaxHp = finalStats.value.hpLimit;
        const newMaxSp = finalStats.value.spLimit;

        // 套用比例並取整，同時確保不低於 1 (除非原本就是 0)
        info.value.hp = info.value.hp > 0
            ? Math.max(1, Math.round(newMaxHp * hpRatio))
            : 0;

        info.value.sp = info.value.sp > 0
            ? Math.max(1, Math.round(newMaxSp * spRatio))
            : 0;

        // 額外保險：確保不超過新上限
        if (info.value.hp > newMaxHp) info.value.hp = newMaxHp;
        if (info.value.sp > newMaxSp) info.value.sp = newMaxSp;

        nextTick().then(
            () => {
                stopValueChangeAnimation.value = false
            }
        )

    };

    /**
     * 卸下裝備 (從 equips 狀態移動到 equipments 背包)
     */
    const unequipItem = (slot: keyof Equipment): EquipmentType => {
        if (!info.value.equips || !info.value.equips[slot]) return null;

        const itemToUnequip = info.value.equips[slot];
        // 移除位置上的裝備
        info.value.equips[slot] = undefined;

        if (itemToUnequip) {
            gainItem(itemToUnequip); // 會自動分類到 equipments
        }
        return itemToUnequip;
    };


    /**
     * 添加金幣
     */
    const addGold = (amount: number) => {
        info.value.gold = (info.value.gold || 0) + amount;
    };

    /**
     * 初始化
     */
    const init = () => {
        info.value = JSON.parse(JSON.stringify(DEFAULT_USER_INFO));
        statusEffects.value = []
    };

    /**
     * 添加或更新狀態
     */
    const addStatus = (effect: StatusEffect) => {
        // 1. 尋找現有狀態
        const existing = statusEffects.value.find(e => e.name === effect.name);

        if (existing) {
            // 刷新持續時間
            existing.duration = effect.duration;
            // 如果你的狀態數值會隨等級變化，建議也更新一下 bonus
            existing.bonus = effect.bonus ? JSON.parse(JSON.stringify(effect.bonus)) : undefined;
        } else {
            // 2. 存入新狀態時進行深拷貝 (避免引用污染)
            // 使用 JSON 方案或是你現有的 create() 工具
            statusEffects.value.push(create(effect));
        }
    };

    /**
     * 每回合觸發 (在戰鬥回合結束時呼叫)
     */
    const nextTurnStatus = () => {
        const remainingEffects: StatusEffect[] = [];
        const logStore = useLogStore();

        statusEffects.value.forEach(effect => {
            let logMessage = '';

            // 1. 處理每回合觸發的數值效果
            if (effect.type === 'damage' && effect.value) {
                const actualDamage = effect.value;
                info.value.hp = Math.max(0, info.value.hp - actualDamage);
                logMessage = `[${effect.name}] 讓你受到了 ${actualDamage} 點傷害。`;
            } else if (effect.type === 'heal' && effect.value) {
                const actualHeal = effect.value;
                info.value.hp = Math.min(finalStats.value.hpLimit, info.value.hp + actualHeal);
                logMessage = `[${effect.name}] 為你回復了 ${actualHeal} 點生命值。`;
            }

            // 如果有產生數值變動的 Log，則記錄
            if (logMessage) {
                logStore.logger.add(logMessage);
            }

            // 2. 扣減持續時間 (-1 是永久不扣)
            if (effect.duration !== -1) {
                effect.duration--;
            }

            // 3. 判定狀態是否繼續存在
            if (effect.duration !== 0) {
                // 狀態持續中，加入保留清單
                remainingEffects.push(effect);
            } else {
                // 狀態剛好結束 (duration 變為 0)
                logStore.logger.add(`[${effect.name}] 效果消失了。`);
            }
        });

        statusEffects.value = remainingEffects;
    };

    return {
        info,
        stopValueChangeAnimation,
        totalBonus,
        finalStats,
        statusEffects,
        equipItem,
        unequipItem,
        addGold,
        gainItem,
        addStatus,
        nextTurnStatus,
        init
    };
}, {
    persist: {
        key: 'player-data',
        storage: localStorage,
    }
});