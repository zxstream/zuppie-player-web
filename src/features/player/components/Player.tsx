import { PlayerProvider } from "../context";

import PlayerControls from "./PlayerControls";
import PlayerMedia from "./PlayerMedia";

type PlayerProperties = {
    source: string;
    poster?: string;
};

function Player({ source, poster }: PlayerProperties) {
    return (
        <PlayerProvider>
            <PlayerMedia source={source} poster={poster} />
            <PlayerControls />
        </PlayerProvider>
    );
}

export default Player;
