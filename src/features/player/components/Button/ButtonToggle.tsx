import { usePlayer } from "../../hooks";

function ButtonToggle() {
    const { state, actions } = usePlayer();

    return (
        <button type="button" onClick={actions.toggle}>
            {state.isPlaying ? "Pause" : "Play"}
        </button>
    );
}

export default ButtonToggle;
