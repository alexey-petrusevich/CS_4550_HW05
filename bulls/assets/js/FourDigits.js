import React, {useState} from 'react'
import "milligram";
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

function FourDigits() {
    const [gameState, setGameState] = useState({
        guesses: [],
        guess: "",
        secret: generateSecret(),
        hints: [],
        status: ""
    });

    /**
     * Event handler for handling change of the text field
     * containing player's guess.
     *
     * @param ev event being invoked by the caller
     */
    function updateGuess(ev) {
        if (hasGameEnded(gameState.guesses, gameState.secret)) {
            console.log("update guess -> game ended")
            return;
        }
        let text = ev.target.value;
        let fieldLength = text.length;
        if (fieldLength > 4) {
            text = text.substr(0, 4);
        }
        let newState = Object.assign({}, gameState, {guess: text});
        setGameState(newState);
    }


    /**
     * Being called when a user makes a guess by pressing a "guess"
     * button or presses "Enter" key when the guess text field
     * is focused.
     * Makes a guess if the game hasn't ended.
     */
    function makeGuess() {
        if (hasGameEnded(gameState.guesses, gameState.secret)) {
            console.log("make guess -> game ended");
            return;
        }
        if (isValidInput(gameState.guess)) {
            console.log("valid input ->");
            console.log("secret: " + gameState.secret);
            let newGuesses = gameState.guesses.concat(gameState.guess);
            let newHints = gameState.hints.concat(getHint(gameState.secret, gameState.guess));
            let newState = Object.assign({}, gameState, {
                guesses: newGuesses,
                guess: "",
                hints: newHints,
                status: ""
            });
            setGameState(newState);
            console.log("num guesses: " + gameState.guesses.length);
            console.log("guesses -> " + gameState.guesses.toString());
        } else {
            console.log("bad input");
            let newStatus = "A guess must be a 4-digit unique integer (1-9)";
            let newState = Object.assign({}, gameState, {status: newStatus});
            setGameState(newState);
        }
    }


    /**
     * Event handler for key presses when the guess text field
     * is focused.
     *
     * @param ev the event invoked by the caller (key press)
     */
    function keypress(ev) {
        if (hasGameEnded(gameState.guesses, gameState.secret)) {
            console.log("game ended");
            return;
        }
        if (ev.key === "Enter") {
            console.log("enter pressed");
            makeGuess();
        }
        console.log("key pressed: " + ev.key);
    }


    /**
     * Resets the game by clearing all the sates.
     */
    function reset() {
        let newState = Object.assign({}, gameState, {
            guesses: [],
            guess: "",
            hints: [],
            status: "",
            secret: generateSecret()
        });
        setGameState(newState);
    }

    return (
        <div>
            <div className="controls">
                <div className="row">
                    <div className="column">
                        <p>
                            <input type="text"
                                   onChange={updateGuess}
                                   value={gameState.guess}
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

            <ResultTable guesses={gameState.guesses} hints={gameState.hints}/>

            <StatusBar guesses={gameState.guesses}
                       gameOver={hasGameEnded(gameState.guesses, gameState.secret)}
                       status={gameState.status}/>

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
        let guessesHints = [];

        for (let i = 0; i < 8; ++i) {
            guessesHints.push(
                <div className="row">
                    <div className="column">
                        <p>{i + 1}</p>
                    </div>
                    <div className="column">
                        <p>
                            {guesses[i]}
                        </p>
                    </div>
                    <div className="column">
                        <p>
                            {hints[i]}
                        </p>
                    </div>
                </div>
            );
        }

        console.log("result table render");

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
                {guessesHints}
            </div>
        );
    }


    /**
     * Returns the status bar that displays errors or win/lose message
     * @param guesses array of all the guesses
     * @param gameOver a boolean flag representing if the game has ended
     * @param status string being placed into the status bar
     * @returns {JSX.Element}      an element containing status info
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


export default FourDigits;


