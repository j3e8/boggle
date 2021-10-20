import React from 'react';
import clone from 'lodash/clone';
import BoggleBoard from './BoggleBoard';
import BoggleInput from './BoggleInput';
import { initialLetters, randomLetters, findWordInLetters } from './helpers/randomLetters';
import { checkWord } from './helpers/dictionary';

const GAME_DURATION = 60;
const GameState = {
  READY: 0,
  PLAYING: 1,
  GAME_OVER: 2,
};

export default class BoggleApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: initialLetters(),
      totalScore: 0,
      userWords: [],
      gameState: GameState.READY,
    };
  }

  onSubmitWord = (input) => {
    const word = input.toLowerCase();
    if (this.state.userWords.some((uw) => uw.word === word)) {
      return false;
    }

    if (!checkWord(word)) {
      return false;
    }

    const score = this.scoreWord(word);
    if (!score) {
      return false;
    }

    const userWords = clone(this.state.userWords);
    userWords.push({
      word,
      score,
    });
    this.setState({
      userWords,
      totalScore: this.state.totalScore + score,
    });
    return true;
  }

  render() {
    return (
      <div className="boggle-app">
        <div className="score">
          Score: { this.state.totalScore }
        </div>
        <div className="main">
          <div className="left">
            <BoggleBoard letters={ this.state.letters } />
            <div className="game-state">
              { this.renderTimer() }
              { this.renderReadyState() }
              { this.renderGameOver() }
            </div>
          </div>
          <div className="right">
            <BoggleInput
              onSubmitWord={ this.onSubmitWord }
              userWords={ this.state.userWords }
              disabled={ this.state.gameState !== GameState.PLAYING }
            />
          </div>
        </div>
      </div>
    );
  }

  renderGameOver()  {
    if (this.state.gameState !== GameState.GAME_OVER) {
      return null;
    }

    return  (
      <div className="game-over">
        <div>Time's up</div>
        <button onClick={ this.startGame }>Play again</button>
      </div>
    );
  }

  renderReadyState() {
    if (this.state.gameState !== GameState.READY) {
      return null;
    }
    return (
      <div className="start-game">
        <button onClick={ this.startGame }>Start</button>
      </div>
    );
  }

  renderTimer() {
    if (this.state.gameState !== GameState.PLAYING) {
      return null;
    }

    return (
      <div className="game-timer">
        { this.state.gameEndsIn }
      </div>
    );
  }

  scoreWord = (word) => {
    const isValid = findWordInLetters(word, this.state.letters);
    if (!isValid) {
      return 0;
    }

    if (word.length === 3) {
      return 1;
    } else {
      return word.length - 3;
    }
  }

  startGame = () => {
    this.setState({
      letters: randomLetters(),
      totalScore: 0,
      userWords: [],
      gameState: GameState.PLAYING,
      gameEndsIn: GAME_DURATION,
    });

    this.gameTimer = window.setInterval(() => {
      const secondsLeft = this.state.gameEndsIn - 1;
      if (!secondsLeft) {
        window.clearInterval(this.gameTimer);
      }
      this.setState({
        gameEndsIn: secondsLeft,
        gameState: secondsLeft > 0 ? GameState.PLAYING : GameState.GAME_OVER,
      });
    }, 1000);
  }
}
