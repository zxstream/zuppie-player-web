import { formatDuration } from "@/utils";

import { usePlayer } from "../hooks";

import { ButtonToggle } from "./Button";

import styles from "./PlayerControls.module.scss";
import { Timeline } from "./Timeline";

function PlayerControls() {
    const { state } = usePlayer();

    return (
        <div className={styles["player-controls__wrapper"]}>
            <Timeline />
            <div className={styles["player-controls-buttons__container"]}>
                <ButtonToggle />
                <p>
                    {formatDuration(Math.floor(state.currentTime))} /{" "}
                    {formatDuration(Math.floor(state.duration))}
                </p>
            </div>
        </div>
    );
}

export default PlayerControls;
