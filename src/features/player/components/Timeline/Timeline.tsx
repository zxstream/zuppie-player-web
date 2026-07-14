import { useTimeline } from "../../hooks";

import styles from "./Timeline.module.scss";

function Timeline() {
    const { timelineRef, progress, bufferedProgress, timelineProps } = useTimeline();

    return (
        <div
            ref={timelineRef}
            className={styles["timeline__wrapper"]}
            style={
                {
                    "--player-progress": `${progress}%`,
                    "--player-buffered": `${bufferedProgress}%`,
                } as React.CSSProperties
            }
            {...timelineProps}
        >
            <div className={styles["timeline__container"]}>
                <div className={styles["timeline__buffered"]} />
                <div className={styles["timeline__progress"]} />
                <div className={styles["timeline__thumb"]} />
            </div>
        </div>
    );
}

export default Timeline;
