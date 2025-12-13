import {ref, Ref} from 'vue';
import {GameState} from "@/enums/enums";

// 狀態管理器的核心邏輯
class ReactiveGameStateManager {
    // 使用 ref 來定義狀態，使其成為響應式
    private currentState: Ref<GameState> = ref(GameState.INITIAL);

    /**
     * 獲取當前的響應式狀態。
     * 外部可以直接使用 .value 獲取值，或將整個 ref 傳遞給組件。
     */
    public getCurrentState(): Ref<GameState> {
        return this.currentState;
    }

    /**
     * 啟動遊戲流程，進入第一個狀態。
     */
    public startCycle(): void {
        this.currentState.value = GameState.EVENT_PHASE;
    }

    /**
     * 進入下一個輪迴狀態。
     * 這個函數強制了「事件 -> 選擇 -> 事件」的輪迴順序。
     */
    public transitionToNextState(): GameState {
        let nextState: GameState;

        switch (this.currentState.value) { // 注意：讀取 ref 的值需要 .value
            case GameState.INITIAL:
                // 如果在初始狀態，直接進入事件階段
                nextState = GameState.EVENT_PHASE;
                break;

            case GameState.EVENT_PHASE:
                // 從事件階段進入選擇階段
                nextState = GameState.SELECTION_PHASE;
                break;

            case GameState.SELECTION_PHASE:
                // 從選擇階段結束，輪迴回到事件階段
                nextState = GameState.EVENT_PHASE;
                break;

            default:
                // 處理未定義的狀態，通常是錯誤
                console.error("狀態機錯誤：遇到未知的狀態！");
                return this.currentState.value;
        }

        // 更新 ref 的值，觸發響應性
        this.currentState.value = nextState;

        console.log(`狀態切換：進入 ${this.currentState.value}`);
        return this.currentState.value;
    }

    /**
     * 檢查當前狀態是否為指定的狀態。
     */
    public is(state: GameState): boolean {
        return this.currentState.value === state;
    }
}


// 實例化並導出單例
export const gameStateManager = new ReactiveGameStateManager();