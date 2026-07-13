import { usePlayer } from "../../hooks";

import styles from "./ButtonToggle.module.scss";

type ButtonToggleProps = {
    className?: string;
};

function ButtonToggle({ className }: ButtonToggleProps) {
    const { state, actions } = usePlayer();

    return (
        <button
            type="button"
            onClick={actions.toggle}
            className={`${styles["button-toggle__button"]} ${className ?? ""}`}
        >
            {state.isPlaying ? "Pause" : "Play"}
        </button>
    );
}

export default ButtonToggle;
