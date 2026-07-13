import { useRef, useReducer, type ReactNode } from "react";

import { playerReducer } from "../reducers/playerReducer";
import type { PlayerState } from "../types";
import PlayerContext from "./PlayerContext";

type PlayerProviderProps = {
    children: ReactNode;
};

const initialPlayerState: PlayerState = {
    isPlaying: false,

    currentTime: 0,
    duration: 0,

    buffered: null,

    isSeeking: false,
};

function PlayerProvider({ children }: PlayerProviderProps) {
    const [state, dispatch] = useReducer(playerReducer, initialPlayerState);

    const videoRef = useRef<HTMLVideoElement>(null);

    function play(): void {
        videoRef.current?.play();
    }

    function pause(): void {
        videoRef.current?.pause();
    }

    function toggle(): void {
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            play();
        } else {
            pause();
        }
    }

    function seek(time: number): void {
        if (!videoRef.current) return;

        videoRef.current.currentTime = time;
    }

    return (
        <PlayerContext.Provider
            value={{
                refs: { videoRef },
                state,
                actions: { play, pause, toggle, seek },
                dispatch,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
}

export default PlayerProvider;
