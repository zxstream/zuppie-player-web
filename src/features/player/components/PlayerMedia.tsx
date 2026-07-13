import { usePlayer } from "../hooks";

import styles from "./PlayerMedia.module.scss";

type PlayerMediaProps = {
    source: string;
    poster?: string;
};

function PlayerMedia({ source, poster }: PlayerMediaProps) {
    const { refs, dispatch } = usePlayer();

    const { videoRef } = refs;

    function handlePlay(): void {
        dispatch({ type: "PLAY" });
    }

    function handlePause(): void {
        dispatch({ type: "PAUSE" });
    }

    function handleLoadedMetadata(): void {
        if (!videoRef.current) return;

        dispatch({
            type: "DURATION_CHANGE",
            payload: videoRef.current.duration,
        });
    }

    function handleTimeUpdate(): void {
        if (!videoRef.current) return;

        dispatch({
            type: "TIME_UPDATE",
            payload: videoRef.current.currentTime,
        });
    }

    return (
        <div className={styles["player-media__wrapper"]}>
            <video
                ref={videoRef}
                controls={false}
                src={source}
                playsInline
                poster={poster}
                onPlay={handlePlay}
                onPause={handlePause}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
            />
        </div>
    );
}

export default PlayerMedia;
