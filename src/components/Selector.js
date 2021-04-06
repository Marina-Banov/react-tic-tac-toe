import "./Selector.css";
import user_blue from "../assets/user_blue.svg";
import user_red from "../assets/user_red.svg";
import computer from "../assets/computer.svg";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { activate, deactivate, selectMode } from '../slices/PvPModeSlice'

export default function Selector() {
    const activePvP = useSelector(selectMode);
    const dispatch = useDispatch();

    return (
        <div className="game-mode-button-holder">
            <button className={activePvP ? "game-mode-button active" : "game-mode-button"}
                    onClick={() => dispatch(activate())}>
                <img src={user_blue} className="player" alt="player blue" />
                <img src={user_red} className="player" alt="player red" /><br />
                <span>Player vs. Player</span>
            </button>
            <button className={activePvP ? "game-mode-button" : "game-mode-button active"}
                    onClick={() => dispatch(deactivate())}>
                <img src={user_blue} className="player" alt="player blue" />
                <img src={computer} className="player" alt="computer red" /><br />
                <span>Player vs. Machine</span>
            </button>
        </div>
    );
}
