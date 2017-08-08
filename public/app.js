(function() {

  function Redux(initialState, reducer) {
    var state = initialState
    this.dispatch = function(action) {
      state = reducer(state, action)
      refresh(state)
    }
    this.getState = function() {
      return Object.assign({}, state)
    }
  }

  const appElement = document.getElementById('app')

  function renderBoard(data) {
    const container = document.createElement('div')
    data.board.forEach(tile => {
      container.appendChild(renderTile(tile, data))
    })
    return container
  }

  function renderTile(tile, data) {
    const cell = document.createElement('div')
    cell.innerHTML = tile.shown || tile.correct ? tile.value : '?'
    cell.addEventListener('click', ev => {
      store.dispatch({
        type: 'TILE_CLICKED',
        tile: tile
      })
    })
    return cell
  }

  function refresh(data) {
    appElement.innerHTML = ''
    appElement.appendChild(renderBoard(data))
  }

  function populateBoard(data) {
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
    return Object.assign({}, data, { board: board })
  }

  function tileClicked(tile, data) {
    if(tile.shown || tile.correct) {
      return data
    }
    let shownCount = data.shownCount
    let board = data.board
    let correct = false
    if(shownCount === 2) {
      shownCount = 0
      board = board.map(tile2 => Object.assign({}, tile2, { shown: false }))
    } else if (shownCount === 1) {
      const previousTile = board.find(tile2 => tile2.shown)
      if (previousTile.value === tile.value) {
        correct = true
        board = board.map(tile2 => {
          return tile2.id === previousTile.id
            ? Object.assign({}, tile2, { correct: correct })
            : tile2
        })
      }
    }

    shownCount ++
    board = board.map(tile2 => {
      return tile2.id === tile.id
        ? Object.assign({}, tile2, { shown: true, correct: correct })
        : tile2
    })

    return Object.assign({ shownCount, board })
  }

  const store = new Redux({
    board: [],
    shownCount: 0
  }, function reducer(previousState, action) {
    if(action.type == 'POPULATE_BOARD') {
      return populateBoard(previousState)
    } else if (action.type === 'TILE_CLICKED') {
      return tileClicked(action.tile, previousState)
    }
  })

  store.dispatch({ type: 'POPULATE_BOARD' })
})()