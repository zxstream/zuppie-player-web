import { useEffect, useRef, useState } from "react";

import { usePlayer } from "../../hooks";

import styles from "./Timeline.module.scss";

function Timeline() {
    const { state, actions } = usePlayer();

    const [isDragging, setIsDragging] = useState(false);
    const [dragTime, setDragTime] = useState<number | null>(null);

    const timelineRef = useRef<HTMLDivElement>(null);

    const displayTime = dragTime ?? state.currentTime;

    const progress = state.duration > 0 ? (displayTime / state.duration) * 100 : 0;

    function getTimeFromPointer(clientX: number): number {
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

        startDragging(getTimeFromPointer(event.clientX));
    }

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        updateDragging(getTimeFromPointer(event.clientX));
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

        function handleWindowBlur() {
            cancelDragging();
        }

        window.addEventListener("blur", handleWindowBlur);

        return () => {
            window.removeEventListener("blur", handleWindowBlur);
        };
    }, [dragTime, state.currentTime]);

    return (
        <div
            ref={timelineRef}
            className={styles["timeline__wrapper"]}
            style={{ "--player-progress": `${progress}%` } as React.CSSProperties}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
        >
            <div className={styles["timeline__container"]}>
                <div className={styles["timeline__progress"]} />
                <div className={styles["timeline__thumb"]} />
            </div>
        </div>
    );
}

export default Timeline;
