
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
    if (flipped == 2) {
      board = this.reflip(board)
    }

    const index = _.findIndex(board, t => t.id === tile.id)
    return [
      ...board.slice(0, index),
      Object.assign({}, tile, {
        shown: true
      }),
      ...board.slice(index + 1)
    ]
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
