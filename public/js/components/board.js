import { createColumn } from "./column.js"


export async function createBoard(id, title){
    const mainApp = document.querySelector('.app-main')
    const mainAppContent = document.querySelector('.app-main-content')
    const boardContent = document.createElement('div')
    boardContent.classList.add('board-content')
    const header = document.querySelector('.board-header')
    header.innerText = `${title}`
    const board = document.createElement('div')
    board.classList.add('board')
    board.dataset.id = id
    mainAppContent.append(header)
    board.append(boardContent)
    mainAppContent.append(board)
    await createColumn('http://localhost:3000/boards',id)
    return mainAppContent
} 