export function createTasks(arr, column){
    arr.forEach(item => {
        const header = column.querySelector('.btnAddColumnTask')
        const task = document.createElement('div')
        task.classList.add('task')
        task.dataset.id = item.id
        task.dataset.column = column.dataset.id
        const taskHeader = document.createElement('p')
        taskHeader.classList.add('task-header')
        taskHeader.innerText = `${item.title}`
        const taskIcon = document.createElement('div')
        taskIcon.classList.add('task-icon')
        taskIcon.dataset.id = item.id
        taskIcon.dataset.column = column.dataset.id
        taskIcon.innerHTML = '<i class="fa-solid fa-pen"></i>'
        task.append(taskHeader)
        task.append(taskIcon)
        header.before(task)
    })
    return column
}