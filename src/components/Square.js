import "./Square.css";
import * as React from "react";

export default function Square({onClick, value}) {
    return (
        <button className="Square" onClick={onClick}>
            {value && <img src={value} className="App-logo" alt="logo" />}
        </button>
    );
}
