export function createTasks(arr, column){
    arr.forEach(item => {
        const header = column.querySelector('.btnAddColumnTask')
        const task = document.createElement('div')
        task.classList.add('task')
        task.dataset.id = item.id
        const taskHeader = document.createElement('p')
        taskHeader.classList.add('task-header')
        taskHeader.innerText = `${item.title}`
        task.append(taskHeader)
        header.before(task)
    })
    return column
}