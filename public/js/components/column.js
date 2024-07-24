import { getColumn } from "../modules/requests.js"
import { createBtnAddColumnTask } from "./btn.js"

export async function createColumn (url, id){
    const columnArr = await getColumn(url,id)
    const board = document.querySelector('.board')
    columnArr.forEach(item => {
        const column = document.createElement('div')
        const btn = createBtnAddColumnTask('Добавить задачу')
        column.classList.add('column')
        column.dataset.id = item.id
        const columnHeader = document.createElement('h2')
        columnHeader.classList.add('column-header')
        columnHeader.innerText = `${item.name}`
        column.append(columnHeader)
        column.append(btn)
        board.append(column)
    })
    board.append(createBtnAddColumnTask('Добавить колонку'))
    return board
}