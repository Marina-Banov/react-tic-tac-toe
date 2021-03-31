import "./App.css";
import { useState } from "react";
import Board from "./Board";
import Selector from "./Selector";

export default function App() {
    const [PvPMode, setPvPMode] = useState(true);

    function updateMode(newPvPMode) {
        setPvPMode(newPvPMode);
    }

    return (
        <div className="App">
            <Board activePvP={PvPMode}/>
            <Selector activePvP={PvPMode}
                      updateMode={updateMode}/>
        </div>
    );
}
