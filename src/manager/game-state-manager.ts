import {GameState} from "@/enums/enums";

export class GameStateManager {
    private currentState: GameState = GameState.INITIAL;

    /**
     * 獲取當前的狀態。
     */
    public getCurrentState(): GameState {
        return this.currentState;
    }

    /**
     * 啟動遊戲流程，進入第一個狀態。
     */
    public startCycle(): void {
        this.currentState = GameState.EVENT_PHASE;
        console.log(`--- 狀態機啟動：進入 ${this.currentState} ---`);
    }

    /**
     * 進入下一個輪迴狀態。
     * 這個函數強制了「事件 -> 選擇 -> 事件」的輪迴順序。
     */
    public transitionToNextState(): GameState {
        switch (this.currentState) {

            case GameState.INITIAL:
                // 如果在初始狀態，直接進入事件階段
                this.currentState = GameState.EVENT_PHASE;
                break;

            case GameState.EVENT_PHASE:
                // 從事件階段進入選擇階段
                this.currentState = GameState.SELECTION_PHASE;
                break;

            case GameState.SELECTION_PHASE:
                // 從選擇階段結束，輪迴回到事件階段
                this.currentState = GameState.EVENT_PHASE;
                break;

            default:
                // 處理未定義的狀態，通常是錯誤
                console.error("狀態機錯誤：遇到未知的狀態！");
                return this.currentState;
        }

        console.log(`狀態切換：進入 ${this.currentState}`);
        return this.currentState;
    }

    /**
     * 檢查當前狀態是否為指定的狀態。
     */
    public is(state: GameState): boolean {
        return this.currentState === state;
    }
}

export const gameStateManager = new GameStateManager();