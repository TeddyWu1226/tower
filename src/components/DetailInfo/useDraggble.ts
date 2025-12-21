import {ref, Ref} from "vue";

/**
 * 處理懸浮球拖拽與貼邊邏輯
 */
export const useDraggable = (targetRef: Ref<HTMLElement | null>, options: { onSelect: () => void }) => {
    const position = ref({ x: 0, y: 100 });
    const isDragging = ref(false);
    const isSnapping = ref(false);

    let startPos = { x: 0, y: 0, clientX: 0, clientY: 0 };
    let startTime = 0;

    const handleStart = (e: MouseEvent | TouchEvent) => {
        if (!targetRef.value) return;
        const parent = targetRef.value.offsetParent as HTMLElement;
        if (!parent) return;

        const rect = targetRef.value.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        isSnapping.value = false;
        isDragging.value = false;
        startTime = Date.now();

        startPos = {
            x: clientX - rect.left,
            y: clientY - rect.top,
            clientX,
            clientY
        };

        const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
            const curX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
            const curY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;

            const dist = Math.hypot(curX - startPos.clientX, curY - startPos.clientY);
            if (!isDragging.value && dist > 5) isDragging.value = true;

            if (isDragging.value) {
                if (moveEvent.cancelable) moveEvent.preventDefault();
                const pRect = parent.getBoundingClientRect();
                const maxX = parent.clientWidth - targetRef.value!.clientWidth;
                const maxY = parent.clientHeight - targetRef.value!.clientHeight;

                position.value.x = Math.max(0, Math.min(curX - pRect.left - startPos.x, maxX));
                position.value.y = Math.max(0, Math.min(curY - pRect.top - startPos.y, maxY));
            }
        };

        const handleEnd = () => {
            const duration = Date.now() - startTime;
            if (!isDragging.value && duration < 250) {
                options.onSelect();
            } else if (isDragging.value) {
                isSnapping.value = true;
                const pWidth = parent.clientWidth;
                const selfWidth = targetRef.value?.clientWidth || 0;
                position.value.x = (position.value.x + selfWidth / 2 < pWidth / 2) ? 5 : (pWidth - selfWidth - 5);
            }
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleEnd);
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);
        window.addEventListener('touchmove', handleMove, { passive: false });
        window.addEventListener('touchend', handleEnd);
    };

    return { position, isDragging, isSnapping, handleStart };
};