import { usePlayer } from "../../hooks";

type ButtonToggleProps = {
    className?: string;
};

function ButtonToggle({ className }: ButtonToggleProps) {
    const { state, actions } = usePlayer();

    return (
        <button type="button" onClick={actions.toggle} className={`${className ?? ""}`}>
            {state.isPlaying ? "Pause" : "Play"}
        </button>
    );
}

export default ButtonToggle;
