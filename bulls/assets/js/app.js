// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html"
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import "milligram";
import '../css/app.css';
import {generateSecret, isValidInput, getHint, hasGameEnded} from "./game";

/*
NOTE (regarding plagiarism):
Lecture notes on React (4 and 5) were used in creating this assignment.
Specifically:
- Hooks via useState;
- Event handlers (named the same or similarly);
- file game.js, which contains helper functions;
- notions of "guesses" similar to "guesses" in hangman;
 */

function App() {
    const [guesses, setGuesses] = useState([]);
    const [guess, setGuess] = useState("");
    const [secret, setSecret] = useState(generateSecret());
    const [hints, setHints] = useState([]);
    const [status, setStatus] = useState("");


    /**
     * Event handler for handling change of the text field
     * containing player's guess.
     *
     * @param ev event being invoked by the caller
     */
    function updateGuess(ev) {
        if (hasGameEnded(guesses, secret)) {
            return;
        }
        let text = ev.target.value;
        let fieldLength = text.length;
        if (fieldLength > 4) {
            text = text.substr(0, 4);
        }
        setGuess(text);
    }


    /**
     * Being called when a user makes a guess by pressing a "guess"
     * button or presses "Enter" key when the guess text field
     * is focused.
     * Makes a guess if the game hasn't ended.
     */
    function makeGuess() {
        if (hasGameEnded(guesses, secret)) {
            return;
        }
        if (isValidInput(guess)) {
            setStatus("");
            console.log("secret: " + secret);
            setGuesses(guesses.concat(guess));
            setGuess("");
            setHints(hints.concat(getHint(secret, guess)));
            console.log("num guesses: " + guesses.length);
        } else {
            console.log("bad input");
            setStatus("A guess must be a 4-digit unique integer (1-9)");
        }
    }


    /**
     * Event handler for key presses when the guess text field
     * is focused.
     *
     * @param ev the event invoked by the caller (key press)
     */
    function keypress(ev) {
        if (hasGameEnded(guesses, secret)) {
            return;
        }
        if (ev.key === "Enter") {
            makeGuess();
        }
    }


    /**
     * Resets the game by clearing all the sates.
     */
    function reset() {
        setGuesses([]);
        setGuess("");
        setHints([]);
        setStatus("");
        setSecret(generateSecret);
    }

    return (
        <div>
            <div className="controls">
                <div className="row">
                    <div className="column">
                        <p>
                            <input type="text"
                                   onChange={updateGuess}
                                   value={guess}
                                   onKeyPress={keypress}
                            />
                        </p>
                    </div>
                    <div className="column">
                        <p>
                            <button onClick={makeGuess}>Guess</button>
                            <button onClick={reset}>Reset</button>
                        </p>
                    </div>
                </div>
            </div>

            <ResultTable guesses={guesses} hints={hints}/>

            <StatusBar guesses={guesses}
                       gameOver={hasGameEnded(guesses, secret)}
                       status={status}/>

        </div>
    );


    /**
     * Returns a grid containing information about past guesses.
     *
     * @param guesses array with all the guesses
     * @param hints arrays with all the hints
     * @returns {JSX.Element} an element containing a grid with all the info
     * @constructor
     */
    function ResultTable({guesses, hints}) {
        return (
            <div className="results">
                <div className="row">
                    <div className="column">
                        <div className="colHeader">
                            <p>Num guesses</p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="colHeader">
                            <p>Guess</p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="colHeader">
                            <p>Hint</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <p>1</p>
                    </div>
                    <div className="column">
                        <p>
                            {guesses[0]}
                        </p>
                    </div>
                    <div className="column">
                        <p>
                            {hints[0]}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <p>2</p>
                    </div>
                    <div className="column">
                        <p>
                            {guesses[1]}
                        </p>
                    </div>
                    <div className="column">
                        <p>
                            {hints[1]}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <p>3</p>
                    </div>
                    <div className="column">
                        <p>
                            {guesses[2]}
                        </p>
                    </div>
                    <div className="column">
                        <p>
                            {hints[2]}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <p>4</p>
                    </div>
                    <div className="column">
                        <p>
                            {guesses[3]}
                        </p>
                    </div>
                    <div className="column">
                        <p>
                            {hints[3]}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <p>5</p>
                    </div>
                    <div className="column">
                        <p>
                            {guesses[4]}
                        </p>
                    </div>
                    <div className="column">
                        <p>
                            {hints[4]}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <p>6</p>
                    </div>
                    <div className="column">
                        <p>
                            {guesses[5]}
                        </p>
                    </div>
                    <div className="column">
                        <p>
                            {hints[5]}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <p>7</p>
                    </div>
                    <div className="column">
                        <p>
                            {guesses[6]}
                        </p>
                    </div>
                    <div className="column">
                        <p>
                            {hints[6]}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <p>8</p>
                    </div>
                    <div className="column">
                        <p>
                            {guesses[7]}
                        </p>
                    </div>
                    <div className="column">
                        <p>
                            {hints[7]}
                        </p>
                    </div>
                </div>
            </div>
        );
    }


    /**
     * Returns the status bar that displays errors or win/lose message
     * @param guesses array of all the guesses
     * @param gameOver a boolean flag representing if the game has ended
     * @param status string being placed into the status bar
     * @returns {JSX.Element} an element containing status info
     * @constructor
     */
    function StatusBar({guesses, gameOver, status}) {
        if (gameOver) {
            if (guesses.length < 8) {
                status = "You won!";
            } else {
                status = "You lost!";
            }
        }
        return (
            <div className="status">
                <div className="row">
                    <div className="column">
                        <p>
                            {status}
                        </p>
                    </div>

                </div>
            </div>
        );
    }
}


//export default App;


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);