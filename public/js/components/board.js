export function createBoard(id, title){
    const mainApp = document.querySelector('.app-main')
    const mainAppContent = document.querySelector('.app-main-content')
    const header = document.querySelector('.board-header')
    header.innerText = `${title}`
    const board = document.createElement('div')
    board.classList.add('board')
    board.dataset.id = id
    mainAppContent.append(header)
    mainAppContent.append(board)
    return mainAppContent
} 