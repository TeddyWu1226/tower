// useFloatingMessage.ts

import {createVNode, render, VNode} from 'vue';
import FloatingMessage from './FloatingMessage.vue'; // 引入組件

/**
 * 動態創建並顯示 FloatingMessage 組件。
 * * @param message 要顯示的文字
 * @param message
 * @param targetElement 目標 DOM 元素 (例如：怪獸卡片的 root element)。如果未提供，則使用畫面中心定位。
 * @param options 額外選項
 */
export function useFloatingMessage(
    message: string,
    targetElement: HTMLElement | null = null,
    options: { duration?: number; color?: string; messageClass?: string } = {}
) {
    // 1. 創建一個 DOM 容器
    const container = document.createElement('div');
    document.body.appendChild(container);

    // 2. 計算目標位置 (GetBoundingClientRect)
    let positionStyle = {};

    if (targetElement) {
        const rect = targetElement.getBoundingClientRect();

        // ⭐️ 計算相對於視窗的絕對位置
        positionStyle = {
            // 目標元素的右上角作為基礎點，然後向上和右偏移
            top: `${rect.top + window.scrollY}px`,
            left: `${rect.right + window.scrollX}px`, // 讓數字出現在目標元素的右邊
            transform: 'translate(10px, -50%)', // 向上偏移一半高度，向右偏移 10px 避免重疊
            position: 'absolute',
            // 設定一個基準寬度，防止數字過長時影響定位
            width: 'auto',
        };
    } else {
        // 預設回到畫面中央
        positionStyle = {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'fixed',
        };
    }

    // 3. 創建 Vue VNode
    const vnode: VNode = createVNode(FloatingMessage, {
        message: message,
        duration: options.duration,
        color: options.color,
        messageClass: options.messageClass,
        // ⭐️ 傳遞計算出的位置樣式
        customStyle: positionStyle,

        // 監聽組件內部的銷毀信號 (雖然我們主要依賴 duration 自動銷毀)
        onDestroy: () => {
            // 3. 銷毀 VNode
            render(null, container);
            // 4. 移除 DOM 容器
            document.body.removeChild(container);
        }
    });

    // 3. 渲染 VNode
    render(vnode, container);

    // 返回一個銷毀方法 (如果需要手動控制)
    return {
        close: () => {
            // 呼叫組件內部的隱藏方法 (需要組件 expose 相關方法，這裡為簡潔性省略，直接依賴 duration)
            // vnode.component?.exposed?.hide();

            // 直接銷毀
            render(null, container);
            document.body.removeChild(container);
        }
    };
}