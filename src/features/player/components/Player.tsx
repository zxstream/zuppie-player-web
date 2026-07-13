import { PlayerProvider } from "../context";

import PlayerControls from "./PlayerControls";
import PlayerMedia from "./PlayerMedia";

import styles from "./Player.module.scss";

type PlayerProperties = {
    source: string;
    poster?: string;
};

function Player({ source, poster }: PlayerProperties) {
    return (
        <PlayerProvider>
            <div className={styles["player__container"]}>
                <PlayerMedia source={source} poster={poster} />
                <PlayerControls />
            </div>
        </PlayerProvider>
    );
}

export default Player;
