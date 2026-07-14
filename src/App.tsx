import { Player } from "@features/player";

function App() {
    return (
        <div style={{ width: "100%", height: "24em", position: "relative" }}>
            <Player
                source="https://files.vidstack.io/sprite-fight/720p.mp4"
                poster="https://files.vidstack.io/sprite-fight/poster.webp"
            />
        </div>
    );
}

export default App;
