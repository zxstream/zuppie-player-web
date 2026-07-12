import { createContext } from "react";

import type { PlayerContextValue } from "../types";

const PlayerContext = createContext<PlayerContextValue | null>(null);

export default PlayerContext;
