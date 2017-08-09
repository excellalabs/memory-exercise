
import React from 'react';
import _ from 'lodash'

import Tile from './tile'
import { generateBoard } from '../services/boardService'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: generateBoard()
    };
  }

  handleClick(tile) {
    this.setState(prev => {
      return Object.assign({}, prev, {
        board: this.flipTile(prev.board, tile)
      })
    })
  }

  flipTile(board, tile) {
    let flipped = board.reduce((count, tile) => count + tile.shown, 0)
    if (flipped === 2) {
      board = this.reflip(board)
    } else if (flipped === 1) {
      board = this.checkCorrect(board, tile)
    }

    const index = _.findIndex(board, t => t.id === tile.id)
    return board.map(t => {
      if (t.id === tile.id) {
        return Object.assign({}, t, { shown: true })
      } else {
        return t
      }
    })
  }

  checkCorrect(board, tile) {
    let otherTile = board.find(t => t.shown)
    if (otherTile.value === tile.value) {
      return board.map(t => {
        if (t.id === tile.id || t.id === otherTile.id) {
          return Object.assign({}, t, { correct: true })
        } else {
          return t
        }
      })
    } else {
      return board
    }
  }

  reflip(board) {
    return board.map(tile => {
      return Object.assign({}, tile, { shown: false })
    })
  }
  
  render() {
    return (
      <div>
        {
          this.state.board.map(tile => {
            return (
              <Tile key={tile.id} tile={tile} onClick={() => this.handleClick(tile)} />
            )
          })
        }
      </div>
    )
  }
}
