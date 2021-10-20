import React from 'react';
import PropTypes from 'prop-types';

export default class BoggleInput extends React.Component {
  static propTypes = {
    onSubmitWord: PropTypes.func.isRequired,
    userWords: PropTypes.array.isRequired,
    disabled: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.wordInput = React.createRef();

    this.state = {
      invalidWord: false,
    };
  }

  onKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      this.onEnterWord();
    }

    if ([37,38,39,40,8].includes(evt.keyCode)) {
      // Input navigation keys: arrows, backspace, etc
      return;
    }

    if (evt.keyCode < 65 || evt.keyCode > 90) {
      // Anything other than a-z
      evt.preventDefault();
    }
  }

  onEnterWord = () => {
    const input = this.wordInput.current.value;
    if (!input) {
      return;
    }

    const isValid = this.props.onSubmitWord(input);
    if (isValid) {
      this.wordInput.current.value = '';
    } else {
      this.setInvalidWord();
    }
  }

  render() {
    return (
      <div className="boggle-input">
        <input
          className={ this.state.invalidWord ? 'invalid' : '' }
          tabIndex="1"
          type="text"
          placeholder="Enter a word..."
          ref={ this.wordInput }
          onKeyDown={ this.onKeyDown }
          disabled={ this.props.disabled }
        />

        <button tabIndex="2" onClick={ this.onEnterWord }>Ok</button>

        <div className="user-words">
          { this.props.userWords.map(this.renderUserWord) }
        </div>
      </div>
    );
  }

  renderUserWord(userWord) {
    return (
      <div key={ userWord.word } className="user-word">
        { userWord.word } { userWord.score }
      </div>
    );
  }

  setInvalidWord = () => {
    this.setState({ invalidWord: true });

    window.clearTimeout(this.errorTimeout);
    this.errorTimeout = window.setTimeout(() => {
      this.setState({
        invalidWord: false,
      });
    }, 1000);
  }
}
