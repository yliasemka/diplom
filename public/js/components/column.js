import { getColumn } from "../modules/requests.js"
import { createBtnAddColumnTask } from "./btn.js"
import { createTasks } from "./task.js"

export async function createColumn (url, id){
    const columnArr = await getColumn(url,id)
    const board = document.querySelector('.board-content')
    columnArr.forEach(item => {
        const taskArr = item.tasks
        const column = document.createElement('div')
        const btn = createBtnAddColumnTask('Добавить задачу')
        btn.classList.add('task-btn')
        btn.dataset.id = item.id
        column.classList.add('column')
        column.dataset.id = item.id
        const columnHeader = document.createElement('div')
        columnHeader.classList.add('column-header')
        const columnHeaderText = document.createElement('h2')
        columnHeaderText.classList.add('column-header-text')
        columnHeaderText.innerText = `${item.name}`
        const actionColumnHeader = document.createElement('span')
        actionColumnHeader.dataset.id = item.id
        actionColumnHeader.classList.add('column-action')
        actionColumnHeader.innerHTML = '<i class="fa-solid fa-ellipsis"></i>'
        columnHeader.append(columnHeaderText)
        columnHeader.append(actionColumnHeader)
        column.append(columnHeader)
        column.append(btn)
        board.append(createTasks(taskArr, column))
    })
    const columnBtn = createBtnAddColumnTask('Добавить колонку')
    columnBtn.classList.add('column-btn')
    board.append(columnBtn)
    return board
}