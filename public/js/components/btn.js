export function createBtnAddColumnTask(text){
    const btnAddColumnTask = document.createElement('button')
    btnAddColumnTask.classList.add('btnAddColumnTask')
    const btnAddColumnTaskText = document.createElement('span')
    btnAddColumnTaskText.classList.add('btnAddColumnTask-text')
    btnAddColumnTaskText.innerText = `${text}`
    const btnAddColumnTaskIcon = document.createElement('span')
    btnAddColumnTaskIcon.classList.add('btnAddColumnTask-icon')
    const icon = document.createElement('i')
    icon.classList.add('fa-solid', 'fa-plus')
    btnAddColumnTaskIcon.append(icon)
    btnAddColumnTask.append(btnAddColumnTaskIcon)
    btnAddColumnTask.append(btnAddColumnTaskText)
    return btnAddColumnTask
    
}