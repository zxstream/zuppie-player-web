import { useTimeline } from "../../hooks";

import styles from "./Timeline.module.scss";

function Timeline() {
    const {
        timelineRef,
        progress,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        handlePointerCancel,
    } = useTimeline();

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
