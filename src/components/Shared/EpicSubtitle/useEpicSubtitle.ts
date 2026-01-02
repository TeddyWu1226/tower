import { createVNode, render } from 'vue';
import EpicSubtitle from './EpicSubtitle.vue';

/**
 * 顯示史詩感電影台詞
 * @param message 文字內容
 * @param duration 顯示時間 (毫秒)
 */
export function useEpicSubtitle(message: string, duration: number = 3500) {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const destroy = () => {
        if (container) {
            render(null, container);
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }
    };

    const vnode = createVNode(EpicSubtitle, {
        message: message,
        duration: duration,
        onUnmount: destroy
    });

    render(vnode, container);

    // 比 duration 稍微長一點點，讓 CSS 的 fade-out 動畫跑完
    setTimeout(destroy, duration + 1000);

    return { close: destroy };
}