import { useEffect, useRef, useState } from "react";

import usePlayer from "./usePlayer";

function useTimeline() {
    const { state, actions } = usePlayer();

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dragTime, setDragTime] = useState<number | null>(null);

    const timelineRef = useRef<HTMLDivElement>(null);

    const displayTime = dragTime ?? state.currentTime;

    const progress = state.duration > 0 ? (displayTime / state.duration) * 100 : 0;

    function getTimeFromClientX(clientX: number): number {
        if (!timelineRef.current) {
            return 0;
        }

        const rect = timelineRef.current.getBoundingClientRect();

        const percentage = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);

        return percentage * state.duration;
    }

    function startDragging(time: number): void {
        setIsDragging(true);
        setDragTime(time);
    }

    function updateDragging(time: number): void {
        if (!isDragging) {
            return;
        }

        setDragTime(time);
    }

    function finishDragging(time: number): void {
        actions.seek(time);

        setIsDragging(false);
    }

    function cancelDragging(): void {
        setIsDragging(false);
        setDragTime(null);
    }

    function handlePointerDown(event: React.PointerEvent<HTMLDivElement>): void {
        event.currentTarget.setPointerCapture(event.pointerId);

        startDragging(getTimeFromClientX(event.clientX));
    }

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        updateDragging(getTimeFromClientX(event.clientX));
    }

    function handlePointerUp() {
        if (dragTime === null) {
            return;
        }

        finishDragging(dragTime);
    }

    function handlePointerCancel(): void {
        cancelDragging();
    }

    useEffect(() => {
        if (dragTime === null) {
            return;
        }

        if (Math.abs(state.currentTime - dragTime) < 0.05) {
            setDragTime(null);
        }
    }, [dragTime, state.currentTime]);

    useEffect(() => {
        function handleWindowBlur() {
            cancelDragging();
        }

        window.addEventListener("blur", handleWindowBlur);

        return () => {
            window.removeEventListener("blur", handleWindowBlur);
        };
    }, []);

    return {
        timelineRef,
        progress,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        handlePointerCancel,
    };
}

export default useTimeline;
