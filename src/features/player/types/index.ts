import type { Dispatch, RefObject } from "react";

export type PlayerState = {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
};

export type PlayerActions = {
    play(): void;
    pause(): void;
    toggle(): void;
};

export type PlayerDispatchAction =
    | { type: "PLAY" }
    | { type: "PAUSE" }
    | { type: "TIME_UPDATE"; payload: number }
    | { type: "DURATION_CHANGE"; payload: number };

export type PlayerContextValue = {
    refs: {
        videoRef: RefObject<HTMLVideoElement | null>;
    };
    state: PlayerState;
    actions: PlayerActions;
    dispatch: Dispatch<PlayerDispatchAction>;
};
