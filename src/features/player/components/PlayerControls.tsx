import { formatDuration } from "@/utils";

import { usePlayer } from "../hooks";

import { ButtonToggle } from "./Button";

function PlayerControls() {
    const { state } = usePlayer();

    return (
        <div>
            <ButtonToggle />
            <p>
                {formatDuration(Math.floor(state.currentTime))} /{" "}
                {formatDuration(Math.floor(state.duration))}
            </p>
        </div>
    );
}

export default PlayerControls;
