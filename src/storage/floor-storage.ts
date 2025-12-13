import {useStorage} from "@vueuse/core";
import {FloorStorageType, RoomCoordinateTuple, RoomWeights, TrapezoidData} from "@/types";
import {DEFAULT_FLOOR} from "@/assets/default-const";


/**
 * 根據自定義權重物件，隨機返回一個標記值 (0, 1, 2, 3, 4, ...)
 * * @param weights 標記權重物件，例如 { 0: 1, 1: 5, 2: 2, 3: 1, 4: 1 }
 * @returns 隨機選中的標記值 (number)
 */
function getRandomLabelByWeight(weights: RoomWeights): number {

    // 1. 建立權重累積數組 (Cumulative Weight Array)
    const weightedChoices: number[] = [];
    let totalWeight = 0;

    // 遍歷權重，為每個標記建立多個條目，數量等於其權重
    for (const [label, weight] of Object.entries(weights)) {
        const labelValue = parseInt(label);
        const weightValue = weight;

        for (let i = 0; i < weightValue; i++) {
            weightedChoices.push(labelValue);
        }
        totalWeight += weightValue;
    }

    if (totalWeight === 0) {
        // 如果沒有定義權重，返回預設值 0 或拋出錯誤
        console.warn("權重總和為零，返回預設值 0。");
        return 0;
    }

    // 2. 隨機選擇
    // 生成一個從 0 到 (totalWeight - 1) 的隨機索引
    const randomIndex = Math.floor(Math.random() * totalWeight);

    // 3. 返回該索引對應的標記值
    return weightedChoices[randomIndex];
}

/**
 * 根據自定義權重生成一個梯形資料結構。
 * 最多一層不超過21
 *
 * @param maxLayers 總共的層數 (預設為 19)。
 * @param weights 標記權重物件，例如 { 0: 2, 1: 1, 2: 1, 3: 1, 4: 1 }。
 * @param maxRooms 每層房間數量上限
 * @returns 梯形資料結構 (TrapezoidData)。
 */
export function createTrapezoidDataWithWeights(
    weights: RoomWeights,
    maxLayers: number = 19,
    maxRooms: number = 17,
): TrapezoidData {

    const result: TrapezoidData = [];

    // ⭐️ 移除 customLabelCycle 的建立和打亂，我們不再需要它。

    // --- 建立梯形結構並分配標記 (徹底隨機化) ---
    for (let i = 1; i <= maxLayers; i++) {
        // 第 i 層的元素數量：E_i = 1 + (i - 1) * 2
        let elementsInLayer = 1 + (i - 1) * 2;
        if (elementsInLayer >= maxRooms) {
            elementsInLayer = maxRooms
        }
        const layer: number[] = [];

        for (let j = 0; j < elementsInLayer; j++) {

            // ⭐️ 關鍵修改點：直接呼叫 getRandomLabelByWeight
            // 每次迴圈都會獨立執行一次權重隨機選擇
            const labelValue = getRandomLabelByWeight(weights);
            layer.push(labelValue);
        }

        result.push(layer);
    }

    return result;
}


export const Floor = useStorage<FloorStorageType>(
    'floor',
    DEFAULT_FLOOR
)


/**
 * 根據當前房間座標 (元組 [layer, index])，返回下一層三個可選房間的座標系。
 * * @returns 一個包含下層三個房間座標元組的陣列，如果無法向下移動則返回空陣列。
 */
export function getNextAvailableRooms(): RoomCoordinateTuple[] {

    // 使用解構賦值來提取 layer 和 index
    const [layer, currentRoomIndex] = Floor.value.currentRoom;
    const currentStageRooms = Floor.value.currentStageRooms;
    const maxLayers = currentStageRooms.length;

    // 檢查 1 & 2: 邊界檢查
    if (layer < 1 || layer > maxLayers || currentRoomIndex < 0) {
        console.error("錯誤：無效的層次或索引。");
        return [];
    }
    if (layer === maxLayers) {
        console.log(`您已在第 ${maxLayers} 層，無法向下移動。`);
        return [];
    }

    // 下一層的層次編號 (1-based)
    const nextLayerNumber = layer + 1;

    // 下一層的陣列索引（用於獲取 size）
    const nextLayer = currentStageRooms[layer]; // 陣列索引是 layer (因為 layer 從 1 開始)

    const nextLayerSize = nextLayer.length;
    const availableCoordinates: RoomCoordinateTuple[] = []; // ⭐️ 變更為儲存座標

    // 根據公式，可選的下層房間索引為：k = j, j + 1, j + 2
    for (let k = currentRoomIndex; k <= currentRoomIndex + 2; k++) {

        // 邊界檢查：確保 k 不會超出下一層的範圍
        if (k >= 0 && k < nextLayerSize) {

            // ⭐️ 關鍵修改：將 [下一層層次, 房間索引] 儲存為元組
            availableCoordinates.push([nextLayerNumber, k]);
        }
    }

    return availableCoordinates;
}

/**
 * 根據房間座標，從當前樓層資料中獲取該房間的數值（標記/權重）。
 *
 * @param coordinate 房間的座標元組 [layer, index] (layer 從 1 開始，index 從 0 開始)。
 * @returns 該房間的數值 (number)，如果座標無效則返回 null 或 -1 (取決於您的錯誤處理偏好)。
 */
export function getRoomValue(coordinate: RoomCoordinateTuple): number | null {

    const [layer, index] = coordinate;
    const roomsData: TrapezoidData = Floor.value.currentStageRooms;
    const maxLayers = roomsData.length;

    // 1. 檢查層次有效性 (1-based)
    // 確保 layer 在 1 到 maxLayers 之間
    if (layer < 1 || layer > maxLayers) {
        console.error(`查詢失敗：層次編號 ${layer} 超出範圍 [1, ${maxLayers}]。`);
        return null;
    }

    // 將 1-based 的 layer 轉換為 0-based 的陣列索引
    const layerIndex = layer - 1;

    // 2. 檢查房間索引有效性 (0-based)
    const targetLayer = roomsData[layerIndex];

    if (!targetLayer || index < 0 || index >= targetLayer.length) {
        console.error(`查詢失敗：層次 ${layer} 的房間索引 ${index} 超出範圍 [0, ${targetLayer?.length ?? '?'}-1]。`);
        return null;
    }

    // 3. 返回房間數值
    return targetLayer[index];
}