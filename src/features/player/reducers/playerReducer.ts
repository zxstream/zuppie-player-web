import type { PlayerState, PlayerDispatchAction } from "../types";

export function playerReducer(state: PlayerState, action: PlayerDispatchAction): PlayerState {
    switch (action.type) {
        case "PLAY":
            return {
                ...state,
                isPlaying: true,
            };

        case "PAUSE":
            return {
                ...state,
                isPlaying: false,
            };

        case "TIME_UPDATE":
            return {
                ...state,
                currentTime: action.payload,
            };

        case "DURATION_CHANGE":
            return {
                ...state,
                duration: action.payload,
            };

        case "BUFFERED_CHANGE":
            return {
                ...state,
                buffered: action.payload,
            };
            
        default:
            return state;
    }
}
