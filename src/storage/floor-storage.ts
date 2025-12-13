import {useStorage} from "@vueuse/core";

type LabeledElement = number; // 標記可以是任何數字
type TrapezoidData = LabeledElement[][];
/**
 * 定義權重輸入的類型。
 * 鍵是標記的值 (例如 0, 1, 2)，值是該標記出現的比率/權重。
 */
type LabelWeights = {
    [labelValue: number]: number;
};

/**
 * 根據自定義權重物件，隨機返回一個標記值 (0, 1, 2, 3, 4, ...)
 * * @param weights 標記權重物件，例如 { 0: 1, 1: 5, 2: 2, 3: 1, 4: 1 }
 * @returns 隨機選中的標記值 (number)
 */
function getRandomLabelByWeight(weights: LabelWeights): number {

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
 * 使用 Fisher-Yates 演算法打亂陣列。
 * 這是實現真隨機分佈的最優方法之一。
 * @param array 要打亂的陣列
 */
function shuffleArray<T>(array: T[]): T[] {
    let currentIndex = array.length;
    let temporaryValue: T;
    let randomIndex: number;

    // 當還有元素未打亂時...
    while (currentIndex !== 0) {

        // 隨機選擇一個尚未打亂的元素
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // 將當前元素與隨機選取的元素交換位置
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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
    weights: LabelWeights,
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
        const layer: LabeledElement[] = [];

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

/**
 * 房間座標類型：[layer, index]
 * layer: 層次 (從 1 開始)
 * index: 該層次的索引 (從 0 開始)
 */
type RoomCoordinateTuple = [number, number];

/**
 * 根據當前房間座標 (元組 [layer, index])，返回下一層三個可選房間的數值 (標記/權重)。
 *
 * @param data 完整的梯形資料結構 (TrapezoidData)。
 * @param currentRoom 當前房間的座標元組 [layer, index]。
 * @returns 一個包含下層三個房間數值的陣列，如果無法向下移動則返回空陣列。
 */
export function getNextAvailableRooms(
    data: TrapezoidData,
    currentRoom: RoomCoordinateTuple
): number[] {

    // 使用解構賦值來提取 layer 和 index
    const [layer, currentRoomIndex] = currentRoom;
    const maxLayers = data.length;

    // 檢查 1: 當前層次有效性
    if (layer < 1 || layer > maxLayers || currentRoomIndex < 0) {
        console.error("錯誤：無效的層次或索引。");
        return [];
    }

    // 檢查 2: 是否已在最底層
    if (layer === maxLayers) {
        console.log(`您已在第 ${maxLayers} 層，無法向下移動。`);
        return [];
    }

    // 下一層的陣列索引：layer (因為 layer 從 1 開始)
    const nextLayer = data[layer];

    const nextLayerSize = nextLayer.length;
    const availableValues: number[] = [];

    // 根據公式，可選的下層房間索引為：k = j, j + 1, j + 2
    for (let k = currentRoomIndex; k <= currentRoomIndex + 2; k++) {

        // 邊界檢查：確保 k 不會超出下一層的範圍
        if (k >= 0 && k < nextLayerSize) {
            availableValues.push(nextLayer[k]);
        }
    }

    return availableValues;
}


interface FloorStorageType {
    currentFloor: number; // 第幾層
    currentRoom: RoomCoordinateTuple; // 當前階段的坐標系
    currentStageRooms: TrapezoidData; // 當前階段所有房間(19層)
}

// 定義自定義權重
const customWeights: LabelWeights = {
    0: 5, // 休息
    1: 70, // 戰鬥
    2: 15, // 菁英戰鬥
    3: 5, // 特殊事件
    4: 5, // 商店
};

export const Floor = useStorage<FloorStorageType>('floor',
    {
        currentFloor: 1,
        currentRoom: [1, 0],
        currentStageRooms: createTrapezoidDataWithWeights(customWeights, 19, 17)
    }
)