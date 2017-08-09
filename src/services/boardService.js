
import _ from 'lodash'

export function generateBoard() {
  let board = []
  let id = 0
  for(var i=0; i<8; i++) {
    board.push({
      id: id++,
      value: i+1,
      shown: false,
      correct: false
    })
    board.push({
      id: id++,
      value: i+1,
      shown: false,
      correct: false
    })
  }
  board = _.shuffle(board)
  return board
}