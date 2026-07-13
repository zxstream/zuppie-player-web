import { useRef, useState } from "react";

import { usePlayer } from "../../hooks";

import styles from "./Timeline.module.scss";

function Timeline() {
    const { state, actions } = usePlayer();

    const [isDragging, setIsDragging] = useState(false);
    const timelineRef = useRef<HTMLDivElement>(null);

    const progress = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;

    function getTimeFromPointer(clientX: number): number {
        if (!timelineRef.current) {
            return 0;
        }

        const rect = timelineRef.current.getBoundingClientRect();

        const percentage = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);

        return percentage * state.duration;
    }

    function handlePointerDown(event: React.PointerEvent<HTMLDivElement>): void {
        event.currentTarget.setPointerCapture(event.pointerId);

        setIsDragging(true);

        actions.seek(getTimeFromPointer(event.clientX));
    }

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (!isDragging) {
            return;
        }

        actions.seek(getTimeFromPointer(event.clientX));
    }

    function handlePointerUp() {
        setIsDragging(false);
    }

    return (
        <div
            ref={timelineRef}
            className={styles["timeline__wrapper"]}
            style={{ "--player-progress": `${progress}%` } as React.CSSProperties}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <div className={styles["timeline__container"]}>
                <div className={styles["timeline__progress"]} />
                <div className={styles["timeline__thumb"]} />
            </div>
        </div>
    );
}

export default Timeline;
