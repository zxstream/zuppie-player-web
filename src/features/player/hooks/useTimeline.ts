import { useEffect, useRef, useState } from "react";

import usePlayer from "./usePlayer";

function useTimeline() {
    const { state, actions } = usePlayer();

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dragTime, setDragTime] = useState<number | null>(null);

    const timelineRef = useRef<HTMLDivElement>(null);
    const pointerIdRef = useRef<number | null>(null);

    const displayTime = dragTime ?? state.currentTime;

    const progress = state.duration > 0 ? Math.min((displayTime / state.duration) * 100, 100) : 0;

    const bufferedProgress =
        state.duration > 0 ? Math.min((state.buffered / state.duration) * 100, 100) : 0;

    function getTimeFromClientX(clientX: number): number {
        if (!timelineRef.current) {
            return 0;
        }

        const rect = timelineRef.current.getBoundingClientRect();

        const percentage = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);

        return percentage * state.duration;
    }

    function beginDrag(time: number): void {
        setIsDragging(true);
        setDragTime(time);
    }

    function updateDrag(time: number): void {
        if (!isDragging) {
            return;
        }

        setDragTime(time);
    }

    function commitDrag(time: number): void {
        setDragTime(time);

        actions.seek(time);
    }

    function cleanupDrag(): void {
        setIsDragging(false);
        setDragTime(null);
        pointerIdRef.current = null;
    }

    function handlePointerDown(event: React.PointerEvent<HTMLDivElement>): void {
        pointerIdRef.current = event.pointerId;

        event.currentTarget.setPointerCapture(event.pointerId);

        beginDrag(getTimeFromClientX(event.clientX));
    }

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        updateDrag(getTimeFromClientX(event.clientX));
    }

    function handlePointerUp() {
        if (dragTime === null) {
            return;
        }

        commitDrag(dragTime);
    }

    function handlePointerCancel(): void {
        cleanupDrag();
    }

    const timelineProps = {
        onPointerDown: handlePointerDown,
        // onPointerMove: handlePointerMove,
        // onPointerUp: handlePointerUp,
        // onPointerCancel: handlePointerCancel,
    };

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
            cleanupDrag();
        }

        window.addEventListener("blur", handleWindowBlur);

        return () => {
            window.removeEventListener("blur", handleWindowBlur);
        };
    }, []);

    useEffect(() => {
        if (!isDragging) {
            return;
        }

        function handleWindowPointerMove(event: PointerEvent) {
            console.info("move");
            if (event.pointerId !== pointerIdRef.current) {
                return;
            }

            updateDrag(getTimeFromClientX(event.clientX));
        }

        function handleWindowPointerUp(event: PointerEvent) {
            console.info("up");
            if (event.pointerId !== pointerIdRef.current) {
                return;
            }

            commitDrag(getTimeFromClientX(event.clientX));

            cleanupDrag();
        }

        function handleWindowPointerCancel(event: PointerEvent) {
            console.log("cancel");
        }

        function handleLostPointerCapture() {
            console.log("lost");
        }

        window.addEventListener("pointermove", handleWindowPointerMove);
        window.addEventListener("pointerup", handleWindowPointerUp);
        window.addEventListener("pointercancel", handleWindowPointerCancel);
        window.addEventListener("lostpointercapture", handleLostPointerCapture);

        return () => {
            window.removeEventListener("pointermove", handleWindowPointerMove);
            window.removeEventListener("pointerup", handleWindowPointerUp);
            window.removeEventListener("pointercancel", handleWindowPointerCancel);
            window.removeEventListener("lostpointercapture", handleLostPointerCapture);
        };
    }, [isDragging]);

    return {
        timelineRef,
        progress,
        bufferedProgress,
        timelineProps,
    };
}

export default useTimeline;
