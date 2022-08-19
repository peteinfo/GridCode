// A game of life implementation
// Game-Of-Life Rules:

//  1.
//  Any live cell with fewer than two live neighbours
//  dies, as if caused by under-population.
//  2.
//  Any live cell with two or three live neighbours lives
//  on to the next generation.
//  3.
//  Any live cell with more than three live neighbours
//  dies, as if by over-population.
//  4.
//  Any dead cell with exactly three live neighbours be-
//  comes a live cell, as if by reproduction.
defineMode("Game of Life", grid => {
  const liveCell = () => '.'
  const birthRandCell = () => grid.sequence[Math.round(Math.random() * (grid.sequence.length-1))] = liveCell()

  return {
    preload() {

    },
    init() {
      grid.sequence = new Array(grid.w*grid.h).fill('')
      for (let index = 0; index < 42; index++) {
        birthRandCell()
      }
    },
    onKey(key) {
      if (key.key == " ")
        for (let index = 0; index < 10; index++) {
          birthRandCell()
        }
    },
    update(x, y, index, frameCounter) {
      // cell under cursor dies
      if (grid.cursor.index == index)
        grid.sequence[index] = ''
      // wait for half a second to udpate the system
      if (frameCounter % 42  != 0) return
      // follow the rules
      const isLive = grid.sequence[index] !== ''
      let liveNeighbours = 0
      forNeighboursOf(x, y, ({index}) => {
        if (grid.sequence[index] !== '') liveNeighbours++
      }, false)
      if(liveNeighbours < 2) {
        grid.sequence[index] = ''
      }
      else if(liveNeighbours >= 2 && liveNeighbours <= 3) {
        grid.sequence[index] = liveCell()
      }
      else if(liveNeighbours > 3) {
        grid.sequence[index] = ''
      }
      else if (!isLive && liveNeighbours == 3) {
        grid.sequence[index] = liveCell()
      }
    },
  }
})
