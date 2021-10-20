import React from 'react';
import PropTypes from 'prop-types';

export default class BoggleApp extends React.Component {
  static propTypes = {
    letters: PropTypes.array.isRequired,
  }

  render() {
    return (
      <div className="boggle-board">
        <table>
          <tbody>
            { this.props.letters.map((row, index) => this.renderRow(row, index)) }
          </tbody>
        </table>
      </div>
    );
  }

  renderRow(row, index) {
    return (
      <tr key={ index } className="boggle-board__row">
        { row.map((cell, i) => this.renderCell(cell, i)) }
      </tr>
    );
  }

  renderCell(letter, index) {
    return (
      <td key={ index } className="boggle-board__cell">
        { letter }
      </td>
    );
  }
}
