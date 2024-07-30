import { postBoard, postUsers, getUserByEmail, postColumn, postTask, deleteColumn, changeTask, deleteTask} from "../modules/requests.js";
import { actionColumn, isModalOpen } from "./modalWindow.js";
import { createModalAddBoard, closeModal, SingInUser, SingUpUser, noneUser, checkEmail, addColumn, addTask, taskAction, selectColumn} from "./modalWindow.js";
import { createApp } from "./app.js";
import { createBoard } from "./board.js";
import { getLocalStorageDate, setLocalStorageDate } from "../modules/localStorage.js";
import { createBtnAddColumnTask } from "./btn.js";


export function initializeEventHandlers(){
    document.addEventListener('click',async  event =>{
        const target = event.target
        const arrUser = getLocalStorageDate()
        if(arrUser.length === 0 && target.closest('.app-header-singUp')){
            SingUpUser()
        } else if(arrUser.length === 0 && !target.closest('.singIn-dialog') && !target.closest('.singUp-dialog')){
            SingInUser()
        }
        
        if (target.closest('.btnAdd')) {
            if(isModalOpen === false) {
                createModalAddBoard();
                const form = document.querySelector('.add-form');
                if (form) {
                    const user = getLocalStorageDate()
                    form.addEventListener('submit', async (event) => {
                        event.preventDefault();
                        await postBoard(form)
                        await createApp('app-header-logOut', `Hi, ${user[0].name}`, 'Log Out')
                        closeModal('.add-window')
                    });
                } else {
                    console.error("Form with class .add-formm not found");
                }
            }
        } 
        if( target.closest('.btnBoard')){
            let id = 0
            const title = target.innerText
            if(target.classList.contains('btnAdd-text')){
                id = +target.parentElement.dataset.id
            } else {
                id = +target.dataset.id
            }
            if(document.querySelector('.board')){
                const board = document.querySelector('.board')
                board.remove()
            }
            createBoard(id, title)
        }
        if( target.closest('.singdUp-link')){
            closeModal('.singIn-window')
            SingUpUser()
            const form = document.querySelector('.singUp-form');
            if (form) {
                form.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    const userName = document.querySelector('.singUp-name').value
                    const checkEmaill = await postUsers(form)
                    if(checkEmaill === null){
                        checkEmail()
                        form.reset()
                        setTimeout(() => {
                            closeModal('.checkEmail-window')
                        }, 3000)
                    } else{
                        closeModal('.singUp-window')
                        createApp('app-header-logOut', `Hi, ${userName}`, 'Log Out')
                    }
                });
            } else {
                console.error("Form with class .add-formm not found");
            }
        }
        if(target.closest('.singIn-enter')){
            const form = document.querySelector('.singIn-form');
        
            if (form) {
                form.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    const userName = document.querySelector('.singIn-email').value
                    const userCheck = await getUserByEmail(form)
                    if(userCheck === null){
                        noneUser()
                        form.reset()
                        setTimeout(() => {
                            closeModal('.noneUser-window')
                        }, 3000)
                    } else{
                        closeModal('.singIn-window')
                        createApp('app-header-logOut', `Hi, ${userName}`, 'Log Out')
                    }
                });
            } else {
                console.error("Form with class .add-formm not found");
            }
        }
        if(target.closest('.fa-xmark')){
            if (target.classList.contains('singUpp')){
                closeModal('.singUp-window')
            } else if(target.classList.contains('singInn')){
                closeModal('.singIn-window')
            } else if (target.classList.contains('actionColumn-icon')){
                closeModal('.actionColumn-window')
            } if (target.classList.contains('addColumn-icon')){
                closeModal('.addColumn-window')
                const board = document.querySelector('.board-content')
                const btn = createBtnAddColumnTask('Добавить колонку')
                btn.classList.add('column-btn')
                board.append(btn)

            } if (target.classList.contains('addTask-icon')){
                const idWindw = document.querySelector('.addTask-window').dataset.id
                closeModal('.addTask-window')
                const btn = createBtnAddColumnTask('Добавить задачу')
                btn.classList.add('task-btn')
                const column = document.querySelectorAll('.column')
                column.forEach(item =>{
                    if(+item.dataset.id === +idWindw){
                        btn.dataset.id = +item.dataset.id
                        item.append(btn)
                    }
                })
            }
        }
        if(target.closest('.fa-arrow-left')){
            closeModal('.singUp-window')
            SingInUser()
        }
        if(target.closest('.column-btn')){
            closeModal('.column-btn')
            addColumn()
            const form = document.querySelector('.addColumn-form');
            if (form) {
                const id = document.querySelector('.board').dataset.id
                const title = document.querySelector('.board-header').innerText
                form.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    await postColumn(form, id)
                    closeModal('.addColumn-window')
                    if(document.querySelector('.board')){
                        const board = document.querySelector('.board')
                        board.remove()
                        await createBoard(id, title)
                    }
                })
            } else {
                console.error("Form with class .add-formm not found");
            }
        }
        if(target.closest('.column-action')){
            const id = target.parentElement.offsetParent.dataset.id
            actionColumn(id)
        }

        if(target.closest('.button-color')){
            const idColumn = document.querySelector('.actionColumn-window').dataset.id
            const idBoard = document.querySelector('.board').dataset.id
            const color = target.id
            const arrColumn = document.querySelectorAll('.column')
            let colorArr = getLocalStorageDate('color')
            let arrColor = []
            if (+colorArr === 0){
                arrColor = []
            } else {
                arrColor = JSON.parse(colorArr)
            }
            let colorInf = {}
            arrColumn.forEach(item => {
                if(+item.dataset.id === +idColumn){
                    item.style.backgroundColor = color
                    colorInf = {
                        "boardId": idBoard,
                        "columnId": idColumn,
                        "color": color
                    }
                    //colorArr = colorArr.filter(colorItem => !(+colorItem.columnId === +idColumn && +colorItem.boardId === +idBoard))
                    arrColor.push(colorInf)
                    setLocalStorageDate( JSON.stringify(arrColor), `color`);
                }
            })
            
        }
        if(target.closest('.task-btn')){
            const btn = document.querySelectorAll('.task-btn')
            let idColumn = 0
            if (target.classList.contains('btnAddColumnTask-text')){
                idColumn = target.parentElement.dataset.id
            } else {
                idColumn = target.dataset.id
            }
            btn.forEach(item => {
                if(+item.dataset.id  === +idColumn){
                    item.remove()
                }
                
            })
            addTask(idColumn)
            const windw = document.querySelector('.addTask-window')
            if(windw){
                windw.dataset.id = +idColumn
            }
            const form = document.querySelector('.addTask-form');
            if (form) {
                const id = document.querySelector('.board').dataset.id
                const title = document.querySelector('.board-header').innerText
                form.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    await postTask(form, id, idColumn)
                    closeModal('.addTask-window')
                    if(document.querySelector('.board')){
                        const board = document.querySelector('.board')
                        board.remove()
                        await createBoard(id, title)
                    }
                })
            } else {
                console.error("Form with class .add-formm not found");
            } 
        }
        if((target.className).indexOf('window', 0) > -1){
            closeModal(`.${target.className}`)
        }
        if(target.closest('.app-header-logOut')){
            setLocalStorageDate([])
            createApp()
        }
        if(target.closest('.actionColumn-delete')){
            const idBoard = document.querySelector('.board').dataset.id
            const idColumn = document.querySelector('.actionColumn-window').dataset.id
            const title = document.querySelector('.board-header').innerText
            closeModal('.actionColumn-window')
            await deleteColumn(idColumn, idBoard)
            const board = document.querySelector('.board')
            board.remove()
            await createBoard(idBoard, title)
        }
        if(target.closest('.task-icon')){
            const neir = target.parentElement.previousElementSibling.innerText
            const taskId = +target.parentElement.dataset.id
            const columnId = +target.parentElement.dataset.column
            taskAction(taskId , neir, columnId)
        }
        if(target.closest('.actionTask-move')){
                    event.preventDefault()
                    selectColumn()
        }

        if(target.closest('.actionTask-save')){
            const form = document.querySelector('.actionTask-form');
            if (form) {
                form.addEventListener('submit', async event => {
                    event.preventDefault()
                    const id = document.querySelector('.board').dataset.id
                    const wnd = document.querySelector('.actionTask-window')
                    const taskId = wnd.dataset.id
                    const columnId = wnd.dataset.column
                    const title = document.querySelector('.board-header').innerText
                    await changeTask(id, taskId, columnId, form)
                    closeModal('.actionTask-window')
                    if(document.querySelector('.board')){
                        const board = document.querySelector('.board')
                        board.remove()
                        await createBoard(id, title)
                    }
                })
            }
        }
        if(target.closest('.actionTask-delete')){
            event.preventDefault()
            const id = document.querySelector('.board').dataset.id
            const wnd = document.querySelector('.actionTask-window')
            const taskId = wnd.dataset.id
            const columnId = wnd.dataset.column
            const title = document.querySelector('.board-header').innerText
            await deleteTask(id, taskId, columnId)
            closeModal('.actionTask-window')
            if(document.querySelector('.board')){
                const board = document.querySelector('.board')
                board.remove()
                await createBoard(id, title)
            }
        }

    }) 
}